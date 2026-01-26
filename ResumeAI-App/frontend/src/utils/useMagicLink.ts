import { useState, useCallback } from 'react';
import LZString from 'lz-string';

export const useMagicLink = (resumeData: any) => {
  const [saveSuccess, setSaveSuccess] = useState(false);

  const generateMagicLink = useCallback(() => {
    try {
      if (!resumeData) {
        alert("No resume data to share");
        return null;
      }

      const jsonStr = JSON.stringify(resumeData);
      const compressed = LZString.compressToEncodedURIComponent(jsonStr);
      const magicURL = `${window.location.origin}/builder#magic=${compressed}`;
      
      navigator.clipboard.writeText(magicURL);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      return magicURL;
    } catch (error) {
      console.error("Magic link generation error:", error);
      alert("Failed to generate magic link");
      return null;
    }
  }, [resumeData]);

  const loadMagicLink = useCallback(() => {
    const hash = window.location.hash;
    if (hash.includes('magic=')) {
      try {
        const encoded = hash.split('magic=')[1];
        const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
        if (decompressed) {
          const parsedData = JSON.parse(decompressed);
          if (parsedData.sections && Array.isArray(parsedData.sections) && parsedData.theme) {
            window.location.hash = '';
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
            return parsedData;
          }
        }
      } catch (error) {
        console.error("Magic link decode error:", error);
        alert("Invalid magic link");
      }
    }
    return null;
  }, []);

  return {
    saveSuccess,
    setSaveSuccess,
    generateMagicLink,
    loadMagicLink,
  };
};