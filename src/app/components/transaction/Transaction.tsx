"use client";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";

export default function Transaction() {
  const [data, setData] = useState<{}[]>([]);
  const local = getCookie("NEXT_LOCALE");

  useEffect(() => {
    axios
      .get("https://api.meetingstation1.com/api/settings")
      .then((response: any) => setData(response.data?.data))
      .catch(() => setData([]));
  }, [data]);

  const filter = data.filter((e: any) => e.key === `history_head_${local}`);
  const filterDescription = data.filter(
    (e: any) => e.key === `history_description_${local}`
  );

  return (
    <section>
      <div className="bg-[url('/about.png')] bg-cover bg-center w-full h-60 bg-no-repeat relative flex items-center justify-center">
        <div className="overlay absolute top-0 left-0 w-full h-full bg-teal-600 opacity-20"></div>
        <div>
          {filter.map((e: any, id) => (
            <h3
              key={id}
              className="text-white text-3xl font-inter font-bold relative z-50"
            >
              {e.value}
            </h3>
          ))}
        </div>
      </div>
      <div className="container px-3 sm:px-0 mx-auto lg:w-[80%] mt-8 min-h-[50vh]">
        {filterDescription.map((e: any, id) => (
          <p
            key={id}
            className="max-w-[500px] w-full leading-5 font-inter text-xs mt-2"
          >
            {e.value}
          </p>
        ))}
      </div>
    </section>
  );
}
