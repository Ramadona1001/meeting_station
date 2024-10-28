"use client";

import { GetCurrentUser } from "@/user/getUser";
import axios from "axios";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { toast } from "sonner";
interface Props {
  newBook: string;
  pre: string;
  rej: string;
  today: string;
  approval: string;
  refusal: string;
  am: string;
  pm: string;
  not: string;
}

export default function Reservations({
  newBook,
  pre,
  rej,
  today,
  approval,
  refusal,
  am,
  pm,
  not,
}: Props) {
  const user = GetCurrentUser();
  const [select, setSelect] = useState<number>(1);

  const [isVender, setIsVender] = useState<boolean>(true);
  const [venderId, setVenderId] = useState<string>("");
  const [newBooking, setNewBooking] = useState<{}[]>([]);

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
  const handleAccept = (id: any) => {
    const data = {
      booking_id: id,
    };

    axios
      .post("https://api.meetingstation1.com/api/booking/accept", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then(() => {
        toast.success("restaurant accepted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRejected = (id: any) => {
    const data = {
      booking_id: id,
    };

    axios
      .post("https://api.meetingstation1.com/api/booking/decline", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then(() => {
        toast.success("restaurant rejected successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setVenderId(user?.id);

    if (user?.isVender === false) {
      redirect("/");
    }
    let select_2;
    if(select == 1){ 
      select_2 = 2;
    }

    axios
      .get(
        `https://api.meetingstation1.com/api/booking?${venderId}&status=${select}&status_2=${select_2}`
      )
      .then((response) => setNewBooking(response.data?.data))
      .catch(() => setNewBooking([]));
  }, [user, select]);
  return (
    <section>
      <div className="container px-3 sm:px-0 mx-auto mt-10 lg:w-[80%] min-h-[80vh]">
        <div className="flex flex-col flex-wrap xs:flex-row gap-5 justify-center">
          <button
            onClick={() => setSelect(1)}
            className={`border-2 border-teal-300 px-4 py-1 duration-500 rounded-md ${
              select === 1 && "bg-teal-400 text-white"
            }`}
          >
            {newBook}
          </button>
          <button
            onClick={() => setSelect(3)}
            className={`border-2 border-teal-300 px-4 py-1 duration-500 rounded-md ${
              select === 3 && "bg-teal-400 text-white"
            }`}
          >
            {pre}
          </button>
          <button
            onClick={() => setSelect(2)}
            className={`border-2 border-teal-300 px-4 py-1 duration-500 rounded-md ${
              select === 2 && "bg-teal-400 text-white"
            }`}
          >
            {rej}
          </button>
        </div>

        <div className="mt-10 w-full sm:w-3/4 mx-auto">
          {select === 1 && (
            <div className="mt-3">
              <p className="date pb-2">{today}</p>

              {newBooking.length === 0 ? (
                <h3 className="mt-20 text-red-600 text-center text-xl">
                  {not}
                </h3>
              ) : (
                <>
                  {newBooking.map((e: any, id) => (
                    <div
                      key={id}
                      className="bg-gray-300 p-4 rounded-lg mt-4 w-full"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src="/user.png"
                          alt="user"
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <span className="text-sm font-inter">
                          {e.user.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="mt-2 px-2 text-xl font-inter font-bold">
                          {e.restaurant.name}
                        </h3>
                        <p className="text-xs font-inter">{e.description}</p>
                      </div>
                      <div className="mt-2 max-w-[420px] w-full font-inter font-light leading-5 px-3">
                        <p>{e.restaurant.description}</p>
                      </div>
                      
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-5 mt-10 px-3">
                      {e.status === 1 && 
                      <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(e.id)}
                        className="bg-green-500 px-5 py-1 text-white duration-500 hover:bg-green-700 rounded-lg"
                      >
                        {approval}
                      </button>
                      <button
                        onClick={() => handleRejected(e.id)}
                        className="text-red-500 px-5 py-1 duration-500 rounded-lg"
                      >
                        {refusal}
                        </button>
                      </div>
                      }
                        

                        <div className="flex flex-wrap items-center gap-5">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              <FaRegCalendarAlt />
                            </span>
                            <span className="text-xs">{e.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              <IoPeople />
                            </span>
                            <span className="text-xs">{e.people_count}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              <FaRegClock />
                            </span>
                            <span className="text-xs">
                              {removeSeconds(e.start_time)} -{" "}
                              {removeSeconds(e.end_time)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {select === 3 && (
            <div className="mt-3">
              <p className="date pb-2">{today}</p>

              {newBooking.length === 0 ? (
                <h3 className="mt-20 text-red-600 text-center text-xl">
                  {not}
                </h3>
              ) : (
                <>
                  {newBooking.map((e: any, id) => (
                    <div
                      key={id}
                      className="bg-gray-300 p-4 rounded-lg mt-4 w-full"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src="/user.png"
                          alt="user"
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <span className="text-sm font-inter">
                          مش لازم الاسم يظهر
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="mt-2 px-2 text-xl font-inter font-bold">
                          {e.restaurant.name}
                        </h3>
                        <p className="text-xs font-inter">{e.description}</p>
                      </div>
                      <div className="mt-2 max-w-[420px] w-full font-inter font-light leading-5 px-3">
                        <p>{e.restaurant.description}</p>
                      </div>

                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-5 mt-10 px-3">
                        <div className="flex flex-wrap items-center gap-5">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              <FaRegCalendarAlt />
                            </span>
                            <span className="text-xs">{e.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              <IoPeople />
                            </span>
                            <span className="text-xs">{e.people_count}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              <FaRegClock />
                            </span>
                            <span className="text-xs">
                              {removeSeconds(e.start_time)} -{" "}
                              {removeSeconds(e.end_time)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {select === 2 && (
            <div className="mt-3">
              <p className="date pb-2">{today}</p>

              {newBooking.length === 0 ? (
                <h3 className="mt-20 text-red-600 text-center text-xl">
                  {not}
                </h3>
              ) : (
                <>
                  {newBooking.map((e: any, id) => (
                    <div
                      key={id}
                      className="bg-gray-300 p-4 rounded-lg mt-4 w-full"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src="/user.png"
                          alt="user"
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <span className="text-sm font-inter">
                          مش لازم الاسم يظهر
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="mt-2 px-2 text-xl font-inter font-bold">
                          {e.restaurant.name}
                        </h3>
                        <p className="text-xs font-inter">{e.description}</p>
                      </div>
                      <div className="mt-2 max-w-[420px] w-full font-inter font-light leading-5 px-3">
                        <p>{e.restaurant.description}</p>
                      </div>

                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-5 mt-10 px-3">
                        <div className="flex flex-wrap items-center gap-5">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              <FaRegCalendarAlt />
                            </span>
                            <span className="text-xs">{e.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              <IoPeople />
                            </span>
                            <span className="text-xs">{e.people_count}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              <FaRegClock />
                            </span>
                            <span className="text-xs">
                              {removeSeconds(e.start_time)} -{" "}
                              {removeSeconds(e.end_time)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
