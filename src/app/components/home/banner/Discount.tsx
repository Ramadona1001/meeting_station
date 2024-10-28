"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Discount({
  discount,
  discountDay,
  book,
  bookMSg,
  contact,
}: {
  discount: string;
  discountDay: string;
  book: string;
  bookMSg: string;
  contact: string;
}) {
  const [dir, setDir] = useState("ar");

  const [data, setData] = useState<{}[]>([]);
  const local = getCookie("NEXT_LOCALE");

  useEffect(() => {
    document.dir === "ltr" ? setDir("en") : setDir("ar");
  }, []);

  useEffect(() => {
    axios
      .get("https://api.meetingstation1.com/api/settings")
      .then((response) => setData(response.data?.data));
  }, [data]);

  const filterDis = data.filter(
    (e: any) => e.key === `home_head_${local}`
  );
  const filterDisc = data.filter(
    (e: any) => e.key === `home_head_discount_${local}`
  );

  return (
    <>
      <div className="bg-active px-3 xs:px-5 sm:px-8 py-3 rounded-xl flex justify-between items-center mt-10 font-inter flex-wrap">
        <div>
          {dir === "ar" ? (
            <div className="flex items-center gap-1 sm:gap-2">
              {filterDis.map((e: any, id) => (
                <span
                  key={id}
                  className="text-base xs:text-lg sm:text-2xl text-teal-500 leading-10"
                >
                  {e.value}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-base xs:text-xl sm:text-3xl text-teal-500 font-bold animate-pulse">
                30%
              </span>
              <span className="text-base xs:text-lg sm:text-2xl text-teal-500 leading-10">
                {discount}
              </span>
              <span className="text-base xs:text-lg sm:text-2xl text-teal-500 leading-10">
                {discountDay}
              </span>
            </div>
          )}
        </div>
        <div className="text-lg xs:text-3xl cursor-pointer">
          {dir === "ar" ? (
            <span>
              <IoIosArrowBack />
            </span>
          ) : (
            <span>
              <IoIosArrowForward />
            </span>
          )}
        </div>
      </div>
      <div className="book mt-6 flex flex-col-reverse sm:flex-row gap-5">
        <div className="w-full w-100">
          <h3 className="text-[#1F6D65] text-2xl font-bold">{book}</h3>
          {filterDisc.map((e: any, id) => (
            <p
              key={id}
              className="font-semibold py-3 text-[#222] leading-8 max-w-[430px]"
            >
              {e.value}
            </p>
          ))}
          <button className="bg-teal-600 px-4 py-2 rounded-xl flex items-center gap-2 mt-4 duration-500 hover:scale-105">
            <span className="w-6 h-6 flex items-center justify-center bg-white text-green-500 rounded-full">
              <FaWhatsapp />
            </span>
            <span className="text-base text-white leading-6">{contact}</span>
          </button>
        </div>
        <div className="w-100">
          <Image src="/map.png" alt="map" width={600} height={400} />
        </div>
      </div>
    </>
  );
}
