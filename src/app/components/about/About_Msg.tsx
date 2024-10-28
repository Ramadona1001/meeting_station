"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function About_Msg() {
  const locale = getCookie("NEXT_LOCALE");

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.meetingstation1.com/api/settings")
      .then((e) => setData(e.data?.data))
      .catch(() => setData([]));
  }, [data]);

  const filter = data.filter(
    (e: any) => e.key === `about_us_description_${locale}`
  );

  return (
    <div className="py-4 text-sm max-w-[700px] w-full leading-6 text-gray-600 opacity-70 font-inter">
      {filter.map((e: any, id) => (
        <p key={id}>{e.value}</p>
      ))}
    </div>
  );
}
