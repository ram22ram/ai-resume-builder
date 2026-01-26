import LZString from 'lz-string';

// Data ko URL ke liye chota (compress) karna
export const generateMagicLink = (data: any) => {
  const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(data));
  return `${window.location.origin}/builder#magic=${compressed}`;
};

// URL se data wapas nikalna
export const loadFromMagicLink = () => {
  const hash = window.location.hash;
  if (hash.includes('magic=')) {
    try {
      const raw = hash.split('magic=')[1];
      return JSON.parse(LZString.decompressFromEncodedURIComponent(raw));
    } catch (e) { console.error("Magic Link Error", e); }
  }
  return null;
};