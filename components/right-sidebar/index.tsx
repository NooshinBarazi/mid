import { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import React from "react";
import { useRouter } from "next/navigation";
import DoneIcon from "../common/icons/doneIcon";
import MarkingIcon from "../common/icons/markingIcon";
import AddIcon from "../common/icons/addIcon";
import RemoveIcon from "../common/icons/removeIcon";
import DeleteIcon from "../common/icons/deleteIcon";
import FlipIcon from "../common/icons/flipIcon";
import HorizontalFlipIcon from "../common/icons/horizontalFlipIcon";
import BackIcon from "../common/icons/backIcon";
import ZoomIcon from "../common/icons/zoomIcon";
import CropIcon from "../common/icons/cropIcon";
import UndoIcon from "../common/icons/undoIcon";
import HomeImageIcon from "../common/icons/homeImageIcon";
import ImageDownloadIcon from "../common/icons/imageDownloadIcon";

const RightSidebar = ({
  fileInputRef,
  flipImage,
  handleRemoveImage,
  undoHandler,
  isColorPaletteOpen,
  setIsColorPaletteOpen,
}: any) => {
  const [activeSidebar, setActiveSidebar] = useState<string | null>(null);
  const [sidebarTop, setSidebarTop] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showZoomContent, setShowZoomContent] = useState(false);
  const [showFlipContent, setShowFlipContent] = useState(false);
  const zoomRef = useRef<HTMLButtonElement | null>(null);
  const cropRef = useRef<HTMLButtonElement | null>(null);
  const flipRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();


  const handleIconClick = (
    iconRef: React.RefObject<HTMLButtonElement>,
    sidebarType: string
  ) => {
    if (window.innerWidth >= 1024) {
      // Desktop mode
      if (activeSidebar === sidebarType) {
        setActiveSidebar(null);
        setShowZoomContent(false);
        setShowFlipContent(false);
        return;
      }
      if (iconRef.current) {
        const iconRect = iconRef.current.getBoundingClientRect();
        setSidebarTop(iconRect.top);
      }
      setActiveSidebar(sidebarType);
      setShowZoomContent(false); // Ensure zoom content is hidden on desktop
      setShowFlipContent(sidebarType === "flip");
    } else {
      // Mobile mode
      if (sidebarType === "zoom") {
        setShowZoomContent(true);
        setActiveSidebar(null);
      }else if (sidebarType === "flip") {
        setShowFlipContent(true);
        setShowZoomContent(false);
        setActiveSidebar(null);
      } else {
        setShowZoomContent(false);
        setActiveSidebar(sidebarType);
      }
    }
  };
  const handleBackIconClick = () => {
    setShowZoomContent(false);
    setShowFlipContent(false);
    setActiveSidebar(null);
  };

  const renderSidebarContent = () => {
    switch (activeSidebar) {
      case "zoom":
        return (
          <>
            <button className="mb-2">
              <DoneIcon />
            </button>
            <button className="mb-2">
              <MarkingIcon />
            </button>
            <button className="mb-2">
              <AddIcon />
            </button>
            <button className="mb-2">
              <RemoveIcon />
            </button>
            <button className="mb-2">
              <DeleteIcon />
            </button>
          </>
        );
      case "flip":
        return (
          <>
            <button className="mb-2" onClick={() => flipImage("horizontal")}>
              <FlipIcon className="w-8 h-8" />
            </button>
            <button className="mb-2" onClick={() => flipImage("vertical")}>
              <HorizontalFlipIcon className="w-8 h-8" />
            </button>
          </>
        );
      default:
        return null;
    }
  };

  const renderZoomContent = () => (
    <div className="flex items-center justify-between w-full h-full bg-gray-100">
      <button className="mb-2">
        <DoneIcon />
      </button>
      <button className="mb-2">
        <MarkingIcon />
      </button>
      <button className="mb-2">
        <AddIcon />
      </button>
      <button className="mb-2">
        <RemoveIcon />
      </button>
      <button className="mb-2">
        <DeleteIcon />
      </button>
    </div>
  );

  const renderFlipContent = () => (
    <div className="flex items-center justify-between w-full h-full bg-gray-100">
      <button className="mb-2" onClick={() => flipImage("horizontal")}>
        <FlipIcon className="w-8 h-8" />
      </button>
      <button className="mb-2" onClick={() => flipImage("vertical")}>
        <HorizontalFlipIcon className="w-8 h-8" />
      </button>
      <button
        className="absolute top-2 right-2 p-2 bg-gray-300 rounded"
        onClick={handleBackIconClick}
      >
        <BackIcon className="w-6 h-6" />
      </button>
    </div>
  );


  return (
    <div className="lg:w-16 lg:h-full bg-sidebar-100 flex lg:flex-col items-center justify-between gap-2 p-2 fixed bottom-0 w-full lg:relative lg:bottom-auto">
      {/* Top Icons */}
      {(!showZoomContent && !showFlipContent)&& (
        <div className="flex lg:flex-col items-center justify-around lg:justify-start gap-4">
          <button className="hidden lg:flex lg:mb-2 lg:text-3xl">
            <FaUserCircle />
          </button>
          <button
            ref={zoomRef}
            className="mb-2 rounded"
            onClick={() => handleIconClick(zoomRef, "zoom")}
          >
            <ZoomIcon className="w-8 h-8 md:w-8 md:h-8 lg:w-12 lg:h-12" />
          </button>
          <button
            ref={cropRef}
            className="mb-2"
            // Add handler for crop if needed
          >
            <CropIcon className="w-4 h-4 md:w-8 md:h-8 lg:w-8 lg:h-8" />
          </button>
          <button
            ref={flipRef}
            className="mb-2"
            onClick={() => handleIconClick(flipRef, "flip")}
          >
            <FlipIcon className="w-4 h-4 md:w-8 md:h-8 lg:w-8 lg:h-8" />
          </button>
        </div>
      )}

      {/* Bottom Icons */}
      {(!showZoomContent && !showFlipContent) && (
        <div className="flex lg:flex-col items-center justify-around lg:justify-end gap-4 lg:mt-auto">
          {/* <button className="mb-2">
          <label htmlFor="image" className="cursor-pointer">
            <FcAddImage size={32} />
          </label>
          <input
            ref={fileInputRef}
            onChange={handleImageChange}
            type="file"
            id="image"
            name="image"
            className="hidden"
          />
        </button> */}
          <button
            className="mb-2"
            onClick={() => setIsColorPaletteOpen(!isColorPaletteOpen)}
          >
            <div
              className={`w-4 h-4 lg:w-8 lg:h-8 ${
                isColorPaletteOpen ? "bg-teal-300" : "bg-gray-300"
              } rounded-full`}
            ></div>
          </button>
          <button className="mb-2" onClick={undoHandler}>
            <UndoIcon className="w-4 h-4 md:w-8 md:h-8 lg:w-8 lg:h-8" />
          </button>
          <button className="mb-2" onClick={handleRemoveImage}>
            <BackIcon className="w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12" />
          </button>
          <button className="mb-2" onClick={() => router.push("/")}>
            <HomeImageIcon className="hidden lg:flex w-8 h-8" />
            <ImageDownloadIcon className="lg:hidden w-4 h-4 md:w-8 md:h-8" />
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      {(activeSidebar && !showZoomContent && !showFlipContent) && (
        <div
          className="absolute left-16 lg:right-auto lg:w-12 bg-gray-200 flex flex-col gap-8 items-center p-4"
          style={{ top: `${sidebarTop}px` }}
        >
          {renderSidebarContent()}
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      {showZoomContent ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          {renderZoomContent()}
          <button
            className="absolute top-2 right-2 p-2 bg-gray-300 rounded"
            onClick={handleBackIconClick}
          >
            <BackIcon className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-200 shadow-lg rounded-t-lg p-2 flex justify-around">
          <button
            className={`p-1 ${
              activeSidebar === "zoom"
                ? "bg-primary-100 text-white"
                : "text-primary-100"
            }`}
            onClick={() => handleIconClick(zoomRef, "zoom")}
          >
            <ZoomIcon className="w-8 h-8 md:w-8 md:h-8 lg:w-12 lg:h-12" />
          </button>
          <button
            className={`p-1 ${
              activeSidebar === "crop"
                ? "bg-primary-100 text-white"
                : "text-primary-100"
            }`}
          >
            <CropIcon className="w-4 h-8 md:w-8 md:h-8 lg:w-12 lg:h-12" />
          </button>
          <button
            className={`p-1 ${
              activeSidebar === "flip"
                ? "bg-primary-100 text-white"
                : "text-primary-100"
            }`}
            onClick={() => handleIconClick(flipRef, "flip")}
          >
            <FlipIcon className="w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12" />
          </button>
          <button className="p-1 text-primary-100">
            <UndoIcon className="w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12" />
          </button>
          <button className="p-1 text-primary-100" onClick={handleRemoveImage}>
            <BackIcon className="w-4 h-8 md:w-8 md:h-8 lg:w-12 lg:h-12" />
          </button>
        </div>
      )}

      
    </div>
  );
};

export default RightSidebar;
