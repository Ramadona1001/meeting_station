"use client";
import Image from "next/image";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { fetchData } from "@/fetchData";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaStar } from "react-icons/fa6";
import axios from "axios";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { countCharacters } from "@/format/formatText";

export default function BestBook({ best, sar }: { best: string; sar: string }) {
  const [bestData, setBestBook] = useState<any>([]);

  const dir = getCookie("NEXT_LOCALE");

  function calculateAverageRating(rates: any) {
    if (!Array.isArray(rates) || rates.length === 0) {
      return 0;
    }
    let sum = rates.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.rate;
    }, 0);
    let average = sum / rates.length;
    return average;
  }

  useEffect(() => {
    axios
      .get("https://api.meetingstation1.com/api/restaurants")
      .then((e) => setBestBook(e.data?.data.data))
      .catch(() => setBestBook([]));
  }, [bestData]);

  return (
    <section className="mt-8">
      <div className="container px-3 sm:px-0 mx-auto lg:w-[80%]">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-3xl font-inter font-bold text-black text-center">
            {best}
          </h3>
          <Image src="/vector.png" alt="vector" width={70} height={70} />
        </div>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          autoplay={{ delay: 5000 }}
          loop
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mt-8 swiper-screen"
        >
          {bestData?.length > 0 &&
            bestData.map((e: any) => (
              <SwiperSlide key={e.id}>
                <Link
                  href={{
                    pathname: `/${dir}/services/${e?.id}`,
                    query: {
                      ...e,
                    },
                  }}
                >
                  <div className="relative">
                    <Image
                      src={e?.thumbnail}
                      alt="cafe-img"
                      width={800}
                      height={400}
                      style={{ width:"100%",height:"400px" }}
                    />
                  </div>
                  <div className="flex justify-between items-center py-3 px-5">
                    <h3 className="font-bold text-2xl font-inter">{e.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="font-inter text-sm text-[#656565]">
                        ({e.rates?.length}) {calculateAverageRating(e.rates)}
                      </span>
                      <span className="text-lg text-orange-600 ">
                        <FaStar />
                      </span>
                    </div>
                  </div>

                  <div className="px-5">
                    <p className="font-inter text-gray-400 text-xs leading-5">
                      {countCharacters(e.description)}
                    </p>
                    <div className="font-inter flex items-center rtl:flex-row-reverse rtl:justify-end gap-1 mt-4">
                      <span className="text-teal-500 bold">{e.hour_rate}</span>
                      <span className="text-gray-400 text-xs">RAR</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 5000 }}
          loop
          className="mt-8 swiper-mobile"
        >
          {bestData > 0 &&
            bestData.map((e: any) => (
              <SwiperSlide key={e.id}>
                <Image
                  src={`${e.thumbnail}`}
                  alt="img"
                  width={500}
                  height={500}
                  style={{ width:"100%",height:"400px" }}
                />
                <div className="flex items-center justify-between px-3 mt-3">
                  <span className="text-2xl font-sans font-bold">{e.name}</span>
                  <span className="text-sm text-teal-600">
                    {e.price} {sar}
                  </span>
                </div>
                <div className="rate flex items-center gap-2 mt-5 px-3 flex-row-reverse justify-end">
                  <span className="text-sm text-gray-400">{e.rate}</span>
                  <span className="text-lg text-orange-500">
                    <FaStar />
                  </span>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}
