import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { ITextboxOptions, StaticCanvas } from "fabric/fabric-impl";
import FontFaceObserver from "fontfaceobserver";
import { useSession } from "next-auth/react";

interface CardProps {
  template?: any;
  item?: any;
}

// function startDownload() {
//   let imageURL =
//     "https://cdn.glitch.com/4c9ebeb9-8b9a-4adc-ad0a-238d9ae00bb5%2Fmdn_logo-only_color.svg?1535749917189";
//   let imageDescription = "The Mozilla logo";

//   let downloadedImg = new Image();
//   var imageReceived;
//   downloadedImg.crossOrigin = "anonymous";
//   downloadedImg.addEventListener("load", imageReceived, false);
//   downloadedImg.alt = imageDescription;
//   downloadedImg.src = imageURL;
// }

export default function Card({ template, item }: CardProps) {
  const { imageURL, textOpt, descOpt } = template;
  const { content, desc, contentIndex } = item;
  const { data: session } = useSession();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<StaticCanvas>();
  const [textObj, settextObj] = useState<StaticCanvas>();
  const [canvasBackgroundImage, setcanvasBackgroundImage] =
    useState<StaticCanvas>();
  const textRef = useRef<fabric.Textbox>();
  useEffect(() => {
    // console.log("load", contentIndex, content, template);
    if (!canvasRef.current) return;
    const cnv = new fabric.Canvas(canvasRef.current, {
      width: 200,
      height: 200,
    });
    // console.log(cnv, cnv._contextContainer, !cnv.getContext());
    if (!cnv.getContext()) return;
    setCanvas(cnv);
    fabric.Image.fromURL(imageURL, (img: any) => {
      // console.log(cnv._objects.length, cnv, cnv.getContext());
      if (cnv._objects.length > 0 && cnv.getContext()) {
        cnv.setBackgroundImage(img, cnv.renderAll.bind(cnv), {
          scaleX: (cnv.width || 1) / img.width,
          scaleY: ((cnv.height || 1) * 0.9) / img.height,
        });
        // cnv.renderAll();
      }
    });
    const text = new fabric.Textbox(content, textOpt as ITextboxOptions);
    // fabric.Image.fromURL(
    //   `http://localhost:3000/_next/image?url=${encodeURIComponent(
    //     session?.user?.image as string
    //   )}&w=64&q=75`,
    //   (img: any) => {
    //     // console.log(canvasBackgroundImage)
    //     if (cnv._objects.length > 0) {
    //       cnv.add(img);
    //       cnv.renderAll();
    //     }
    //   },
    //   { crossOrigin: "anonymous" }
    // );

    // textRef.current = text;
    var textFont = new FontFaceObserver(textOpt.fontFamily);

    textFont
      .load(null, 10000)
      .then((v) => {
        cnv.add(text);
        // cnv.renderAll();
      })
      .catch((e) => console.log(e));

    if (desc) {
      const description = new fabric.Textbox(desc, descOpt as ITextboxOptions);
      var descFont = new FontFaceObserver(descOpt?.fontFamily);

      descFont
        .load(null, 10000)
        .then((v) => {
          cnv.add(description);
          // cnv.renderAll();
        })
        .catch((e) => console.log(e));
    }
    return () => {
      console.log();
      cnv.dispose();
      setCanvas(undefined);
      // console.log("hello");
    };
  }, [template]);

  return (
    <div className="m-4">
      <canvas
        className="mt-8 sm:w-full"
        ref={canvasRef}
        width={100}
        height={100}
      />
    </div>
  );
}
