import React from "react";
import FrameIcon from "../common/icons/FrameIcon";
import TwoFrameIcon from "../common/icons/twoFrameIcon";
import ThreeUpFrameIcon from "../common/icons/threeUpFrameIcon";
import FourFrameIcon from "../common/icons/fourFrameIcon";
import ThreeFrameIcon from "../common/icons/threeFrameIcon";
import ImageDownloadIcon from "../common/icons/imageDownloadIcon";

const Sidebar = ({
  handleDownload,
  isBackgroundChecked,
  isEnhanceChecked,
  handleCheckboxChange,
}: any) => (
  <div className="hidden lg:flex lg:flex-col lg:w-16 lg:bg-sidebar-100 items-center py-2">
    <div className="flex flex-col items-center">
      <div className="flex justify-between p-2 gap-1">
        <p>بکگراند</p>
        <input
          type="checkbox"
          checked={isBackgroundChecked}
          onChange={(e: any) => handleCheckboxChange(e, "background")}
        />
      </div>
      <div className="flex justify-between p-2 gap-1">
        <p>ترمیم</p>
        <input
          type="checkbox"
          checked={isEnhanceChecked}
          onChange={(e: any) => handleCheckboxChange(e, "enhance")}
        />
      </div>
    </div>
    <div className="mt-auto flex flex-col items-center">
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
        <FourFrameIcon />
      </button>
      <button className="mb-4">
        <ThreeFrameIcon />
      </button>
      <button className="mb-2" onClick={handleDownload}>
        <ImageDownloadIcon className="w-4 h-4 md:w-8 md:h-8 lg:w-8 lg:h-8" />
      </button>
    </div>
  </div>
);

export default Sidebar;
