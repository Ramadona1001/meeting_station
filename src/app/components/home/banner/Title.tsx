"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Title({
  favPlace,
  contact,
}: {
  favPlace: string;
  contact: string;
}) {
  const local = getCookie("NEXT_LOCALE");

  const [data, setData] = useState<{}[]>([]);

  useEffect(() => {
    axios
      .get("https://api.meetingstation1.com/api/settings")
      .then((response) => setData(response.data?.data))
      .catch(() => setData([]));
  }, [data]);

  const filteredData = data.filter((e: any) => e.key === `home_head_${local}`);
  const filteredDataDes = data.filter(
    (e: any) => e.key === `home_head_desc_${local}`
  );
  const filterImg: any = data.filter((e: any) => e.key === "home_head_image");

  const img = filterImg[0]?.value;

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
      }}
      className={`relative w-[98%] h-[436px] bg-cover bg-center mx-auto flex items-center`}
    >
      <div className="overlay absolute top-0 left-0 w-full h-full bg-[#0D6E63FA] opacity-80"></div>
      <div className="relative z-[100] w-[600px] mx-auto text-white">
        {filteredData.map((e: any, id) => (
          <h3 key={id} className="text-center text-[40px]">
            {e.value}
          </h3>
        ))}
        {filteredDataDes.map((e: any, id) => (
          <p key={id} className="text-sm sm:text-base text-center leading-8 font-semibold font-inter">
            {e.value}
          </p>
        ))}
        <button className="px-5 py-2 border-2 border-white rounded-lg flex items-center gap-2 mx-auto mt-6 duration-500 hover:scale-105">
          <span className="text-3xl rounded-full w-5 h-5 flex items-center justify-center bg-green-500 text-white">
            <FaWhatsapp />
          </span>
          <span className="text-base text-white font-inter">{contact}</span>
        </button>
      </div>
      <button className="text-3xl w-10 h-10 rounded-full flex items-center justify-center bg-green-600 text-white absolute bottom-5 left-3 animate-pulse">
        <FaWhatsapp />
      </button>
    </div>
  );
}
