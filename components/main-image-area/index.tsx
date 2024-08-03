import { FaBars } from "react-icons/fa";
import FourFrameIcon from "../common/icons/fourFrameIcon";
import FrameIcon from "../common/icons/FrameIcon";
import ThreeFrameIcon from "../common/icons/threeFrameIcon";
import ThreeUpFrameIcon from "../common/icons/threeUpFrameIcon";
import TwoFrameIcon from "../common/icons/twoFrameIcon";
import Image from "next/image";
import ColorPalette from "../color-palette";
import { FcAddImage } from "react-icons/fc";

const MainImageArea = ({
  imageSrc,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isColorPaletteOpen,
  setIsColorPaletteOpen,
  selectedColor,
  setSelectedColor,
  addHistory,
  handleImageChange,
  fileInputRef,
  imageTransform,
  isBackgroundChecked,
  isEnhanceChecked,
  handleCheckboxChange,
}: any) => {
  // if (!imageSrc) {
  //   return <div>No image uploaded</div>;
  // }

  const style = {
    transform: `scaleX(${imageTransform.scaleX}) scaleY(${imageTransform.scaleY}) rotate(${imageTransform.rotate}deg)`,
    transition: "transform 0.3s ease",
  };

  return (
    <div className="flex flex-col justify-center items-center lg:flex-grow lg:h-full bg-main-image-100 relative">
      <button
        className="lg:hidden fixed top-0 right-0 m-2 z-10"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FaBars className="w-6 h-6 text-gray-800" />
      </button>

      {imageSrc ? (
        <div className="relative w-full h-full flex items-center justify-center bg-gray-900">
          {imageSrc && (
            <div className="relative w-full h-full">
              <Image
                src={imageSrc as string}
                alt="Uploaded"
                layout="fill"
                objectFit="contain"
                className="absolute inset-0"
                style={style}
              />
            </div>
          )}
          <ColorPalette
            isColorPaletteOpen={isColorPaletteOpen}
            setIsColorPaletteOpen={setIsColorPaletteOpen}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            addHistory={addHistory}
          />
        </div>
      ) : (
        <label className="flex flex-col items-center">
          <FcAddImage className="w-12 h-12 text-gray-500 mb-2" />
          <span className="text-gray-500 text-center">افزودن تصویر</span>
          <input
            type="file"
            className="hidden"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
        </label>
      )}

      {isMobileMenuOpen && (
        <div className="absolute top-12 right-0 bg-neutral-100 shadow-lg rounded-lg p-4">
          <div className="flex flex-col">
            <div className="flex gap-1">
              <p>بکگراند</p>
              <input
                type="checkbox"
                checked={isBackgroundChecked}
                onChange={(e: any) => handleCheckboxChange(e, "background")}
              />
            </div>
            <div className="flex gap-1">
              <p>ترمیم</p>
              <input
                type="checkbox"
                checked={isEnhanceChecked}
                onChange={(e: any) => handleCheckboxChange(e, "enhance")}
              />
            </div>
          </div>
          <p className="mt-2">چندنما: </p>
          <div className="mt-auto grid grid-cols-3 gap-2">
            <button className="mb-4">
              <FrameIcon />
            </button>
            <button className="mb-4">
              <TwoFrameIcon />
            </button>
            <button className="mb-4">
              <ThreeUpFrameIcon />
            </button>
            <button className="mb-4">
              <ThreeFrameIcon />
            </button>
            <button className="mb-4">
              <FourFrameIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default MainImageArea;
