import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { ITextboxOptions, StaticCanvas } from "fabric/fabric-impl";
import FontFaceObserver from "fontfaceobserver";
import { useSession } from "next-auth/react";
import { userInfo } from "os";

interface CardProps {
  template?: any;
  item?: any;
  globalCanvasHeight: number;
  order: any;
  selBgColor: any;
  setGlobalCanvasHeight: Dispatch<SetStateAction<number>>;
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

export default function Card({
  template,
  item,
  globalCanvasHeight,
  order,
  selBgColor,
  setGlobalCanvasHeight,
}: CardProps) {
  const { imageURL, textOpt, descOpt, backgroundColor, vision } = template;
  const { content, desc, contentIndex } = item;
  const { data: session } = useSession();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<StaticCanvas>();
  const [textObj, settextObj] = useState<StaticCanvas>();
  const [canvasBackgroundImage, setcanvasBackgroundImage] =
    useState<StaticCanvas>();
  const textRef = useRef<fabric.Textbox>();

  const repos = (cnv: StaticCanvas) => {
    var totalHeight = 0;
    cnv.forEachObject((obj) => {
      // @ts-ignore
      if (obj.note !== "profilePic" && obj.note !== "arrow") {
        totalHeight += obj.height as number;
      }
    });
    totalHeight += 30;
    var offsetY = (globalCanvasHeight - totalHeight) / 2;

    var currentY = offsetY;
    var canvasObj: any = {};
    cnv.forEachObject(function (obj) {
      // @ts-ignore
      canvasObj[obj.note] = obj;
    });
    // console.log(obj);

    order?.forEach((obj: any) => {
      const object = canvasObj[obj.name];
      if (object) {
        const objectHeight = object.height as number;
        console.log(obj.name, object.name, objectHeight);
        object
          .set({
            top: currentY + obj.top,
          })
          .setCoords();
        currentY += objectHeight;
      }
    });

    cnv.renderAll();
  };

  useEffect(() => {
    // console.log("load", contentIndex, content, template);
    if (!canvasRef.current) return;
    const cnv = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: globalCanvasHeight,
      backgroundColor: backgroundColor,
    });
    // console.log(cnv, cnv._contextContainer, !cnv.getContext());
    if (!cnv.getContext()) return;
    setCanvas(cnv);
    const canvasHeight = cnv.height as number;
    const canvasWidth = cnv.width as number;

    if (imageURL) {
      fabric.Image.fromURL(imageURL, (img: any) => {
        // console.log(cnv._objects.length, cnv, cnv.getContext());
        if (cnv._objects.length > 0 && cnv.getContext()) {
          cnv.setBackgroundImage(img, cnv.renderAll.bind(cnv), {
            scaleX: (canvasWidth || 1) / img.width,
            scaleY: (canvasHeight || 1) / img.height,
          });
          // cnv.renderAll();
        }
      });
    }
    if (template.profile && session?.user) {
      fabric.Image.fromURL(
        `/_next/image?url=${encodeURIComponent(
          session?.user?.image as string
        )}&w=256&q=100`,
        (img: fabric.Image) => {
          // console.log(canvasBackgroundImage)
          if (cnv._objects.length > 0) {
            var clipPath = new fabric.Circle({
              radius: 40,
              top: -50,
              left: -40,
            });

            img.set({
              ...template.profile,
              note: "profilePic",
            });
            img.clipPath = clipPath;
            cnv.add(img);

            var totalHeight = 0;
            cnv.forEachObject((obj) => {
              // @ts-ignore
              if (obj.note !== "profilePic") {
                totalHeight += obj.height as number;
              }
            });
            totalHeight += 120;
            if (totalHeight + 200 > globalCanvasHeight) {
              cnv.renderAll();
              setGlobalCanvasHeight(totalHeight + 200);
            } else {
              repos(cnv);
            }
          }
        },
        { crossOrigin: "anonymous" }
      );

      // textRef.current = text;
      if (template?.userfullname) {
        var nameFont = new FontFaceObserver(template.profile.fontFamily);
        const name = new fabric.Textbox(
          session?.user?.name as string,
          // template.profile as ITextboxOptions
          {
            ...template.userfullname,
            top: template?.profile.top + 0,
            left: template?.profile.left + template.userfullname.leftOffset,
          } as ITextboxOptions
        );
        cnv.add(name);
      }

      if (template?.username) {
        const usertag = new fabric.Textbox(
          `@${session?.user?.name
            ?.toLowerCase()
            .split(" ")
            .join("")}` as string,
          // template.profile as ITextboxOptions
          {
            ...template.username,
            top: template?.profile.top + 10,
            left: template?.profile.left + template.username.leftOffset,
          } as ITextboxOptions
        );
        cnv.add(usertag);
      }

      const line = new fabric.Line([50, 50, 200, 200], {
        stroke: "black",
        strokeWidth: 2,
      });

      // Create an arrowhead
      const arrowhead = new fabric.Triangle({
        width: 10,
        height: 10,
        fill: "black",
        left: 200,
        top: 200,
        angle: 45,
      });

      // Add line and arrowhead to canvas
      // cnv.add(line, arrowhead);
      // nameFont
      //   .load(null, 10000)
      //   .then((v) => {
      //     cnv.add(name);
      //     cnv.add(name);
      //     // cnv.renderAll();
      //   })
      //   .catch((e) => console.log(e));
    }

    // textRef.current = text;
    if (content) {
      const text = new fabric.Textbox(content, textOpt as ITextboxOptions);
      if (textOpt.fontFamily) {
        var textFont = new FontFaceObserver(textOpt.fontFamily);

        textFont
          .load(null, 10000)
          .then((v) => {
            cnv.add(text);
            // cnv.renderAll();
          })
          .catch((e) => console.log(e));
      } else {
        cnv.add(text);
      }
    }

    if (desc) {
      const description = new fabric.Textbox(desc, {
        ...descOpt,
        note: "desc",
      } as ITextboxOptions);

      if (descOpt.fontFamily) {
        var descFont = new FontFaceObserver(descOpt?.fontFamily);

        descFont
          .load(null, 10000)
          .then((v) => {
            cnv.add(description);
            // cnv.renderAll();
          })
          .catch((e) => console.log(e));
      } else {
        cnv.add(description);
      }
    }

    if (vision) {
      var ArrowWithTail = fabric.util.createClass(fabric.Path, {
        initialize: function (options: any) {
          options = options || {};
          var pathData =
            "M 0 0 L 80 0 L 80 -20 L 120 20 L 80 60 L 80 40 L 0 40 z";
          this.callSuper("initialize", pathData, options);
          this.set({
            fill: vision.fill || "white",
            width: 90,
            height: 60,
          });
        },
      });

      // Create an instance of the arrow with a tail
      var arrow = new ArrowWithTail({
        left: 65,
        top: 75,
      });

      // Create a black arrow object
      // var arrow = new fabric.Path("M 0 0 L 20 0 L 20 -5 L 30 5 L 20 15 L 20 10 L 0 10 z", {
      //   fill: 'black',
      //   left: 0,
      //   top: 0
      // });

      // Create a white circle object
      var circle = new fabric.Circle({
        radius: 100,
        fill: vision.bg || "black",
        left: 0,
        top: 0,
      });

      // Create a group to contain the arrow and circle
      var group = new fabric.Group([circle, arrow]);
      group.set({
        top: vision.top,
        left: vision.left,
        scaleX: vision.scaleX,
        scaleY: vision.scaleY,
        //@ts-ignore
        note: "arrow",
      });

      // Add the group to the canvas

      // Add the arrow with a tail to the canvas
      cnv.add(group);
    }
    return () => {
      cnv.dispose();
      setCanvas(undefined);
      // console.log("hello");
    };
  }, [template]);

  useEffect(() => {
    if (canvas && canvas._objects?.length > 0 && globalCanvasHeight > 200) {
      console.log(canvas, globalCanvasHeight);
      canvas.setHeight(globalCanvasHeight as number);
      repos(canvas);
    }
  }, [globalCanvasHeight]);

  useEffect(() => {
    console.log("change color", selBgColor);
    if (canvas && canvas._objects?.length > 0) {
      canvas?.setBackgroundColor(
        selBgColor.color,
        canvas.renderAll.bind(canvas)
      );
    }
  }, [selBgColor]);

  return (
    <div
      className="m-4"
      style={{
        transform: "scale(0.3)",
        transformOrigin: "top left",
        width: 240,
        height: globalCanvasHeight * 0.3,
      }}
    >
      <canvas
        className="mt-8 sm:w-full"
        ref={canvasRef}
        width="200"
        height="200"
      />
    </div>
  );
}
