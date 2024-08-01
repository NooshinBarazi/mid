import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import CameraIcon from "../icons/cameraIcon";
import DownloadIcon from "../icons/downloadIcon";
import HomeIcon from "../icons/homeIcon";
import ProfileIcon from "../icons/profileIcon";
import ShopIcon from "../icons/shopIcon";

const Footer = () => {
  return (
    <div className="w-full">
      <footer className="flex justify-between items-center h-37 mt-4 bg-white rounded-t-md md:hidden  bg-gradient-to-r from-orange-300 to-orange-200">
        <div className="flex justify-between items-center px-4 mt-1 bg-white w-full rounded-t-md">
          <a href="/" className="flex flex-col items-center text-white">
            <HomeIcon />
          </a>
          <a href="#" className="flex flex-col items-center text-white">
            <DownloadIcon />
          </a>
          <div className="relative bottom-4  rounded-full border-2 border-orange-500">
            <div className=" p-0.5 bg-white  rounded-full">
              <input
                type="file"
                accept="image/*"
                // onChange={handleFileChange}
                className="hidden"
                id="upload-input-mobile"
              />
              <label htmlFor="upload-input-mobile" className="cursor-pointer">
                <CameraIcon />
              </label>
            </div>
          </div>
          <a href="/shop" className="flex flex-col items-center text-white">
            <ShopIcon />
          </a>
          <a href="/profile" className="flex flex-col items-center text-white ">
            <ProfileIcon />
          </a>
        </div>
      </footer>

      <footer className="hidden md:flex justify-between items-center p-4 mt-4 bg-orange-500">
        <div className="text-right text-white"> درباره ما</div>
        <div className="flex items-center gap-2">
          <div className="text-right text-white">تماس با ما</div>
          <a href="#" className="bg-orange-200 rounded-full p-2 align-middle">
            <FaTelegramPlane className="w-5 h-5  text-blue-600" />
          </a>
          <a href="#" className="bg-orange-200 rounded-full p-2 align-middle">
            <FaWhatsapp className="w-6 h-6 text-green-600" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
