import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { ITextboxOptions, StaticCanvas } from "fabric/fabric-impl";

interface CardProps {
  content: string;
  textOpt: any;
  desc?: string;
  descOpt?: any;
  name: string;
  handleChange: Dispatch<SetStateAction<string>>;
  imageURL: string;
}

export default function Card({
  content,
  name,
  handleChange,
  imageURL,
  textOpt,
  desc,
  descOpt,
}: CardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<StaticCanvas>();
  const [textObj, settextObj] = useState<StaticCanvas>();
  const [canvasBackgroundImage, setcanvasBackgroundImage] =
    useState<StaticCanvas>();
  const textRef = useRef<fabric.Textbox>();
  useEffect(() => {
    if (!canvasRef.current) return;
    const cnv = new fabric.Canvas(canvasRef.current, {
      width: 200,
      height: 200,
    });
    setCanvas(cnv);
    fabric.Image.fromURL(imageURL, (img: any) => {
      console.log(cnv.width, img.width, cnv.height, img.height);
      console.log((cnv.width || 1) / img.width, (cnv.height || 1) / img.height);
      // console.log(canvasBackgroundImage)
      if (cnv._objects.length > 0) {
        cnv.setBackgroundImage(img, cnv.renderAll.bind(cnv), {
          scaleX: (cnv.width || 1) / img.width,
          scaleY: ((cnv.height || 1) * 0.9) / img.height,
        });
      }
    });
    const text = new fabric.Textbox(content, textOpt as ITextboxOptions);

    // textRef.current = text;

    cnv.add(text);

    if (desc) {
      const description = new fabric.Textbox(desc, descOpt as ITextboxOptions);
      cnv.add(description);
    }

    return () => {
      cnv.dispose();
    };
  }, []);

  return (
    <div className="m-4">
      <canvas className="mt-8" ref={canvasRef} width={100} height={100} />
    </div>
  );
}
