import { fabric } from "fabric";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

async function convertCanvasToImage(canvas: Element) {
  const image = await html2canvas(canvas as HTMLElement, {
    useCORS: true,
    allowTaint: true,
    scale: 5,
  });
  return image;
}

async function convertAllCanvasesToImages() {
  const canvases = document.getElementsByClassName("lower-canvas");
  const images = [];
  for (let i = 0; i < canvases.length; i++) {
    const canvas = canvases[i];
    const image = await convertCanvasToImage(canvas);
    images.push(image);
  }
  return images;
}

async function generatePDFFromImages(images: HTMLCanvasElement[]) {
  //   const pdf = new jsPDF("l", "px", [images[0].height, images[0].width]);
  console.log(images[0].height, images[0].width);
  const pdf = new jsPDF({
    unit: "px",
    format: [images[0].height * 100, images[0].width * 100],
    orientation: "l",
    // compress: true,
  });
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    pdf.addImage(
      image,
      "PNG",
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight()
    );
    if (i < images.length - 1) {
      pdf.addPage();
    }
  }
  return pdf;
}

async function download() {
  const canvases = document.getElementsByClassName("lower-canvas");
  console.log(parseFloat(canvases[0].getAttribute("height") as string));
  const pdf = new jsPDF("l", "px", [
    parseFloat(canvases[0].getAttribute("width") as string),
    parseFloat(canvases[0].getAttribute("height") as string),
  ]);
  const images = [];
  for (let i = 0; i < canvases.length; i++) {
    const canvas = canvases[i];
    pdf.html(canvas as HTMLElement);
    if (i < images.length - 1) {
      pdf.addPage();
    }
  }
  return pdf;
}

export default async function downloadPDF() {
  const images = await convertAllCanvasesToImages();
  const pdf = await generatePDFFromImages(images);
  pdf.save("Instacarol Export.pdf");
}
