"use client";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
import Image from "next/image";
import Link from "next/link";


const Header = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const authState = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const tokenFromCookies = Cookies.get("token");
    setAccessToken(authState.access || tokenFromCookies || null);
  }, [authState.access]);

  const handleProfileClick = () => {
    if (accessToken) {
      router.push("/profile");
    }
  };

  const navigateToEditImage = () => {
    router.push("/editImage");
  };

  return (
    <header className="w-full flex justify-between bg-white items-center p-4 border-b">
      <div className="hidden md:flex items-center relative">
        <div className="dropdown dropdown-bottom">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 rounded-full"
            onClick={handleProfileClick}
          >
            پروفایل
          </div>
          {!accessToken && (
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link href="/login">ورود</Link>
              </li>
              <li>
                <Link href="/register">ثبت نام</Link>
              </li>
            </ul>
          )}
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
