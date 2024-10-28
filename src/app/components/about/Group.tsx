"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Group() {
  const [groupData, setGroupData] = useState<{}[]>([]);
  const locale = getCookie("NEXT_LOCALE");

  useEffect(() => {
    axios
      .get("https://api.meetingstation1.com/api/sections")
      .then((response) => setGroupData(response.data?.data))
      .catch(() => setGroupData([]));
  }, [groupData]);

  return (
    <div className="mt-14 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-10 pb-8">
      {groupData.map((e: any, id) => (
        <div key={id} style={{ background: '#f8f8f8', padding: '10px', borderRadius: '10px', border: '1px solid' }}>
          <Image
            src={e?.image}
            alt="img"
            width={50}
            height={50}
            className="m-auto rounded-md"
          />
          {locale === "ar" ? (
            <h3 className="text-xl font-semibold font-inter leading-10 text-black px-3 py-2 text-center">
              {`${e.name_ar}`}
            </h3>
          ) : (
            <h3 className="text-xl font-semibold font-inter leading-10 text-black px-3 py-2 text-center">
              {`${e.name_en}`}
            </h3>
          )}

          {locale === "ar" ? (
            <p className="font-inter py-3 text-[#666666] text-xs text-center leading-6 font-light" style={{ fontSize:'20px',lineHeight:'30px',fontWeight:'bold' }}>
              {e.description_ar}
            </p>
          ) : (
            <p className="font-inter py-3 text-[#666666] text-xs text-center leading-6 font-light" style={{ fontSize:'20px',lineHeight:'30px',fontWeight:'bold' }}>
              {e.description_en}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
