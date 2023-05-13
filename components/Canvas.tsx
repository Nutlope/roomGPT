import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { StaticCanvas } from "fabric/fabric-impl";
import Card from "./Card";
import TextInput from "./TextInput";
import TemplateCarousel from "./TemplateCarousel";
import styles from "../styles/Sidebar.module.css";

const temp3 = {
  sample: "temp1/s1.png",
  title: {
    textOpt: {
      left: 20,
      top: 30,
      fontSize: 30,
      width: 90,
      fontFamily: "League Gothic",
      lineHeight: 1,
    },
    imageURL: "temp1/1.png",
    descOpt: {},
  },
  content: {
    textOpt: {
      left: 10,
      top: 68,
      fontSize: 30,
      width: 180,
      fontFamily: "League Gothic",
      lineHeight: 1,
      textAlign: "center",
    },
    descOpt: {
      left: 10,
      top: 104,
      fontSize: 16,
      width: 170,
      fontFamily: "League Gothic",
      fontWeight: "light",
      lineHeight: 1,
      textAlign: "center",
    },
    imageURL: "temp1/3.png",
  },
  end: {
    textOpt: {
      left: 20,
      top: 36,
      fontSize: 30,
      width: 160,
      fontFamily: "League Gothic",
      lineHeight: 1,
      textAlign: "center",
    },
    descOpt: {
      left: 0,
      top: 100,
      fontSize: 16,
      width: 200,
      fontFamily: "League Gothic",
      fontWeight: "light",
      lineHeight: 1,
      textAlign: "center",
    },
    imageURL: "temp1/7.png",
  },
};
const temp1 = [
  {
    name: "title",
    textOpt: {
      left: 20,
      top: 30,
      fontSize: 30,
      width: 90,
      fontFamily: "League Gothic",
      lineHeight: 1,
    },
    imageURL: "temp1/1.png",
  },
  {
    content: "Trust",
    textOpt: {
      left: 10,
      top: 68,
      fontSize: 30,
      width: 180,
      fontFamily: "League Gothic",
      lineHeight: 1,
      textAlign: "center",
    },
    desc: "Trust takes time. Once you lose, trust with a consumer, it is hard to regain.",
    descOpt: {
      left: 10,
      top: 104,
      fontSize: 16,
      width: 170,
      fontFamily: "League Gothic",
      fontWeight: "light",
      lineHeight: 1,
      textAlign: "center",
    },
    name: "title",
    imageURL: "temp1/3.png",
  },
  {
    content: "Delivery",
    textOpt: {
      left: 0,
      top: 68,
      fontSize: 30,
      width: 200,
      fontFamily: "League Gothic",
      lineHeight: 1,
      textAlign: "center",
    },
    desc: "Be sure you deliver on your promises.",
    descOpt: {
      left: 0,
      top: 104,
      fontSize: 16,
      width: 200,
      fontFamily: "League Gothic",
      fontWeight: "light",
      lineHeight: 1,
      textAlign: "center",
    },
    name: "title",
    imageURL: "temp1/4.png",
  },
  {
    content: "WAS THIS HELPFUL?",
    textOpt: {
      left: 20,
      top: 36,
      fontSize: 30,
      width: 160,
      fontFamily: "League Gothic",
      lineHeight: 1,
      textAlign: "center",
    },
    desc: "Share with a friend who needs it!",
    descOpt: {
      left: 0,
      top: 100,
      fontSize: 16,
      width: 200,
      fontFamily: "League Gothic",
      fontWeight: "light",
      lineHeight: 1,
      textAlign: "center",
    },
    name: "title",
    imageURL: "temp1/7.png",
  },
];

const temp4 = {
  sample: "temp2/s1.png",
  title: {
    name: "title",
    textOpt: {
      fill: "white",
      left: 20,
      top: 30,
      fontSize: 20,
      width: 160,
      fontFamily: "Montserrat",
      lineHeight: 1,
    },
    imageURL: "temp2/1.png",
  },
  content: {
    textOpt: {
      fill: "white",
      left: 10,
      top: 20,
      fontSize: 20,
      width: 180,
      fontFamily: "Montserrat",
      lineHeight: 1,
      textAlign: "center",
      backgroundColor: "#FF5757",
    },
    descOpt: {
      fill: "white",
      left: 10,
      top: 60,
      fontSize: 16,
      width: 170,
      fontFamily: "Montserrat",
      fontWeight: "light",
      lineHeight: 1,
      textAlign: "center",
    },
    imageURL: "temp2/2.png",
  },
  end: {
    textOpt: {
      fill: "white",
      left: 20,
      top: 36,
      fontSize: 20,
      width: 160,
      fontFamily: "Montserrat",
      lineHeight: 1,
      textAlign: "center",
    },
    descOpt: {
      fill: "white",
      left: 0,
      top: 100,
      fontSize: 16,
      width: 200,
      fontFamily: "Montserrat",
      fontWeight: "light",
      lineHeight: 1,
      textAlign: "center",
    },
    imageURL: "temp2/3.png",
  },
};

const temp2 = [
  {
    name: "title",
    textOpt: {
      fill: "white",
      left: 20,
      top: 30,
      fontSize: 30,
      width: 90,
      fontFamily: "Montserrat",
      lineHeight: 1,
    },
    imageURL: "temp2/1.png",
  },
  {
    content: "Trust",
    textOpt: {
      fill: "white",
      left: 10,
      top: 68,
      fontSize: 30,
      width: 180,
      fontFamily: "Montserrat",
      lineHeight: 1,
      textAlign: "center",
    },
    desc: "Trust takes time. Once you lose, trust with a consumer, it is hard to regain.",
    descOpt: {
      fill: "white",
      left: 10,
      top: 104,
      fontSize: 16,
      width: 170,
      fontFamily: "Montserrat",
      fontWeight: "light",
      lineHeight: 1,
      textAlign: "center",
    },
    name: "title",
    imageURL: "temp2/2.png",
  },
  {
    content: "Delivery",
    textOpt: {
      fill: "white",
      left: 0,
      top: 68,
      fontSize: 30,
      width: 200,
      fontFamily: "League Gothic",
      lineHeight: 1,
      textAlign: "center",
    },
    desc: "Be sure you deliver on your promises.",
    descOpt: {
      fill: "white",
      left: 0,
      top: 104,
      fontSize: 16,
      width: 200,
      fontFamily: "League Gothic",
      fontWeight: "light",
      lineHeight: 1,
      textAlign: "center",
    },
    name: "title",
    imageURL: "temp2/2.png",
  },
  {
    content: "WAS THIS HELPFUL?",
    textOpt: {
      fill: "white",
      left: 20,
      top: 36,
      fontSize: 30,
      width: 160,
      fontFamily: "League Gothic",
      lineHeight: 1,
      textAlign: "center",
    },
    desc: "Share with a friend who needs it!",
    descOpt: {
      fill: "white",
      left: 0,
      top: 100,
      fontSize: 16,
      width: 200,
      fontFamily: "League Gothic",
      fontWeight: "light",
      lineHeight: 1,
      textAlign: "center",
    },
    name: "title",
    imageURL: "temp2/3.png",
  },
];

const temp5 = {
  sample: "sample/1.png",
  title: {
    textOpt: {
      left: 10,
      top: 80,
      fontSize: 20,
      width: 180,
      // fontFamily: "League Gothic",
      lineHeight: 1,
      fill: "black",
      textAlign: "center",
    },
    profile: {
      left: 10, // set left position
      top: 10, // set top position
      scaleX: 0.5,
      scaleY: 0.5,
      fill: "black",
    },
    // imageURL: "temp3/1.png",
    backgroundColor: "#F6F7F1",

    descOpt: {
      left: 10,
      top: 104,
      fontSize: 12,
      width: 170,
      // fontFamily: "League Gothic",
      // fontWeight: "light",
      lineHeight: 1,
      textAlign: "left",
      fill: "black",
    },
  },
  content: {
    textOpt: {
      left: 10,
      top: 70,
      fontSize: 20,
      width: 180,
      // fontFamily: "League Gothic",
      lineHeight: 1,
      textAlign: "center",
      fill: "black",
    },
    descOpt: {
      left: 10,
      top: 104,
      fontSize: 12,
      width: 170,
      // fontFamily: "League Gothic",
      // fontWeight: "light",
      lineHeight: 1,
      textAlign: "left",
      fill: "black",
    },
    profile: {
      left: 10, // set left position
      top: 10, // set top position
      scaleX: 0.5,
      scaleY: 0.5,
      fill: "black",
    },
    // imageURL: "temp3/1.png",
    backgroundColor: "#F6F7F1",
  },
  end: {
    textOpt: {
      left: 20,
      top: 75,
      fontSize: 20,
      width: 160,
      // fontFamily: "League Gothic",`
      lineHeight: 1,
      textAlign: "left",
      fill: "black",
    },
    descOpt: {
      left: 10,
      top: 125,
      fontSize: 12,
      width: 180,
      // fontFamily: "League Gothic",
      lineHeight: 1,
      textAlign: "left",
      fill: "black",
    },
    profile: {
      left: 10, // set left position
      top: 10, // set top position
      scaleX: 0.5,
      scaleY: 0.5,
      fill: "black",
    },
    // imageURL: "temp3/1.png",
    backgroundColor: "#F6F7F1",
  },
};
const temp6 = {
  sample: "sample/2.png",
  title: {
    textOpt: {
      left: 10,
      top: 80,
      fontSize: 20,
      width: 180,
      // fontFamily: "League Gothic",
      lineHeight: 1,
      fill: "white",
      textAlign: "center",
    },
    profile: {
      left: 10, // set left position
      top: 10, // set top position
      scaleX: 0.5,
      scaleY: 0.5,
      fill: "white",
    },
    // imageURL: "temp3/1.png",
    backgroundColor: "#1B2528",

    descOpt: {
      left: 10,
      top: 104,
      fontSize: 12,
      width: 170,
      // fontFamily: "League Gothic",
      // fontWeight: "light",
      lineHeight: 1,
      textAlign: "left",
      fill: "black",
    },
  },
  content: {
    textOpt: {
      left: 10,
      top: 70,
      fontSize: 20,
      width: 180,
      // fontFamily: "League Gothic",
      lineHeight: 1,
      textAlign: "center",
      fill: "white",
    },
    descOpt: {
      left: 10,
      top: 104,
      fontSize: 12,
      width: 170,
      // fontFamily: "League Gothic",
      // fontWeight: "light",
      lineHeight: 1,
      textAlign: "left",
      fill: "white",
    },
    profile: {
      left: 10, // set left position
      top: 10, // set top position
      scaleX: 0.5,
      scaleY: 0.5,
      fill: "white",
    },
    // imageURL: "temp3/1.png",
    backgroundColor: "#1B2528",
  },
  end: {
    textOpt: {
      left: 20,
      top: 75,
      fontSize: 20,
      width: 160,
      // fontFamily: "League Gothic",`
      lineHeight: 1,
      textAlign: "center",
      fill: "white",
    },
    descOpt: {
      left: 10,
      top: 125,
      fontSize: 12,
      width: 180,
      // fontFamily: "League Gothic",
      lineHeight: 1,
      textAlign: "left",
      fill: "white",
    },
    profile: {
      left: 10, // set left position
      top: 10, // set top position
      scaleX: 0.5,
      scaleY: 0.5,
      fill: "white",
    },
    // imageURL: "temp3/3.png",
    backgroundColor: "#1B2528",
  },
};

const temp7 = {
  sample: "sample/1.png",
  title: {
    textOpt: {
      left: 10,
      top: 80,
      fontSize: 20,
      width: 180,
      // fontFamily: "League Gothic",
      lineHeight: 1,
      fill: "black",
      textAlign: "left",
    },
    profile: {
      left: 10, // set left position
      top: 10, // set top position
      scaleX: 0.5,
      scaleY: 0.5,
      fill: "black",
    },
    // imageURL: "temp3/1.png",
    backgroundColor: "#FFFFFF",

    descOpt: {
      left: 10,
      top: 104,
      fontSize: 12,
      width: 170,
      // fontFamily: "League Gothic",
      // fontWeight: "light",
      lineHeight: 1,
      textAlign: "left",
      fill: "black",
    },
  },
  content: {
    textOpt: {
      left: 10,
      top: 70,
      fontSize: 20,
      width: 180,
      // fontFamily: "League Gothic",
      lineHeight: 1,
      textAlign: "left",
      fill: "black",
    },
    descOpt: {
      left: 10,
      top: 104,
      fontSize: 12,
      width: 170,
      // fontFamily: "League Gothic",
      // fontWeight: "light",
      lineHeight: 1,
      textAlign: "left",
      fill: "black",
    },
    profile: {
      left: 10, // set left position
      top: 10, // set top position
      scaleX: 0.5,
      scaleY: 0.5,
      fill: "black",
    },
    // imageURL: "temp3/1.png",
    backgroundColor: "#FFFFFF",
  },
  end: {
    textOpt: {
      left: 20,
      top: 75,
      fontSize: 20,
      width: 160,
      // fontFamily: "League Gothic",`
      lineHeight: 1,
      textAlign: "center",
      fill: "black",
    },
    descOpt: {
      left: 10,
      top: 125,
      fontSize: 12,
      width: 180,
      // fontFamily: "League Gothic",
      lineHeight: 1,
      textAlign: "left",
      fill: "black",
    },
    profile: {
      left: 10, // set left position
      top: 10, // set top position
      scaleX: 0.5,
      scaleY: 0.5,
      fill: "black",
    },
    // imageURL: "temp3/3.png",
    backgroundColor: "#FFFFFF",
  },
};
interface contentProps {
  index: any;
  content: string;
  desc?: string;
  type: keyof typeof temp3;
}

const craw = `1. Put yourself first: Stop people pleasing and start taking care of yourself! 
2. Learn to say no: Don't feel obligated to do things that don't make you happy. 
3. Take time for yourself: Enjoy the little things and make time for yourself. 
4. Join the newsletter: Get these comics delivered to your inbox weekly. 
5. Click here to sign up now and make self-care a priority!`;

function parseContent(c: string): contentProps[] {
  const pattern: RegExp = /(\d+)\.\s(.*?):\s(.*?)(?=\n\d+\.|$)/gs;
  const matches: RegExpMatchArray[] = Array.from(c.matchAll(pattern));
  const points: contentProps[] = matches.map((match, index) => ({
    index: match[0],
    type:
      index !== 0 ? "content" : index === matches.length - 1 ? "end" : "title",
    content: match[2].substring(1),
    desc: match[3],
  }));

  return points;
}

function parseContent2(raw: string): any {
  // const regex = /^\s*\d+\.\s*(.*)$/gm;
  const regex = /^\s*\d+\.\s*(.*)$/gm;
  const points = [];
  let match;
  // console.log(raw);

  while ((match = regex.exec(raw))) {
    points.push(match[1]);
    // console.log(match);
  }

  return points.map((item, index) => {
    // var point = item.replace(/^\d+\. \s*/, "").split(":");
    var point = item
      .replace(/^\d+\. \s*/, "")
      .replace("[Hook] ", "")
      .replace("[Call to Action] ", "");
    // console.log(point);
    return {
      index,
      type:
        index === 0
          ? "content"
          : index !== points.length - 1
          ? "content"
          : "end",
      // content: point,
      desc: point,
    };
  });
  // return point;
}

function parseContent3(raw: string): any {
  const points = raw.split("\n\n");
  return points.map((slide, index) => {
    return {
      index,
      type:
        index === 0
          ? "content"
          : index !== points.length - 1
          ? "content"
          : "end",
      content: slide.replace(/Slide \d+: /, ""),
    };
  });
  // return slideArray;
}
// [
//   {
//     content: "Discover the best way to achieve balance in your life!",
//     type: "title",
//   },
//   {
//     content: "Set your priorities",
//     desc: "Evaluate your needs and wants to determine what's most important to you. This will help you create a plan of action to achieve balance in your life.",
//     type: "content",
//     contentIndex: 1,
//   },
//   {
//     content: "Take breaks",
//     desc: "Allow yourself to step away from work to pursue personal interests or hobbies. This can help you recharge and give you the energy to tackle your responsibilities.",
//     type: "content",
//     contentIndex: 2,
//   },
//   {
//     content: "Find the right balance",
//     desc: "Create a unique balance that fits your own individual needs and priorities. This can help you stay motivated and productive.",
//     type: "content",
//   },
//   {
//     content: "Ready to find balance?",
//     desc: "Take the first step todav!",
//     type: "end",
//   },
// ];

const template = [temp5, temp6, temp7];

const CanvasPage = ({ contentSum }: { contentSum: string }) => {
  const [title, settitle] = useState("second");
  const [selTemp, setselTemp] = useState(temp5);
  const [isOpen, setIsOpen] = useState(true);
  const [globalCanvasHeight, setGlobalCanvasHeight] = useState(200);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const content: contentProps[] = parseContent2(contentSum);

  return (
    <div className={styles.sidebarWrapper}>
      <div>
        <nav className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
          <h2>Templates</h2>
          <div className="md:flex flex-wrap hidden content-center ">
            <TemplateCarousel template={template} setselTemp={setselTemp} />
          </div>
        </nav>
      </div>
      {/* <button onClick={handleToggle}>Toggle Sidebar</button> */}
      <div
        className={`flex flex-row flex-wrap ${
          isOpen ? "md:ml-64" : ""
        } transition-all duration-300 ease-in-out`}
      >
        {content.map((item, index) => {
          return (
            <Card
              key={`card-"${index}`}
              template={selTemp[item.type]}
              item={item}
              globalCanvasHeight={globalCanvasHeight}
              setGlobalCanvasHeight={setGlobalCanvasHeight}
              // content={item.content}
              // textOpt={selTemp[item.type]?.textOpt}
              // desc={item.desc}
              // descOpt={selTemp[item.type]?.descOpt}
              // contentIndex={item.contentIndex}
              // imageURL={selTemp[item.type]?.imageURL}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CanvasPage;
