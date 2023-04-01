import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { StaticCanvas } from "fabric/fabric-impl";

const CanvasPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [title, settitle] = useState("secon2d");
  const [canvas, setCanvas] = useState<StaticCanvas>();
  const [textObj, settextObj] = useState<StaticCanvas>();
  const [canvasBackgroundImage, setcanvasBackgroundImage] =
    useState<StaticCanvas>();
  const textRef = useRef<fabric.Text>();
  const [inputText, setInputText] = useState("heelo");
  const backgroundImage = new Image();
  backgroundImage.src = "/temp1/1.png";
  useEffect(() => {
    if (!canvasRef.current) return;
    const cnv = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 800,
    });
    setCanvas(cnv);

    // cnv.setBackgroundImage("/temp1/1.png")
    // Load background image

    // cnv.setBackgroundImage("/temp1/1.png", cnv.renderAll.bind(cnv));

    // const canvasBackgroundImage = new fabric.Canvas(canvasRef.current as HTMLCanvasElement)

    // Load background image
    fabric.Image.fromURL("/temp1/1.png", (backgroundImage) => {
      // Set background image on canvas
      //   cnv.setBackgroundImage(backgroundImage, cnv.renderAll.bind(cnv))
      const text = new fabric.Text(inputText, {
        left: 10,
        top: 10,
        fontSize: 20,
      });
      cnv.add(text);

      textRef.current = text;
      // Add text to canvas
    });
    // fabric.Image.fromURL('/temp1/1.png', (img) => {
    //     cnv.setBackgroundImage(img, cnv.renderAll.bind(cnv), {
    //       scaleX: (cnv.width||1) / (img.width||1),
    //       scaleY: (cnv.height||1) / (img.height||1),
    //     });

    // })

    return () => {
      // cnv.dispose();
    };
  }, []);

  const handleChange = (event: any) => {
    setInputText(event.target.value);
    if (textRef.current) {
      textRef.current.set({ text: event.target.value });
      canvas?.renderAll();
    }
  };

  return (
    <div>
      <h1>Text Input and Canvas Binding with Fabric.js</h1>
      <input
        type="text"
        className="text-black"
        value={inputText}
        onChange={handleChange}
        placeholder="Enter text here"
      />
      <div style={{ marginTop: "20px" }}>
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: "1px solid #c0c0c0" }}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-4 w-full max-w-sm">
        <div className="flex mt-3 items-center space-x-3">
          <p className="text-left font-medium">Title</p>
        </div>
        <input
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="w-full h-12 text-black px-4"
        />
      </div>

      <div className="space-y-4 w-full max-w-sm">
        <div className="flex mt-3 items-center space-x-3">
          <p className="text-left font-medium">Introduction</p>
        </div>
        <input className="w-full h-12" />
      </div>
      <div className="space-y-4 w-full max-w-sm">
        <div className="flex mt-3 items-center space-x-3">
          <p className="text-left font-medium">Point 1</p>
        </div>
        <input className="w-full h-12" />
      </div>

      <div className="space-y-4 w-full max-w-sm">
        <div className="flex mt-3 items-center space-x-3">
          <p className="text-left font-medium">Point 2</p>{" "}
        </div>
        <input className="w-full h-12" />
      </div>

      <div className="space-y-4 w-full max-w-sm">
        <div className="flex mt-3 items-center space-x-3">
          <p className="text-left font-medium">Point 3</p>
        </div>
        <input className="w-full h-12" />
      </div>

      <div className="space-y-4 w-full max-w-sm">
        {" "}
        <div className="flex mt-3 items-center space-x-3">
          <p className="text-left font-medium">Conculsion</p>
        </div>
        <input className="w-full h-12" />
      </div>
      <canvas className="mt-8" ref={canvasRef} width={800} height={600} />
    </>
  );
};

export default CanvasPage;
