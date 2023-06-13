import React, { useState } from "react";

interface ColorOption {
  color: string;
  label: string;
}

const colors: ColorOption[] = [
  { color: "#02084B", label: "Dark blue" },
  { color: "#74DFF6", label: "Light Blue" },
  { color: "#FAD02C", label: "Yellow" },
];

interface ToolbarProps {
  selectedColor: any;
  setSelectedColor: any;
}

export default function Toolbar({
  selectedColor,
  setSelectedColor,
}: ToolbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleColorSelect = (color: ColorOption) => {
    setSelectedColor(color);
    setShowDropdown(false);
    // Perform any actions you want with the selected color
  };

  return (
    <div className="toolbar">
      <div className="dropdown-container relative">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Background Color
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
