// src/hooks/usePerformanceOptimizer.tsx
import { useEffect, useRef, useCallback, useState } from 'react';

// Debounce hook for expensive operations
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

// Throttle hook for scroll/resize events
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const lastCall = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCall.current;

      if (timeSinceLastCall >= delay) {
        lastCall.current = now;
        callback(...args);
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          lastCall.current = Date.now();
          callback(...args);
          timeoutRef.current = undefined;
        }, delay - timeSinceLastCall);
      }
    },
    [callback, delay]
  );
};

// Virtualization hook for long lists
export const useVirtualization = (
  itemCount: number,
  itemHeight: number,
  containerRef: React.RefObject<HTMLElement>
) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
  
  const updateVisibleRange = useThrottle(() => {
    if (!containerRef.current) return;
    
    const scrollTop = containerRef.current.scrollTop;
    const containerHeight = containerRef.current.clientHeight;
    
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      itemCount - 1,
      start + Math.ceil(containerHeight / itemHeight) + 2 // Buffer
    );
    
    setVisibleRange({ start, end });
  }, 100);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', updateVisibleRange);
    updateVisibleRange(); // Initial calculation
    
    return () => {
      container.removeEventListener('scroll', updateVisibleRange);
    };
  }, [containerRef, updateVisibleRange, itemCount]);
  
  return {
    visibleRange,
    totalHeight: itemCount * itemHeight,
    getItemStyle: (index: number) => ({
      position: 'absolute',
      top: `${index * itemHeight}px`,
      height: `${itemHeight}px`,
      width: '100%',
    }),
  };
};

// Memory optimization for large state objects
export const useMemoryOptimizedState = <T extends object>(
  initialState: T,
  maxSizeKB: number
): [T, (update: Partial<T> | ((prev: T) => Partial<T>)) => void] => {
  const stateRef = useRef<T>(initialState);
  const [, forceUpdate] = useState({});

  const setState = useCallback((update: Partial<T> | ((prev: T) => Partial<T>)) => {
    const newPartial = typeof update === 'function' 
      ? update(stateRef.current) 
      : update;

    // Deep comparison for changed values only
    let hasChanges = false;
    const newState = { ...stateRef.current };

    Object.keys(newPartial).forEach(key => {
      const typedKey = key as keyof T;
      if (!Object.is(stateRef.current[typedKey], (newPartial as any)[typedKey])) {
        (newState as any)[typedKey] = (newPartial as any)[typedKey];
        hasChanges = true;
      }
    });

    if (hasChanges) {
      // Check memory size before updating (approximate)
      const size = JSON.stringify(newState).length * 2 / 1024; // KB
      if (size > maxSizeKB) {
        console.warn(`State size (${size.toFixed(2)}KB) exceeds limit of ${maxSizeKB}KB`);
        return;
      }

      stateRef.current = newState;
      forceUpdate({}); // Trigger re-render
    }
  }, [maxSizeKB]);

  return [stateRef.current, setState];
};

// Web Worker hook for CPU-intensive tasks
export const useWebWorker = <T, R>(
  workerScript: string | Worker,
  onMessage?: (result: R) => void
) => {
  const workerRef = useRef<Worker | null>(null);
  const taskQueueRef = useRef<{ id: number; data: T; resolve: (value: R) => void }[]>([]);
  const nextIdRef = useRef(0);

  useEffect(() => {
    const worker = typeof workerScript === 'string'
      ? new Worker(workerScript)
      : workerScript;

    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<R>) => {
      const eventData = event.data as any;
      if (eventData && typeof eventData === 'object' && 'id' in eventData) {
        const { id, result } = eventData;
        const taskIndex = taskQueueRef.current.findIndex(task => task.id === id);
        
        if (taskIndex !== -1) {
          const task = taskQueueRef.current[taskIndex];
          task.resolve(result);
          taskQueueRef.current.splice(taskIndex, 1);
        }
      } else if (onMessage) {
        onMessage(event.data);
      }
    };

    worker.onerror = (error) => {
      console.error('Web Worker error:', error);
      taskQueueRef.current.forEach(task => {
        task.resolve(null as any);
      });
      taskQueueRef.current = [];
    };

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, [workerScript, onMessage]);

  const postMessage = useCallback((data: T): Promise<R> => {
    return new Promise((resolve) => {
      if (!workerRef.current) {
        resolve(null as any);
        return;
      }

      const id = nextIdRef.current++;
      taskQueueRef.current.push({ id, data, resolve });

      workerRef.current.postMessage({
        id,
        data
      });
    });
  }, []);

  const terminate = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    taskQueueRef.current = [];
  }, []);

  return { postMessage, terminate };
};

// Idle callback hook for non-critical operations
export const useIdleCallback = (
  callback: () => void,
  options?: { timeout?: number }
) => {
  const requestIdRef = useRef<number>();

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      requestIdRef.current = (window as any).requestIdleCallback(callback, options);
    } else {
      // Fallback to setTimeout
      requestIdRef.current = setTimeout(callback, 1000) as any;
    }

    return () => {
      if ('cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(requestIdRef.current);
      } else {
        clearTimeout(requestIdRef.current);
      }
    };
  }, [callback, options?.timeout]);
};

// Image lazy loading hook
export const useLazyImage = (
  src: string,
  options?: {
    rootMargin?: string;
    threshold?: number;
    placeholder?: string;
  }
) => {
  const [imageSrc, setImageSrc] = useState(options?.placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let didCancel = false;

    if (imgRef.current && src && src !== imageSrc) {
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (!didCancel && (entry.isIntersecting || entry.intersectionRatio > 0)) {
              const img = new Image();
              img.src = src;
              img.onload = () => {
                if (!didCancel) {
                  setImageSrc(src);
                  setIsLoaded(true);
                }
              };
              img.onerror = () => {
                if (!didCancel) {
                  console.error(`Failed to load image: ${src}`);
                }
              };
              observer.unobserve(imgRef.current!);
            }
          },
          {
            rootMargin: options?.rootMargin || '50px',
            threshold: options?.threshold || 0.01,
          }
        );

        observer.observe(imgRef.current);
      } else {
        // Fallback for older browsers
        const img = new Image();
        img.src = src;
        img.onload = () => {
          if (!didCancel) {
            setImageSrc(src);
            setIsLoaded(true);
          }
        };
      }
    }

    return () => {
      didCancel = true;
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, imageSrc, options]);

  return { imgRef, src: imageSrc, isLoaded };
};

// Connection-aware resource loading
export const useConnectionAwareLoading = () => {
  const [connection, setConnection] = useState<{
    effectiveType: string;
    saveData: boolean;
  }>({
    effectiveType: '4g',
    saveData: false,
  });

  useEffect(() => {
    const nav = navigator as any;
    if ('connection' in nav) {
      const conn = nav.connection;
      
      const updateConnection = () => {
        setConnection({
          effectiveType: conn.effectiveType,
          saveData: conn.saveData,
        });
      };

      updateConnection();
      conn.addEventListener('change', updateConnection);

      return () => {
        conn.removeEventListener('change', updateConnection);
      };
    }
  }, []);

  const shouldLoadLightweight = useCallback(() => {
    return connection.effectiveType.includes('2g') || 
           connection.effectiveType.includes('3g') ||
           connection.saveData;
  }, [connection]);

  return { connection, shouldLoadLightweight };
};

// Optimized event listener with automatic cleanup
export const useOptimizedEventListener = <K extends keyof WindowEventMap>(
  eventType: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: {
    element?: HTMLElement | Window | Document;
    throttleDelay?: number;
    passive?: boolean;
  }
) => {
  const throttledHandler = useThrottle(handler, options?.throttleDelay || 100);

  useEffect(() => {
    const target = options?.element || window;
    const eventOptions: AddEventListenerOptions = {
      passive: options?.passive !== false,
    };

    target.addEventListener(eventType, throttledHandler as EventListener, eventOptions);

    return () => {
      target.removeEventListener(eventType, throttledHandler as EventListener);
    };
  }, [eventType, throttledHandler, options]);
};

// Compose multiple optimization hooks
export const usePerformanceOptimizer = (config: {
  enableDebounce?: boolean;
  enableThrottle?: boolean;
  enableVirtualization?: boolean;
  enableMemoryOptimization?: boolean;
  maxStateSizeKB?: number;
} = {}) => {
  const connection = useConnectionAwareLoading();

  const getOptimizedConfig = useCallback(() => {
    const baseConfig = { ...config };

    // Adjust based on connection
    if (connection.shouldLoadLightweight()) {
      baseConfig.enableVirtualization = true;
      baseConfig.enableMemoryOptimization = true;
      baseConfig.maxStateSizeKB = Math.min(config.maxStateSizeKB || 1024, 512);
    }

    return baseConfig;
  }, [config, connection]);

  return {
    connection,
    getOptimizedConfig,
    useDebounce,
    useThrottle,
    useVirtualization,
    useMemoryOptimizedState,
    useWebWorker,
    useIdleCallback,
    useLazyImage,
    useOptimizedEventListener,
  };
};

export default usePerformanceOptimizer;

// Export types
export type PerformanceOptimizer = ReturnType<typeof usePerformanceOptimizer>;