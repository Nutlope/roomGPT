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

const temp5 = {
  sample: "temp3/s1.png",
  title: {
    textOpt: {
      left: 20,
      top: 30,
      fontSize: 30,
      width: 90,
      fontFamily: "League Gothic",
      lineHeight: 1,
      fill: "white",
    },
    imageURL: "temp3/1.png",
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
      fill: "white",
    },
    imageURL: "temp3/1.png",
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
    imageURL: "temp3/1.png",
  },
};
interface contentProps {
  content: string;
  type: keyof typeof temp3;
  desc?: string;
  contentIndex?: number;
}

const content: contentProps[] = [
  { content: "STOP WRITING EMAILS LIKE THIS", type: "title" },
  {
    content: "Trust",
    desc: "Trust takes time. Once you lose, trust with a consumer, it is hard to regain.",
    type: "content",
    contentIndex: 1,
  },
  {
    content: "Delivery",
    desc: "Be sure you deliver on your promises.",
    type: "content",
    contentIndex: 2,
  },
  {
    content: "WAS THIS HELPFUL?",
    desc: "Share with a friend who needs it!",
    type: "end",
  },
];

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
      fontSize: 30,
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
      fontSize: 30,
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
const template = [temp3, temp4, temp5, temp4, temp3];

const CanvasPage = () => {
  const [title, settitle] = useState("second");
  const [selTemp, setselTemp] = useState(temp4);
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.sidebarWrapper}>
      <nav
        className={`${styles.sidebar} ${
          isOpen ? styles.open : ""
        } md:flex flex-wrap hidden`}
      >
        <TemplateCarousel template={template} setselTemp={setselTemp} />
      </nav>
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
