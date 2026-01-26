// useResponsiveBuilder.ts - REPLACE ENTIRE FILE
import { useEffect, useState } from 'react';
import { useTheme, Breakpoint } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useResponsiveBuilder = () => {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  
  // Mobile-first breakpoints
  const isXs = useMediaQuery(theme.breakpoints.up('xs'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  
  // Device detection
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  
  // Orientation detection
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isLandscape = useMediaQuery('(orientation: landscape)');
  
  // Touch device detection
  const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)');
  
  // High DPI screens
  const isHighDPI = useMediaQuery('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)');
  
  // Safe area detection (notch phones)
  const hasSafeArea = useMediaQuery('(min-width: 0) and (min-height: 0)');

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get current breakpoint
  const getCurrentBreakpoint = (): Breakpoint => {
    if (isXl) return 'xl';
    if (isLg) return 'lg';
    if (isMd) return 'md';
    if (isSm) return 'sm';
    return 'xs';
  };

  // Responsive helper functions
  const getResponsiveValue = <T,>(values: {
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
  }): T => {
    const breakpoint = getCurrentBreakpoint();
    return values[breakpoint] || values.xs || values.sm || values.md || values.lg || values.xl!;
  };

  // Mobile-first spacing
  const getSpacing = (multiplier: number) => {
    if (isMobile) return multiplier * 0.5;
    if (isTablet) return multiplier * 0.75;
    return multiplier;
  };

  // Font size scaling
  const getFontSize = (baseSize: number) => {
    if (isMobile) return baseSize * 0.9;
    if (isTablet) return baseSize * 0.95;
    return baseSize;
  };

  return {
    // Device types
    isMobile,
    isTablet,
    isDesktop,
    isPortrait,
    isLandscape,
    isTouchDevice,
    isHighDPI,
    hasSafeArea,
    
    // Breakpoints
    breakpoint: getCurrentBreakpoint(),
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    
    // Helper functions
    getResponsiveValue,
    getSpacing,
    getFontSize,
    isClient,
    
    // Screen dimensions (client-side only)
    screenWidth: isClient ? window.innerWidth : 0,
    screenHeight: isClient ? window.innerHeight : 0,
    
    // Performance optimization
    prefersReducedMotion: useMediaQuery('(prefers-reduced-motion: reduce)'),
    prefersDarkMode: useMediaQuery('(prefers-color-scheme: dark)'),
  };
};