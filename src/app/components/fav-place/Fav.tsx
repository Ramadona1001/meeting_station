"use client";

import { countCharacters } from "@/format/formatText";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Fav({ fav, sar }: { fav: string; sar: string }) {
  const [exist, setExist] = useState([]);

  const handleDeleteFav = (e: any) => {
    setExist(exist.filter((item: any) => item.id !== e.id));

    localStorage.setItem("myFavPlace", JSON.stringify(exist));

    if (exist.length === 1) {
      localStorage.removeItem("myFavPlace");
    }

  };

  useEffect(() => {
    const storedItem = localStorage.getItem("myFavPlace");
    const existItem: any = storedItem ? JSON.parse(storedItem) : [];
    setExist(existItem);
  }, []);

  return (
    <section>
      <div className="container mt-5 mx-auto px-3 sm:px-0 lg:w-[80%] min-h-[80vh]">
        <h3 className="text-2xl font-inter font-bold capitalize text-teal-600 animate-pulse">
          {fav}
        </h3>

        {exist.length === 0 ? (
          <div className="py-10 flex justify-center">
            <Image src="/fav.png" alt="no-fav" width={500} height={500} />
          </div>
        ) : (
          <div className="grid grid-cols-1  sm:grid-cols-3 gap-5 mt-10">
            {exist.map((e: any, id: number) => (
              <div
                key={id}
                className="card border-2 border-gray-300 rounded-tr-3xl rounded-tl-3xl rounded-md"
              >
                <Link
                  href={{
                    pathname: `services/${e.cafeName}`,
                    query: {
                      ...e,
                    },
                  }}
                >
                  <Image
                    src={e.cafeImg}
                    alt="coffeeImg"
                    width={500}
                    height={500}
                  />
                </Link>
                <div className="px-3 mt-3 pb-5">
                  <div className="flex justify-between items-center py-3 px-5">
                    <h3 className="font-bold text-lg font-inter">
                      {e.cafeName}
                    </h3>
                    <div className="flex items-center gap-1">
                      <span className="font-inter text-sm text-[#656565]">
                        ({e.cafeRatePeople}) {e.cafeRate}
                      </span>
                      <span className="text-lg text-orange-600 ">
                        <FaStar />
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-inter text-gray-500">
                    {countCharacters(e.cafeDescription)}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm font-inter">
                      {e.salary} {sar}
                    </span>
                    <span
                      onClick={() => handleDeleteFav(e)}
                      className="text-xl text-red-600 cursor-pointer animate-pulse"
                    >
                      <MdDelete />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
