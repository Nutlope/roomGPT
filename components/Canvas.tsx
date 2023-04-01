import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { StaticCanvas } from "fabric/fabric-impl";
import Card from "./Card";
import TextInput from "./TextInput";

const CanvasPage = () => {
  const [title, settitle] = useState("second");

  return (
    <div className="flex">
      {/* <div className="flex flex-col mx-8">
        <TextInput name="Title" txt={title} handleChange={settitle} />
        <TextInput name="Introduction" txt={title} handleChange={settitle} />
        <TextInput name="Point 1" txt={title} handleChange={settitle} />
        <TextInput name="Point 2" txt={title} handleChange={settitle} />
        <TextInput name="Point 2" txt={title} handleChange={settitle} />
        <TextInput name="Conclustion" txt={title} handleChange={settitle} />
      </div> */}
      <div className="flex flex-row flex-wrap">
        <Card
          content="STOP WRITING EMAILS LIKE THIS"
          handleChange={settitle}
          name="title"
          textOpt={{
            left: 20,
            top: 30,
            fontSize: 30,
            width: 90,
            fontFamily: "League Gothic",
            lineHeight: 1,
          }}
          imageURL="temp1/1.png"
        />
        {/* <Card
          content="Engage with Other Users"
          handleChange={settitle}
          name="title"
          textOpt={{
            left: 20,
            top: 40,
            fontSize: 30,
            width: 90,
            fontFamily: "League Gothic",
            lineHeight: 1,
          }}
          imageURL="temp1/2.png"
        /> */}
        <Card
          content="Trust"
          textOpt={{
            left: 10,
            top: 68,
            fontSize: 30,
            width: 180,
            fontFamily: "League Gothic",
            lineHeight: 1,
            textAlign: "center",
          }}
          desc="Trust takes time. Once you lose
          trust with a consumer, it is hard to regain."
          descOpt={{
            left: 10,
            top: 104,
            fontSize: 16,
            width: 170,
            fontFamily: "League Gothic",
            fontWeight: "light",
            lineHeight: 1,
            textAlign: "center",
          }}
          handleChange={settitle}
          name="title"
          imageURL="temp1/3.png"
        />
        <Card
          content="Delivery"
          textOpt={{
            left: 0,
            top: 68,
            fontSize: 30,
            width: 200,
            fontFamily: "League Gothic",
            lineHeight: 1,
            textAlign: "center",
          }}
          desc="Be sure you deliver on your promises."
          descOpt={{
            left: 0,
            top: 104,
            fontSize: 16,
            width: 200,
            fontFamily: "League Gothic",
            fontWeight: "light",
            lineHeight: 1,
            textAlign: "center",
          }}
          handleChange={settitle}
          name="title"
          imageURL="temp1/4.png"
        />
        {/* <Card
          content="Text Placeholder"
          textOpt={{
            left: 20,
            top: 40,
            fontSize: 30,
            width: 90,
            fontFamily: "League Gothic",
            lineHeight: 1,
          }}
          handleChange={settitle}
          name="title"
          imageURL="temp1/5.png"
        />
        <Card
          content="Text Placeholder"
          handleChange={settitle}
          name="title"
          textOpt={{
            left: 20,
            top: 40,
            fontSize: 30,
            width: 90,
            fontFamily: "League Gothic",
            lineHeight: 1,
          }}
          imageURL="temp1/6.png"
        /> */}
        <Card
          content="WAS THIS HELPFUL?"
          textOpt={{
            left: 20,
            top: 36,
            fontSize: 30,
            width: 160,
            fontFamily: "League Gothic",
            lineHeight: 1,
            textAlign: "center",
          }}
          desc="Share with a friend who needs it!"
          descOpt={{
            left: 0,
            top: 100,
            fontSize: 16,
            width: 200,
            fontFamily: "League Gothic",
            fontWeight: "light",
            lineHeight: 1,
            textAlign: "center",
          }}
          handleChange={settitle}
          name="title"
          imageURL="temp1/7.png"
        />
      </div>
    </div>
  );
};

export default CanvasPage;
