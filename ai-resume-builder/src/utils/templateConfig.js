// MASTER LAYOUTS
export const LAYOUTS = [
  { id: 'modern', label: 'Modern', description: 'Clean & Professional' },
  { id: 'classic', label: 'Classic', description: 'Traditional & Elegant' },
  { id: 'swiss', label: 'Swiss', description: 'Bold Minimalist' },
  { id: 'corporate', label: 'Corporate', description: 'Sidebar & Business' },
];

// COLOR PALETTES (10 Options)
export const COLORS = [
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

// FONTS (5 Options)
export const FONTS = [
  { id: 'roboto', label: 'Roboto (Clean)', value: '"Roboto", sans-serif' },
  { id: 'playfair', label: 'Playfair (Serif)', value: '"Playfair Display", serif' },
  { id: 'montserrat', label: 'Montserrat (Modern)', value: '"Montserrat", sans-serif' },
  { id: 'lato', label: 'Lato (Neutral)', value: '"Lato", sans-serif' },
  { id: 'merriweather', label: 'Merriweather (Readable)', value: '"Merriweather", serif' },
];

// 🔹 Density options – design tight vs spacious
export const DENSITIES = [
  { id: 'compact', label: 'Compact (More Content)' },
  { id: 'spacious', label: 'Spacious (More White Space)' },
];

// 🔹 Photo mode – design variants: with / without photo
export const PHOTO_MODES = [
  { id: 'auto', label: 'Auto (show if uploaded)' },
  { id: 'hidden', label: 'No Photo Layout' },
];

// 🔹 Quick maps for easy lookup
export const COLOR_MAP = COLORS.reduce((acc, c) => {
  acc[c.id] = c;
  return acc;
}, {});

export const FONT_MAP = FONTS.reduce((acc, f) => {
  acc[f.id] = f;
  return acc;
}, {});

// 🔹 Layout-wise curated configuration
export const LAYOUT_CONFIG = {
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
};

// Formula example (per layout):
// 5 curated colors * 5 curated fonts * 2 densities * 2 photo modes = 100+ combos overall across layouts.
