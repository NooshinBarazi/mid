'use client'
import Image from "next/image";

const Header = () => {

  const navigateToEditImage = () => {
    // router.push("/edit-image");
    // setIsMenuOpen(false);
  };

  return (
    <header className="w-full flex justify-between bg-white items-center p-4 border-b">
      <div className="hidden md:flex items-center relative">
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1 rounded-full">
              پروفایل
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a href="/login">ورود</a>
              </li>
              <li>
                <a href="/register">ثبت نام</a>
              </li>
            </ul>
          </div>
 
      </div>
      <div className="hidden md:flex">
        <label
          htmlFor="upload-input"
          className="cursor-pointer"
          onClick={navigateToEditImage}
        >
          <Image
            src={`/assets/images/newcamera.png`}
            alt="Upload Button"
            width={74}
            height={74}
            className="rounded-lg"
          />
        </label>
      </div>
      <div className="text-xl font-bold">
        <a href="/">
          <Image
            src={`/assets/images/logomid.jpg`}
            alt="Logo"
            width={64}
            height={64}
            className="rounded-lg"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
