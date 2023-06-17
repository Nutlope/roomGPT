import React, { useState } from "react";

interface ColorOption {
  color: string;
  label: string;
}

const colors: ColorOption[] = [
  { color: "#F6F7F1", label: "Cream" },
  { color: "#1B2528", label: "Dark grey" },
  { color: "#FFFFFF", label: "White" },
  { color: "#02084B", label: "Dark blue" },
  { color: "#74DFF6", label: "Light blue" },
  { color: "#FAD02C", label: "Yellow" },
];

interface ToolbarProps {
  selectedColor: any;
  setSelectedColor: any;
  generateContent: (event?: any) => Promise<void>;
}

export default function Toolbar({
  selectedColor,
  setSelectedColor,
  generateContent,
}: ToolbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleColorSelect = (color: ColorOption) => {
    setSelectedColor(color);
    setShowDropdown(false);
    // Perform any actions you want with the selected color
  };

  return (
    <div className="toolbar flex justify-between align-middle ">
      <div className="dropdown-container relative">
        <button
          className=" px-4 py-2 rounded"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div
            className={`color-swatch mx-3 rounded`}
            style={{
              backgroundColor: selectedColor?.color,
              borderRadius: "50%",
            }}
          ></div>
        </button>
        {showDropdown && (
          <div className="dropdown absolute top-10 left-0 bg-white p-4 shadow rounded">
            {colors.map((color) => (
              <div
                key={color.color}
                className={`color-swatch mx-3 ${
                  selectedColor?.color === color.color ? "selected" : ""
                }`}
                style={{ backgroundColor: color.color }}
                onClick={() => handleColorSelect(color)}
              ></div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={(e) => {
          generateContent(e);
        }}
        className="bg-white rounded-full text-black border font-medium px-4 py-2  hover:bg-gray-100 transition"
      >
        Refresh
      </button>
      <style jsx>{`
        .toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dropdown-container {
          position: relative;
        }
        .dropdown {
          display: flex;
          position: absolute;
          top: 45px;
          left: 0;
          z-index: 100;
          background: white;
          padding: 10px;
          border-radius: 4px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
        }
        .color-swatch {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
        }
        .selected {
          border: 2px solid black;
        }
        .selected-color {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
