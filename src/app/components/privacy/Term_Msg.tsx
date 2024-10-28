"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function Term_Msg({ solution }: any) {
  const [term, setTerm] = useState([]);
  const locale = getCookie("NEXT_LOCALE");

  useEffect(() => {
    axios
      .get("https://api.meetingstation1.com/api/settings")
      .then((e) => setTerm(e.data?.data))
      .catch(() => setTerm([]));
  }, [term]);

  const filter = term.filter(
    (e: any) => e.key === `terms_description_${locale}`
  );

  return (
    <div className="min-h-[40vh]">
      <h3 className="text-xl font-bold font-inter text-center">{solution}</h3>
      {filter.map((e: any, id) => (
        <p
          key={id}
          className="py-3 text-[10px] xs:text-xs xs:leading-5 max-w-[760px] text-center font-inter leading-7 mx-auto text-gray-600"
        >
          {e.value}
        </p>
      ))}
    </div>
  );
}
