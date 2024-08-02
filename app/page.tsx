"use client";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { fetchUser } from "@/redux/features/user/userSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchPerson = async () => {
      const response = await dispatch(fetchUser());
      if (response.payload) {
        const { first_name, last_name, phone_number, date_of_birth } =
          response.payload;
        if (!first_name || !last_name || !phone_number || !date_of_birth) {
          toast(
            "اطلاعات پروفایل شما کامل نیست، لطفا به پروفایل رفته و اطلاعات خود را تکمیل کنید."
          );
        }
      }
    };
    fetchPerson();
  }, [dispatch]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <div className="z-10 w-full max-w-5xl items-center justify-between p-4 text-sm ">
        <div className="flex flex-col lg:flex-row justify-between items-center p-4 gap-4 mt-20">
          <div className="w-full md:w-1/2 flex flex-col items-center space-y-8 rounded">
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage
                  src="/assets/images/car-gray.jpg"
                  alt="Image one"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src="/assets/images/car-red.jpg"
                  alt="Image two"
                />
              }
            />

            <div className="flex flex-wrap justify-center items-center gap-2">
              <button className="w-20 h-20 rounded-lg relative">
                <Image
                  src="/assets/images/car-blue.jpg"
                  alt="car-image"
                  layout="fill"
                  objectFit="cover"
                  style={{ borderRadius: "8px" }}
                />
              </button>
              <button className="w-20 h-20 rounded-lg relative">
                <Image
                  src="/assets/images/car-red.jpg"
                  alt="car-image"
                  layout="fill"
                  objectFit="cover"
                  style={{ borderRadius: "8px" }}
                />
              </button>
              <button className="w-20 h-20 rounded-lg relative">
                <Image
                  src="/assets/images/car-green.jpg"
                  alt="car-image"
                  layout="fill"
                  objectFit="cover"
                  style={{ borderRadius: "8px" }}
                />
              </button>
              <FaArrowRight className="text-gray-500 text-2xl animate-[propel_4s_infinite]" />
              <button className="w-20 h-20 rounded-lg relative">
                <Image
                  src="/assets/images/car-gray.jpg"
                  alt="car-image"
                  layout="fill"
                  objectFit="cover"
                  style={{ borderRadius: "8px" }}
                />
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center space-y-8">
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage
                  src="/assets/images/car-gray.jpg"
                  alt="Image one"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src="/assets/images/car-gray.jpg"
                  alt="Image two"
                />
              }
            />
            <div className="flex flex-wrap justify-center items-center gap-2">
              <button className="w-20 h-20 bg-gray-400 rounded-lg"></button>
              <FaArrowRight className="text-gray-500 text-2xl animate-[propel_4s_infinite]" />
              <button className="w-20 h-20 bg-gray-400 rounded-lg"></button>
            </div>
          </div>
        </div>

        <main>
          <section>
            <div className="flex justify-between items-center">
              <h2 className="text-right font-bold text-2xl mb-5 mt-10">خبر</h2>
              <Link href="/news">
                <p className="text-orange-500">بیشتر</p>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-start items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <h3 className="font-bold text-xl p-3">خبر یک</h3>
                </div>
                <p className="px-2">
                  کتاب‌ها منابع بزرگی از دانش هستند. با خواندن کتاب‌های مختلف
                  می‌توان به اطلاعات جدیدی دست یافت. درختان زیبایی زیادی دارند و
                  هر کدام ویژگی‌های خاص خود را دارند. آسمان در شب پر از
                  ستاره‌هاست که هر کدام داستانی برای گفتن دارند. دریا بسیار بزرگ
                  و آرامش‌بخش است. ماشین‌ها وسایلی هستند که زندگی ما را راحت‌تر
                  کرده‌اند.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-start items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <h3 className="font-bold text-xl p-3">خبر دو</h3>
                </div>
                <p className="px-2">
                  کتاب‌ها منابع بزرگی از دانش هستند. با خواندن کتاب‌های مختلف
                  می‌توان به اطلاعات جدیدی دست یافت. درختان زیبایی زیادی دارند و
                  هر کدام ویژگی‌های خاص خود را دارند. آسمان در شب پر از
                  ستاره‌هاست که هر کدام داستانی برای گفتن دارند. دریا بسیار بزرگ
                  و آرامش‌بخش است. ماشین‌ها وسایلی هستند که زندگی ما را راحت‌تر
                  کرده‌اند.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-start items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <h3 className="font-bold text-xl p-3">خبر سه</h3>
                </div>
                <p className="px-2">
                  کتاب‌ها منابع بزرگی از دانش هستند. با خواندن کتاب‌های مختلف
                  می‌توان به اطلاعات جدیدی دست یافت. درختان زیبایی زیادی دارند و
                  هر کدام ویژگی‌های خاص خود را دارند. آسمان در شب پر از
                  ستاره‌هاست که هر کدام داستانی برای گفتن دارند. دریا بسیار بزرگ
                  و آرامش‌بخش است. ماشین‌ها وسایلی هستند که زندگی ما را راحت‌تر
                  کرده‌اند.
                </p>
              </div>
            </div>
          </section>
          <section className="col-span-1 mb-20">
            <div className="flex justify-between items-center">
              <h2 className="text-right font-bold text-2xl mb-5 mt-10">
                فروشگاه
              </h2>
              <Link href="/shopping">
                <p className="text-orange-500">بیشتر</p>
              </Link>
            </div>{" "}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="rounded-lg shadow-lg">
                <header className="bg-green-500 rounded-t-lg h-20 p-4">
                  <p>به زودی</p>
                </header>
                <div className="bg-white p-4">
                  موسیقی هنر زیبایی است که روح را تازه می‌کند. نقاشی‌ها بازتاب
                  احساسات هنرمندان هستند. بازی‌ها وسیله‌ای برای سرگرمی و تفریح
                  هستند.{" "}
                </div>
              </div>
              <div className="rounded-lg shadow-lg">
                <header className="bg-green-500 rounded-t-lg h-20 p-4">
                  <p>به زودی</p>
                </header>
                <div className="bg-white p-4">
                  موسیقی هنر زیبایی است که روح را تازه می‌کند. نقاشی‌ها بازتاب
                  احساسات هنرمندان هستند. بازی‌ها وسیله‌ای برای سرگرمی و تفریح
                  هستند.{" "}
                </div>
              </div>
              <div className="rounded-lg shadow-lg">
                <header className="bg-green-500 rounded-t-lg h-20 p-4">
                  <p>به زودی</p>
                </header>
                <div className="bg-white p-4">
                  موسیقی هنر زیبایی است که روح را تازه می‌کند. نقاشی‌ها بازتاب
                  احساسات هنرمندان هستند. بازی‌ها وسیله‌ای برای سرگرمی و تفریح
                  هستند.{" "}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </main>
  );
}
