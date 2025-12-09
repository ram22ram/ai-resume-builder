// src/utils/pdfUtils.ts
import * as pdfjsLib from 'pdfjs-dist';

// Type define kiya
interface TextContentItem {
  str: string;
}

// Worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'; 

// Function me 'File' type add kiya
export const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    // Type casting items to ensure TS knows they have .str
    const pageText = textContent.items
      .map((item) => (item as unknown as TextContentItem).str)
      .join(' ');
      
    fullText += pageText + ' ';
  }
  
  return fullText;
};