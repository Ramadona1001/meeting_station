"use client";
import { servicesData } from "@/data/services";
import { countCharacters } from "@/format/formatText";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { fetchData } from "@/fetchData";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function AllServices({
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
  const allServicesData = servicesData;
  const allServices = [all, hotel, co, meeting, cafe];
  const [change, setChange] = useState(0);
  const [dir, setDir] = useState("ar");
  const local = getCookie('NEXT_LOCALE');

  useEffect(() => {
    document.dir === "ltr" ? setDir("en") : setDir("ar");
  }, []);

  const [categories, setCategories] = useState<any>([]);
  const [resturants, setResturants] = useState<any>([]);
  const [pages, setPages] = useState<any>([]);
  const [page, setPage] = useState<any>(1);

  // const [fetchSuccess, setFetchSuccess] = useState(false);

  // useEffect(() => {
  //   const fetchDataAndSetData = async () => {
  //     try {
  //       const response = await axios
  //         .get(
  //           `https://api.meetingstation1.com/api/restaurants?paginate=1&page=${pages}`
  //         )
  //         .then((response) => {
  //           // setResturants(response.data?.data);
  //           setResturants(response.data?.data.data);
  //           setFetchSuccess(true);
  //         });
  //     } catch (error) {
  //       // Handle error
  //       console.log(error);
  //       setFetchSuccess(false);
  //     }
  //   };

  //   fetchDataAndSetData();
  // }, [fetchSuccess]);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        const response = await fetchData("/categories");
        console.log(response);
        setCategories(response.data);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchDataAndSetData();
  }, []);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        let response;
        console.log(change);
        if (change == 0) {
          response = await fetchData(`/restaurants?paginate=1&page=${page}`);
        } else {
          response = await fetchData(
            `/restaurants?paginate=1&category_id=${change}&page=${page}`
          );
        }
        console.log(response.data.data);
        setpagesData(response.data.last_page);
        setResturants(response.data.data);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchDataAndSetData();
  }, [change, page]);

  const setpagesData = (num: number) => {
    const result = [];
    for (let i = 1; i <= num; i++) {
      result.push(i);
    }
    setPages(result);
  };

  return (
    <div>
      <div className="w-full h-60 bg-[url('/services.png')] bg-cover bg-center bg-no-repeat relative flex items-center justify-center">
        <div className="overlay absolute top-0 left-0 w-full h-full bg-teal-600 opacity-20"></div>
        <div>
          <h3 className="text-white text-3xl font-inter font-bold relative z-50">
            {services}
          </h3>
        </div>
      </div>
      <div className="container mt-8 mx-auto px-3 sm:px-0 lg:w-[80%]">
        <ul className="flex items-center flex-wrap gap-5 justify-center mt-8">
          <li
            onClick={() => setChange(0)}
            className={`px-2 py-1 rounded-md text-base sm:text-xl leading-10 text-[#9393] cursor-pointer duration-500 ${
              0 === change && "bg-teal-300 text-gray-600"
            }`}
          >
              {local == 'en'? 'All' : 'الكل' }
          </li>
          {categories.map((e: any) => (
            <li
              onClick={() => setChange(e.id)}
              key={e.id}
              className={`px-2 py-1 rounded-md text-base sm:text-xl leading-10 text-[#9393] cursor-pointer duration-500 ${
                e.id === change && "bg-teal-300 text-gray-600"
              }`}
            >
              {local == 'en'? e.name_en : e.name_ar }
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
          {resturants.map((restaurant: any) => (
            <div
              key={restaurant.id}
              className="border-2 border-gray-300 pb-4 rounded-3xl relative"
            >
              <Link
                href={{
                  pathname: `/${dir}/services/${restaurant.name}`,
                  query: {
                    id: restaurant.id,
                  },
                }}
              >
                <div className="relative">
                  <Image
                    loading="lazy"
                    src={restaurant.thumbnail}
                    alt="cafe-img"
                    className="object-cover"
                    width={400} // Aspect ratio will be preserved
                    height={400}
                    style={{ width:"100%",height:"400px" }}
                  />
                  <span className="absolute top-5 left-5 text-xl text-white cursor-pointer">
                    <CiBookmark />
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 px-5">
                  <h3 className="font-bold text-2xl font-inter">{restaurant.name}</h3>
                </div>

                <div className="px-5">
                  <p className="font-inter text-gray-400 text-xs leading-5">
                    {countCharacters(restaurant.description)}
                  </p>
                  <div className="font-inter flex items-center rtl:flex-row-reverse rtl:justify-end gap-1 mt-4">
                    <span className="text-teal-500 bold">{restaurant.hour_rate}</span>
                    <span className="text-gray-400 text-xs">SAR</span>
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

        <div className="mt-10">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <nav aria-label="Page navigation">
              <ul className="inline-flex items-center -space-x-px">
                {pages.length > 0 &&
                  pages.map((e: any, id: number) => (
                    <li key={id} className="cursor-pointer">
                      <div
                        onClick={() => {
                          setPage(e);
                        }}
                        className={`${
                          page == e
                            ? "z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                            : "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                      >
                        {e}
                      </div>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
