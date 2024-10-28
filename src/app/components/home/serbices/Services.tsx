"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";

import { IoMdClose } from "react-icons/io";
import { servicesData } from "@/data/services";
import Link from "next/link";
import { toast } from "sonner";
import { countCharacters } from "@/format/formatText";
import { fetchData } from "@/fetchData";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function Services({
  services,
  all,
  hotel,
  co,
  meeting,
  cafe,
  bookNow,
  details,
  more,
}: {
  services: string;
  all: string;
  hotel: string;
  co: string;
  meeting: string;
  cafe: string;
  bookNow: string;
  details: string;
  more: string;
}) {
  const allServices = [all, hotel, co, meeting, cafe];
  const [change, setChange] = useState(0);
  const [dir, setDir] = useState("ar");
  const local = getCookie('NEXT_LOCALE');

  const allServicesData: any = [];

  for (let i = 0; i < 6; i++) {
    allServicesData.push(servicesData[i]);
  }

  // Add Item To Fav
  const [allFavPlace, setAllFavPlace]: any = useState([]);
  const [updateData, setUpdateData]: any = useState([]);
  const addData: any = [];

  const handleAddToFav = (itemData: any) => { };

  useEffect(() => {
    document.dir === "ltr" ? setDir("en") : setDir("ar");
  }, []);

  const [categories, setCategories] = useState<any>([]);
  const [data, setData] = useState<{}[]>([]);

  // useEffect(() => {
  //   axios
  //     .get("https://api.meetingstation1.com/api/restaurants")
  //     .then((response) => setData(response.data?.data.data))
  //     .catch(() => setData([]));
  // }, [data]);


  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        let response;
        if (change == 0) {
          response = await fetchData(`/restaurants`);
        } else {
          response = await fetchData(
            `/restaurants?category_id=${change}`
          );
        }
        setData(response.data.data);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchDataAndSetData();
  }, [change]);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        const response = await fetchData("/categories");
        setCategories(response.data);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchDataAndSetData();
  }, []);

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

  return (
    <section className="mt-8">
      <div className="container px-3 sm:px-0 mx-auto lg:w-[80%]">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-center text-black font-bold text-2xl">
            {services}
          </h3>
          <Image src="/vector.png" alt="vector" width={70} height={70} />
        </div>

        <ul className="flex items-center flex-wrap gap-5 justify-center mt-8">
          <li
            onClick={() => setChange(0)}
            className={`px-2 py-1 rounded-md text-base sm:text-xl leading-10 text-[#9393] cursor-pointer duration-500 ${0 === change && "bg-teal-300 text-gray-600"
              }`}
          >
            {local == 'en' ? 'All' : 'الكل'}
          </li>
          {categories.map((e: any) => (
            <li
              onClick={() => setChange(e.id)}
              key={e.id}
              className={`px-2 py-1 rounded-md text-base sm:text-xl leading-10 text-[#9393] cursor-pointer duration-500 ${e.id === change && "bg-teal-300 text-gray-600"
                }`}
            >
              {local == 'en' ? e.name_en : e.name_ar}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {data?.map((e: any) => (
            <div
              key={e.id}
              className="border-2 border-gray-300 pb-4 rounded-3xl relative"
            >
              <Link
                href={{
                  pathname: `/${dir}/services/${e?.id}`,
                  query: {
                    ...e,
                    vendor: e.vendor.id,
                  },
                }}
              >
                <div className="relative">
                  <Image
                    src={e?.thumbnail}
                    alt="cafe-img"
                    width={400} // Aspect ratio will be preserved
                    height={400}
                    style={{ width:"100%",height:"400px" }}
                  />
                  <span
                    onClick={() => handleAddToFav(e)}
                    className="absolute top-5 left-5 text-xl text-white cursor-pointer"
                  >
                    <CiBookmark />
                  </span>
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
                <div className="flex gap-2 items-center px-5 mt-5">
                  <button className="w-1/2 text-center py-2 text-sm text-white border-2 border-teal-600 bg-teal-600 rounded-2xl cursor-pointer">
                    {bookNow}
                  </button>
                  <button className="w-1/2 text-center py-2 text-sm text-black border-2 border-teal-600 rounded-2xl cursor-pointer">
                    {details}
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {data?.length > 6 && (
          <div className="flex w-full justify-center mt-6">
            <button className="px-5 py-1 rounded-md border-2 border-teal-500 duration-500 hover:bg-teal-500 hover:text-white text-sm font-inter">
              <Link href={`/${dir}/services`}>{more}</Link>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
