// Create: src/styles/MobileFirstStyles.tsx
import { GlobalStyles } from '@mui/material';

export const MobileFirstStyles = () => (
  <GlobalStyles styles={{
    /* Mobile-First Base Styles */
    ':root': {
      '--mobile-padding': '16px',
      '--tablet-padding': '24px',
      '--desktop-padding': '32px',
    },
    
    /* Container Constraints */
    '.mobile-container': {
      width: '100%',
      maxWidth: '100%',
      padding: 'var(--mobile-padding)',
      boxSizing: 'border-box',
      
      '@media (min-width: 600px)': {
        padding: 'var(--tablet-padding)',
      },
      
      '@media (min-width: 900px)': {
        padding: 'var(--desktop-padding)',
        maxWidth: '1200px',
        margin: '0 auto',
      },
    },
    
    /* Touch-Friendly Button Sizes */
    '.touch-button': {
      minHeight: '44px',
      minWidth: '44px',
      padding: '12px 24px',
      fontSize: '16px',
      
      '@media (min-width: 600px)': {
        minHeight: '40px',
        minWidth: '40px',
        padding: '10px 20px',
        fontSize: '14px',
      },
    },
    
    /* Mobile-Optimized Form Inputs */
    '.mobile-input': {
      fontSize: '16px !important', // Prevents iOS zoom
      height: '48px',
      
      '@media (min-width: 600px)': {
        fontSize: '14px !important',
        height: '42px',
      },
    },
    
    /* Safe Area Insets for Notch Phones */
    '.safe-area-top': {
      paddingTop: 'env(safe-area-inset-top, 0px)',
    },
    
    '.safe-area-bottom': {
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    },
    
    /* Mobile Scroll Behavior */
    '.mobile-scroll-container': {
      '-webkit-overflow-scrolling': 'touch',
      overflowY: 'auto',
      overscrollBehavior: 'contain',
    },
    
    /* Prevent Text Size Adjustment */
    'html': {
      '-webkit-text-size-adjust': '100%',
      textSizeAdjust: '100%',
    },
    
    /* Mobile Tap Highlight */
    '*': {
      '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0.1)',
    },
  }} />
);