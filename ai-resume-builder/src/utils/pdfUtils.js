// src/utils/pdfUtils.js
import * as pdfjsLib from 'pdfjs-dist';

// Worker configure karein (Production safe URL)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

export const extractTextFromPDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(' ');
    fullText += pageText + ' ';
  }
  
  return fullText;
};