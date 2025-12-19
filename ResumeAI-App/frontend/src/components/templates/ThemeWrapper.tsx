// components/templates/ThemeWrapper.tsx
import React from 'react';
import { getFontFamily, getFontSize, getLineHeight, getSpacing } from '../../utils/fontUtils';

interface ThemeWrapperProps {
  theme: any;
  children: (themeProps: any) => React.ReactNode;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ theme, children }) => {
  const {
    accentColor = '#0B57D0',
    fontFamily = 'inter',
    density = 'comfortable',
    photoMode = 'visible'
  } = theme || {};

  const processedTheme = {
    accentColor,
    fontFamily: getFontFamily(fontFamily),
    density,
    photoMode,
    
    // Helper functions
    getFontSize: (base: number, isPreview: boolean = false) => 
      density === 'compact' ? `${base * 0.9}rem` :
      density === 'spacious' ? `${base * 1.1}rem` : `${base}rem`,
    
    getSpacing: (base: number) => getSpacing(density, base),
    getLineHeight: () => getLineHeight(density),
    
    // Photo visibility logic
    shouldShowPhoto: (hasPhoto: boolean, isPreview: boolean = false) => {
      if (photoMode === 'hidden') return false;
      if (photoMode === 'conditional') return hasPhoto && !isPreview;
      return photoMode === 'visible' && !isPreview;
    }
  };

  return <>{children(processedTheme)}</>;
};

export default ThemeWrapper;