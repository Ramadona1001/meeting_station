"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarDays } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { GetCurrentUser } from "@/user/getUser";
import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import axios from "axios";
import { getCookie } from "cookies-next";
import { formatDay } from "@/format/formatDay";

interface Props {
  addServices: String;
  win: String;
  noServices: String;
  sar: String;
  edit: String;
  am: String;
  pm: String;
}
export default function MyServices({
  addServices,
  win,
  noServices,
  sar,
  edit,
  am,
  pm,
}: Props) {
  const vendorId: string = GetCurrentUser()?.id;
  const [data, setData] = useState<{}[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState();
  const [close, setClose] = useState();
  const locale = getCookie("NEXT_LOCALE");

  function removeSeconds(time: any) {
    let parts = time.split(":");
    if (parts.length >= 2) {
      let hours = parseInt(parts[0]);
      let minutes = parts[1];

      let period = hours >= 12 ? pm : am;

      hours = hours % 12;
      hours = hours ? hours : 12;

      return hours + ":" + minutes + " " + period;
    }
    return time;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.meetingstation1.com/api/restaurants/vendor/${vendorId}`
        );
        setData(response.data?.data || []);
        setLoading(false);
      } catch (msgError: any) {
        setError(msgError);
        setLoading(false);
      }
    };

    if (vendorId) {
      fetchData();
    }
  }, [vendorId]);

  return (
    <section>
      <div className="container mx-auto px-3 sm:px-0 lg:w-[80%]">
        {data.length === 0 ? (
          <div className="w-full sm:w-1/2 mx-auto mt-16 min-h-[80vh]">
            <h3 className="text-center font-inter font-bold text-teal-600 text-5xl">
              {win}
            </h3>
            <p className="mt-5 text-center text-xs xs:text-sm font-inter tracking-wide">
              {noServices}
            </p>
            <Image
              src="/undraw_add_files_re_v09g 1.png"
              alt="img"
              width={200}
              height={200}
              className="mx-auto mt-10"
              loading="lazy"
            />
            <div className="flex justify-center mt-10">
              <Link href="add-service">
                <button className="mx-auto bg-teal-600 px-16 py-1 text-white rounded-md duration-500 hover:bg-teal-900">
                  {addServices}
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 min-h-[80vh]">
            <Link href="add-service">
              <button className="mx-auto bg-teal-600 px-5 py-1 text-white rounded-md duration-500 hover:bg-teal-900">
                {addServices}
              </button>
            </Link>
            <div className="mt-10">
              {data.map((e: any, id) => (
                <div
                  key={id}
                  className="bg-gray-300 px-8 py-2 rounded-xl flex flex-col-reverse md:flex-row gap-y-5 gap-x-20 justify-between mt-5"
                >
                  <div>
                    <h3 className="font-inter font-semibold text-lg">
                      {e.name}
                    </h3>
                    <p className="py-3 max-w-[600px] w-full text-sm font-inter font-light">
                      {e.description}
                    </p>
                    <div className="flex flex-wrap gap-x-3 sm:gap-x-8 items-center">
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-lg text-gray-500">
                          <MdPeopleAlt />
                        </span>
                        <span className="text-xs">{e.people_count}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-lg text-gray-500">
                          <FaCalendarDays />
                        </span>
                        <div>
                          {locale === "ar" ? (
                            <>
                              <span className="text-xs">
                                {formatDay(e.open_day).name_ar} -{" "}
                                {formatDay(e.close_day).name_ar}
                              </span>
                            </>
                          ) : (
                            <span className="text-xs">
                              {formatDay(e.open_day).name_en} -{" "}
                              {formatDay(e.close_day).name_en}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-lg text-gray-500">
                          <FaRegClock />
                        </span>
                        <span className="text-xs">
                          {removeSeconds(e.open_time)} :{" "}
                          {removeSeconds(e.close_time)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-3 text-gray-600">
                      <span className="text-lg">
                        <FiMapPin />
                      </span>
                      <span className="text-sm max-w-[600px] w-full">
                        {e.address}
                      </span>
                    </div>

                    <div className="flex items-center justify-between max-w-[600px] w-full mt-4">
                      <Link
                        href={{
                          pathname: "edit-service",
                          query: {
                            ...e,
                            vendorId,
                            category: e.category.id,
                          },
                        }}
                      >
                        {edit}
                      </Link>
                      <span className="text-teal-600 font-bold text-xl">
                        {e.hour_rate} {sar}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {e?.images.slice(0, 4).map((image: any, id: number) => (
                      <div
                        key={id}
                        className="xax-w-[500px] w-full md:w-32 relative"
                      >
                        <Image
                          src={image.image}
                          alt="img"
                          fill
                          className="m-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
