"use client"
import FlipIcon from "@/components/common/icons/flipIcon";
import UndoIcon from "@/components/common/icons/undoIcon";
import ZoomIcon from "@/components/common/icons/zoomIcon";
import MainImageArea from "@/components/main-image-area";
import RightSidebar from "@/components/right-sidebar";
import Sidebar from "@/components/sidebar";
import { enhanceImageQuality, removeBackground } from "@/redux/features/images/imagesSlice";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

const dataURLtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const binaryStringToBlob = (binaryString: string, mimeType: string) => {
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
};


export default function EditImage() {
  const [selectedColor, setSelectedColor] = useState("#f2a436");
  const [history, setHistory] = useState<{ selectedColor: any }[]>([]);
  const [activeSidebar, setActiveSidebar] = useState(null);
  const [sidebarTop, setSidebarTop] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [activeMobileSidebar, setActiveMobileSidebar] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [isBackgroundChecked, setIsBackgroundChecked] = useState(false);
  const [isEnhanceChecked, setIsEnhanceChecked] = useState(false);
  const [imageTransform, setImageTransform] = useState({ scaleX: 1, scaleY: 1, rotate: 0 });
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null); 
  const zoomRef = useRef(null);
  const cropRef = useRef(null);
  const flipRef = useRef(null);

  const handleColorPaletteToggle = () => {
    setIsColorPaletteOpen(!isColorPaletteOpen);
  };

  const handleRemoveImage = () => {
    setImageSrc('')
  }

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.translate(canvas.width / 2, canvas.height / 2);
      ctx?.rotate((imageTransform.rotate * Math.PI) / 180);
      ctx?.scale(imageTransform.scaleX, imageTransform.scaleY);
      ctx?.drawImage(img, -img.width / 2, -img.height / 2);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'edited-image.png';
      link.click();
    };
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          setImageSrc(reader.result as string); 
    }
    reader.readAsDataURL(file);
  }
  }

  const addHistory = () => setHistory([...history, { selectedColor }]);

  const undoHandler = () => {
    if (history.length > 0) {
      const lastState = history.pop();
      if (lastState) setSelectedColor(lastState.selectedColor);
    }
  };

  const flipImage = (direction: 'horizontal' | 'vertical') => {
    setImageTransform(prev => ({
      ...prev,
      scaleX: direction === 'horizontal' ? prev.scaleX * -1 : prev.scaleX,
      scaleY: direction === 'vertical' ? prev.scaleY * -1 : prev.scaleY
    }));
  };

  const handleIconClick = (iconRef: React.RefObject<HTMLButtonElement>, sidebarType: any) => {
    if (activeSidebar === sidebarType) {
      setActiveSidebar(null);
      return;
    }
    if (iconRef.current) {
      const iconRect = iconRef.current.getBoundingClientRect();
      setSidebarTop(iconRect.top + window.scrollY); 
    }
    setActiveSidebar(sidebarType); 
    setIsMobileMenuOpen(false); 
  };
  

  const handleMobileIconClick = (sidebarType: any) => {
    setActiveMobileSidebar(
      activeMobileSidebar === sidebarType ? null : sidebarType
    );
  };

    const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checkboxType: string ) => {
    const isChecked = event.target.checked;
    console.log('Checkbox Type:', checkboxType, 'Checked:', isChecked);

    if (!imageSrc) {
        console.error('No file selected');
        alert('Please select an image first.');
        return;
    }

    const file = dataURLtoFile(imageSrc, 'image.png');
    const formData = new FormData();
    formData.append('image', file);

    if (checkboxType === "background") {
      setIsBackgroundChecked(isChecked);
    } else if (checkboxType === "enhance") {
      setIsEnhanceChecked(isChecked);
    }

    try {
      if (checkboxType === "background" && isChecked) {
        const response = await dispatch(removeBackground({backgroundData: formData}) as any);
       console.log('res remo',response.payload);
       if (removeBackground.fulfilled.match(response)) {
        const binaryData = response.payload; // Binary string from API
        const mimeType = 'image/png'; // Adjust as needed
        const blob = binaryStringToBlob(binaryData, mimeType);
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);

        // Clean up the object URL after the component unmounts
        return () => URL.revokeObjectURL(objectURL);
      }
      } else if (checkboxType === "enhance" && isChecked) {
        const response = await dispatch(enhanceImageQuality({qualityData: formData}) as any);
      if (enhanceImageQuality.fulfilled.match(response)) {
        const enhancedImage = response.payload.enhancedImage;
        setImageSrc(enhancedImage);
      }
    } }catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const renderSidebarContent = (type: string) => {
    switch (type) {
      case "zoom":
        return (
          <>
            <button className="mb-2">
              <ZoomIcon />
            </button>
          </>
        );
      case "flip":
        return (
          <>
            <button className="mb-2">
              <FlipIcon className="w-8 h-8" />
            </button>
          </>
        );
      default:
        return null;
    }
  };

  const renderMobileSidebarContent = (type: any) => {
    switch (type) {
      case "zoom":
        return (
          <>
            <button className="mb-2">
              <ZoomIcon className="w-8 h-8 md:w-8 md:h-8 lg:w-12 lg:h-12" />
            </button>
            <button className="mb-2">
              <UndoIcon />
            </button>
          </>
        );
      case "flip":
        return (
          <>
            <button className="mb-2">
              <FlipIcon className="w-4 h-8 md:w-8 md:h-8 lg:w-12 lg:h-12" />
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Sidebar */}
      <Sidebar
        isBackgroundChecked={isBackgroundChecked}
        isEnhanceChecked={isEnhanceChecked}
        handleCheckboxChange={handleCheckboxChange}
        handleDownload={handleDownload}
      />
 

      {/* Main Image Area */}
      <MainImageArea
        imageSrc={imageSrc}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isColorPaletteOpen={isColorPaletteOpen}
        setIsColorPaletteOpen={setIsColorPaletteOpen}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        addHistory={addHistory}
        handleImageChange={handleImageChange}
        fileInputRef={fileInputRef}
        imageTransform={imageTransform}
        isBackgroundChecked={isBackgroundChecked}
        isEnhanceChecked={isEnhanceChecked}
        handleCheckboxChange={handleCheckboxChange}

      />

      {/* Right Sidebar */}
      <RightSidebar
        zoomRef={zoomRef}
        cropRef={cropRef}
        flipRef={flipRef}
        flipImage={flipImage}
        handleIconClick={handleIconClick}
        activeSidebar={activeSidebar}
        sidebarTop={sidebarTop}
        renderSidebarContent={renderSidebarContent}
        handleMobileIconClick={handleMobileIconClick}
        activeMobileSidebar={activeMobileSidebar}
        renderMobileSidebarContent={renderMobileSidebarContent}
        undoHandler={undoHandler}
        isColorPaletteOpen={isColorPaletteOpen}
        setIsColorPaletteOpen={handleColorPaletteToggle}
        imageSrc={imageSrc}
        handleImageChange={handleImageChange}
        handleRemoveImage={handleRemoveImage}
        handleDownload={handleDownload}
      />
    </div>
  );
};
