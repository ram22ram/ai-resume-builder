// src/utils/templateConfig.ts

export interface ConfigItem {
  id: string;
  label: string;
  value: string;
}

export interface LayoutConfigItem {
  allowedColors: string[];
  allowedFonts: string[];
  defaultColorId: string;
  defaultFontId: string;
  defaultDensity: string;
  defaultPhotoMode: string;
}

// MASTER LAYOUTS
export const LAYOUTS = [
  { id: 'modern', label: 'Modern', description: 'Clean & Professional' },
  { id: 'classic', label: 'Classic', description: 'Traditional & Elegant' },
  { id: 'swiss', label: 'Swiss', description: 'Bold Minimalist' },
  { id: 'corporate', label: 'Corporate', description: 'Sidebar & Business' },
  { id: 'fred', label: 'Fred', description: 'Creative & Bold' },
  { id: 'pat', label: 'Pat', description: 'Modern & IT' },
  { id: 'kristy', label: 'Kristy', description: 'Soft & Fresh' },
  { id: 'elena', label: 'Elena', description: 'Professional' },
  { id: 'eileen', label: 'Eileen', description: 'Elegant' },
  { id: 'harvey', label: 'Harvey', description: 'Executive' },
];

// COLOR PALETTES
export const COLORS: ConfigItem[] = [
  { id: 'blue', label: 'Executive Blue', value: '#0B57D0' },
  { id: 'emerald', label: 'Emerald Green', value: '#059669' },
  { id: 'crimson', label: 'Crimson Red', value: '#dc2626' },
  { id: 'violet', label: 'Royal Violet', value: '#7c3aed' },
  { id: 'slate', label: 'Slate Gray', value: '#475569' },
  { id: 'black', label: 'Midnight Black', value: '#000000' },
  { id: 'teal', label: 'Ocean Teal', value: '#0d9488' },
  { id: 'orange', label: 'Sunset Orange', value: '#ea580c' },
  { id: 'pink', label: 'Berry Pink', value: '#db2777' },
  { id: 'indigo', label: 'Deep Indigo', value: '#4338ca' },
];

// FONTS
export const FONTS: ConfigItem[] = [
  { id: 'roboto', label: 'Roboto (Clean)', value: '"Roboto", sans-serif' },
  { id: 'playfair', label: 'Playfair (Serif)', value: '"Playfair Display", serif' },
  { id: 'montserrat', label: 'Montserrat (Modern)', value: '"Montserrat", sans-serif' },
  { id: 'lato', label: 'Lato (Neutral)', value: '"Lato", sans-serif' },
  { id: 'merriweather', label: 'Merriweather (Readable)', value: '"Merriweather", serif' },
];

export const DENSITIES = [
  { id: 'compact', label: 'Compact (More Content)' },
  { id: 'spacious', label: 'Spacious (More White Space)' },
];

export const PHOTO_MODES = [
  { id: 'auto', label: 'Auto (show if uploaded)' },
  { id: 'hidden', label: 'No Photo Layout' },
];

// Maps
export const COLOR_MAP = COLORS.reduce((acc, c) => {
  acc[c.id] = c;
  return acc;
}, {} as Record<string, ConfigItem>);

export const FONT_MAP = FONTS.reduce((acc, f) => {
  acc[f.id] = f;
  return acc;
}, {} as Record<string, ConfigItem>);

// Layout Config
export const LAYOUT_CONFIG: Record<string, LayoutConfigItem> = {
  modern: {
    allowedColors: ['blue', 'emerald', 'teal', 'violet', 'indigo'],
    allowedFonts: ['roboto', 'montserrat', 'lato'],
    defaultColorId: 'blue',
    defaultFontId: 'roboto',
    defaultDensity: 'compact',
    defaultPhotoMode: 'auto',
  },
  classic: {
    allowedColors: ['black', 'slate', 'crimson', 'indigo'],
    allowedFonts: ['playfair', 'merriweather', 'lato'],
    defaultColorId: 'black',
    defaultFontId: 'playfair',
    defaultDensity: 'spacious',
    defaultPhotoMode: 'auto',
  },
  swiss: {
    allowedColors: ['blue', 'slate', 'teal', 'orange', 'pink'],
    allowedFonts: ['montserrat', 'roboto', 'lato'],
    defaultColorId: 'slate',
    defaultFontId: 'montserrat',
    defaultDensity: 'compact',
    defaultPhotoMode: 'auto',
  },
  corporate: {
    allowedColors: ['blue', 'slate', 'black', 'indigo', 'emerald'],
    allowedFonts: ['roboto', 'montserrat', 'lato'],
    defaultColorId: 'indigo',
    defaultFontId: 'roboto',
    defaultDensity: 'compact',
    defaultPhotoMode: 'auto',
  },
  fred: {
    allowedColors: ['crimson', 'orange', 'black'],
    allowedFonts: ['montserrat', 'roboto'],
    defaultColorId: 'crimson',
    defaultFontId: 'montserrat',
    defaultDensity: 'compact',
    defaultPhotoMode: 'auto',
  },
  pat: {
    allowedColors: ['teal', 'blue', 'slate'],
    allowedFonts: ['lato', 'roboto'],
    defaultColorId: 'teal',
    defaultFontId: 'lato',
    defaultDensity: 'compact',
    defaultPhotoMode: 'auto',
  },
  kristy: {
    allowedColors: ['pink', 'violet', 'emerald'],
    allowedFonts: ['playfair', 'lato'],
    defaultColorId: 'pink',
    defaultFontId: 'lato',
    defaultDensity: 'spacious',
    defaultPhotoMode: 'auto',
  },
  elena: {
    allowedColors: ['emerald', 'slate', 'blue'],
    allowedFonts: ['merriweather', 'roboto'],
    defaultColorId: 'emerald',
    defaultFontId: 'merriweather',
    defaultDensity: 'compact',
    defaultPhotoMode: 'auto',
  },
  eileen: {
    allowedColors: ['violet', 'indigo', 'black'],
    allowedFonts: ['playfair', 'montserrat'],
    defaultColorId: 'violet',
    defaultFontId: 'playfair',
    defaultDensity: 'compact',
    defaultPhotoMode: 'auto',
  },
  harvey: {
    allowedColors: ['black', 'slate', 'blue'],
    allowedFonts: ['roboto', 'lato'],
    defaultColorId: 'black',
    defaultFontId: 'roboto',
    defaultDensity: 'compact',
    defaultPhotoMode: 'auto',
  },
};