// utils/fontUtils.ts
export const getFontFamily = (fontName: string): string => {
  switch (fontName.toLowerCase()) {
    case 'inter':
      return "'Inter', 'Segoe UI', system-ui, sans-serif";
    case 'roboto':
      return "'Roboto', 'Helvetica Neue', Arial, sans-serif";
    case 'opensans':
      return "'Open Sans', 'Segoe UI', Tahoma, sans-serif";
    case 'lato':
      return "'Lato', 'Helvetica Neue', Arial, sans-serif";
    case 'montserrat':
      return "'Montserrat', 'Arial Narrow', sans-serif";
    case 'poppins':
      return "'Poppins', 'Segoe UI', sans-serif";
    case 'sans-serif':
    default:
      return "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  }
};

export const getFontSize = (density: string, isPreview: boolean = false): string => {
  const baseSize = density === 'compact' ? '0.9rem' : 
                  density === 'spacious' ? '1.1rem' : '1rem';
  return isPreview ? `calc(${baseSize} * 0.8)` : baseSize;
};

export const getLineHeight = (density: string): number => {
  switch (density) {
    case 'compact': return 1.2;
    case 'spacious': return 1.8;
    default: return 1.5;
  }
};

export const getSpacing = (density: string, base: number): number => {
  switch (density) {
    case 'compact': return base * 0.8;
    case 'spacious': return base * 1.2;
    default: return base;
  }
};