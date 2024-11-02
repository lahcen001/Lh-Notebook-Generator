import jsPDF from 'jspdf';

export const generatePDF = (content: string) => {
  const doc = new jsPDF();
  
  const splitText = doc.splitTextToSize(content, 180);
  let yPosition = 20;
  
  doc.setFontSize(12);
  splitText.forEach((text: string) => {
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 20;
    }
    doc.text(text, 15, yPosition);
    yPosition += 7;
  });
  
  doc.save('notebook.pdf');
}; 