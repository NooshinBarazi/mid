import React from "react";

const ColorPalette = ({
  isColorPaletteOpen,
  selectedColor,
  setSelectedColor,
  addHistory,
}: any) => {
  const colors = [
    { color: "#00FF00", position: "5% 50%" },
    { color: "#FF0000", position: "20% 20%" },
    { color: "#000000", position: "50% 5%" },
    { color: "#808080", position: "80% 20%" },
    { color: "#FFC107", position: "95% 50%" },
    { color: "#0000FF", position: "80% 80%" },
    { color: "#FFC0CB", position: "50% 95%" },
    { color: "#800080", position: "20% 80%" },
  ];

  const handleColorChange = (color: any) => {
    setSelectedColor(color);
    addHistory();
  };

  return (
    isColorPaletteOpen && (
      <div className="fixed inset-0 flex items-end justify-end left-16">
        <div className="relative flex items-center justify-center w-24 h-24 bg-teal-300 rounded-full shadow-lg">
          {colors.map((item, index) => (
            <button
              key={index}
              className="absolute w-4 h-4 rounded-full"
              style={{
                backgroundColor: item.color,
                top: item.position.split(" ")[0],
                left: item.position.split(" ")[1],
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => handleColorChange(item.color)}
            ></button>
          ))}
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-4 h-4 p-0 border-0 rounded-full absolute bottom-1/2-4 left-1/2 transform -translate-x-1/2 bg-transparent"
            style={{ boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.2)" }}
          />
        </div>
      </div>
    )
  );
};

export default ColorPalette;
