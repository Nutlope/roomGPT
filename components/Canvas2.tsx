import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric';
import { StaticCanvas } from 'fabric/fabric-impl';

const CanvasPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [title, settitle] = useState("second")
  const [textObj, settextObj] = useState<StaticCanvas>()
  const [canvasBackgroundImage, setcanvasBackgroundImage] = useState<StaticCanvas>()

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 800,
      backgroundImage: "/temp1/1.png",
      
    }); 
    const newText = new fabric.IText("Edit me", {
            left: 100,
            top: 100,
            fontFamily: "Arial",
            fontSize: 24,
            fill: "#000",
          });
    
          canvas.add(newText);
          canvas.setActiveObject(newText);

    // const addText = () => {
    //   const newText = new fabric.IText("Edit me", {
    //     left: 100,
    //     top: 100,
    //     fontFamily: "Arial",
    //     fontSize: 24,
    //     fill: "#000",
    //   });

    //   canvas.add(newText);
    //   canvas.setActiveObject(newText);
    // };

    // addText()

    // document.addEventListener("keydown", (e) => {
    //   if (e.code === "Enter" && e.ctrlKey) {
    //     addText();
    //   }
    // });

    // return () => {
    //   document.removeEventListener("keydown", (e) => {
    //     if (e.code === "Enter" && e.ctrlKey) {
    //       addText();
    //     }
    //   });
    // };
  }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current
//     const ctx = canvas?.getContext('2d')

//     if (canvas && ctx) {
//       // Load background image
//       const backgroundImage = new Image()
//       backgroundImage.src = '/temp1/1.png'
//       backgroundImage.onload = () => {
//         // Draw background image on canvas
//         ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     const canvas = canvasRef.current
//     const ctx = canvas?.getContext('2d')
//     if (canvas && ctx) {

//     ctx.font = '48px serif'
//     ctx.fillStyle = 'black'
//     ctx.fillText(title, 50, 100)
//     }
//   }, [title])
  

// useEffect(() => {
//   const canvas = canvasRef.current
//   setcanvasBackgroundImage( new fabric.Canvas(canvas))

//   // Load background image
//   fabric.Image.fromURL('temp1/1.png', (backgroundImage:any) => {
//     // console.log(canvasBackgroundImage)
//     if (canvasBackgroundImage){
//     // Set background image on canvas
//     canvasBackgroundImage.setBackgroundImage(backgroundImage, canvasBackgroundImage.renderAll.bind(canvasBackgroundImage))

//     // Add text to canvas
//     const text = new fabric.Text(title, {
//       left: 50,
//       top: 100,
//       fill: 'black',
//       fontSize: 48,
//       fontFamily: 'serif'
//     })
//     settextObj( canvasBackgroundImage.add(text))
// }
//   })
// }, [])

// useEffect(() => {
//     const text = new fabric.Text(title, {
//         left: 50,
//         top: 100,
//         fill: 'black',
//         fontSize: 48,
//         fontFamily: 'serif'
//       })
//     //   settextObj( canvasBackgroundImage.add(text))
//     textObj?.add(text) 
 
// }, [title])


  return (
    <>
                  <div className="space-y-4 w-full max-w-sm">
                    <div className="flex mt-3 items-center space-x-3">
                      <p className="text-left font-medium">Title</p>
                    </div>
                    <input value={title} onChange={(e)=>settitle(e.target.value)} className="w-full h-12 text-black px-4" />
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

                      <p className="text-left font-medium">Point 2</p>                    </div>
                    <input className="w-full h-12" />
                  </div>

                  <div className="space-y-4 w-full max-w-sm">
                    <div className="flex mt-3 items-center space-x-3">

                      <p className="text-left font-medium">Point 3</p>
                    </div>
                    <input className="w-full h-12" />
                  </div>

                  <div className="space-y-4 w-full max-w-sm">                    <div className="flex mt-3 items-center space-x-3">

                      <p className="text-left font-medium">Conculsion</p>
                    </div>
                    <input className="w-full h-12" />
                  </div>
                  <canvas className='mt-8' ref={canvasRef} width={800} height={600} />
                </>
  )
}

export default CanvasPage;