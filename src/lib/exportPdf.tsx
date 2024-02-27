import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportMermaidAsPDF = () => {
    const mermaidContainer = document.querySelector('.mermaid'); // Adjust selector if necessary
    if (mermaidContainer) {
      html2canvas(mermaidContainer as HTMLElement, {
        onclone: (document) => {
          const mermaidClone = document.querySelector('.mermaid');
          if (mermaidClone) {
            mermaidClone.style.backgroundColor = '#000';
            mermaidClone.style.color = '#FFF';
          }
        }
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight+23);
        pdf.save('mermaid-diagram.pdf');
      });
    }
  };