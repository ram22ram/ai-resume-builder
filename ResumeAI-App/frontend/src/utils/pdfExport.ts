import html2pdf from 'html2pdf.js';

// 🔥 FIX: html2pdf has broken TS types
type Html2PdfOptions = any;

interface ExportOptions {
    filename?: string;
    premium?: boolean;
}

export const exportResumePDF = async (
    element: HTMLElement,
    options: ExportOptions = {}
) => {
    const { filename = 'resume.pdf', premium = false } = options;

    let watermark: HTMLDivElement | null = null;

    // ✅ FREE watermark
    if (!premium) {
        watermark = document.createElement('div');
        watermark.innerText = 'Generated via ResumeAI';
        Object.assign(watermark.style, {
            position: 'fixed',
            bottom: '10px',
            right: '20px',
            opacity: '0.3',
            fontSize: '10px',
            zIndex: '9999',
        });
        element.appendChild(watermark);
    }

    // 🔥 IMPORTANT: cast options
    const opt: Html2PdfOptions = {
        margin: 10,
        filename,
        image: {
            type: 'jpeg',
            quality: 0.98,
        },
        html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
        },
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'],
        },
    };

    await html2pdf().set(opt).from(element).save();

    // cleanup
    if (watermark) watermark.remove();
};
