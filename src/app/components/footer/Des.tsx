"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";

export default function Des({ address, contact }: any) {
  const [data, setData] = useState<{}[]>([]);
  const local = getCookie("NEXT_LOCALE");

  useEffect(() => {
    axios
      .get("https://api.meetingstation1.com/api/settings")
      .then((response) => setData(response.data?.data))
      .catch(() => setData([]));
  }, [data]);

  const filterAddress = data.filter(
    (e: any) => e.key === `contact_us_address_${local}`
  );
  const filterPhone1 = data.filter((e: any) => e.key === `contact_us_phone_1`);
  const filterPhone2 = data.filter((e: any) => e.key === `contact_us_phone_2`);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-teal-600 font-inter font-semibold">
          <span className="text-2xl">
            <FaPhone />
          </span>
          <span className="text-xl">{contact}</span>
        </div>
        <div className="flex items-center gap-2 mt-5 rtl:flex-row-reverse rtl:justify-end">
          <span>+966</span>
          {filterPhone1.map((e: any, id) => (
            <span key={id} className="text-gray-500">
              {e.value}
            </span>
          ))}{" "}
        </div>
        <div className="flex items-center gap-2 mt-2 rtl:flex-row-reverse rtl:justify-end">
          <span>+966</span>
          {filterPhone2.map((e: any, id) => (
            <span key={id} className="text-gray-500">
              {e.value}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-teal-500 font-inter font-semibold">
          <span className="text-2xl">
            <CiLocationOn />
          </span>
          <span className="text-xl">{address}</span>
        </div>
        {filterAddress.map((e: any, id) => (
          <p key={id} className="text-center text-sm font-light leading-6 mt-5">
            {e.value}
          </p>
        ))}
      </div>
    </>
  );
}
