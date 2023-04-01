import React from "react";
import { Dispatch, SetStateAction } from "react";

interface TextInputProps {
  txt: string;
  name: string;
  handleChange: Dispatch<SetStateAction<string>>;
}

export default function TextInput({ txt, handleChange, name }: TextInputProps) {
  return (
    <div className="space-y-4 w-full">
      <div className="flex mt-3 items-center space-x-3">
        <p className="text-left font-medium">{name}</p>
      </div>
      <input
        value={txt}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full h-12 text-black px-4"
      />
    </div>
  );
}
