import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface TemplateCarouselProps {
  template: any;
  setselTemp: Dispatch<SetStateAction<any>>;
}

export default function Card({ template, setselTemp }: TemplateCarouselProps) {
  return (
    <>
      {template.map((t: any, i: number) => {
        return (
          <div
            key={`temp-${i}`}
            onClick={() => {
              setselTemp(t);
            }}
            style={{
              width: 100,
              height: 100,
              backgroundImage: `url(${t.sample})`,
              backgroundSize: "cover",
              cursor: "pointer",
            }}
            className="m-4"
          ></div>
        );
      })}
    </>
  );
}
