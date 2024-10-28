"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPhoneFlip, FaLocationDot } from "react-icons/fa6";

export default function ContactUs({
  contact,
  contactNum,
  address,
  send,
  email,
}: {
  contact: string;
  contactNum: string;
  address: string;
  send: string;
  email: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleContactUs = (email: any) => {
    console.log(email);
  };

  const [data, setData] = useState<{}[]>([]);
  const local = getCookie("NEXT_LOCALE");

  useEffect(() => {
    axios
      .get("https://api.meetingstation1.com/api/settings")
      .then((e) => setData(e.data?.data))
      .catch(() => setData([]));
  }, [data]);

  const filterAddress = data.filter(
    (e: any) => e.key === `contact_us_address_${local}`
  );
  const filterPhone1 = data.filter((e: any) => e.key === `contact_us_phone_1`);
  const filterPhone2 = data.filter((e: any) => e.key === `contact_us_phone_2`);

  return (
    <section className="mt-10">
      <div className="container px-3 sm:px-0 mx-auto lg:w-[80%]">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-3xl font-inter font-bold text-black text-center">
            {contact}
          </h3>
          <Image src="/vector.png" alt="vector" width={70} height={70} />
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 mt-20">
          <div className="max-w-[500px] w-full">
            <div className="flex flex-col sm:flex-row items-center gap-20 sm:items-start">
              <div>
                <div className="flex items-center gap-2 justify-center text-teal-600 flex-row-reverse">
                  <h3 className="font-inter text-xl ">{contactNum}</h3>
                  <span>
                    <FaPhoneFlip />
                  </span>
                </div>
                <div className="mt-7 flex flex-col gap-3">
                  <div className="text-sm font-semibold font-inter flex items-center gap-2 rtl:flex-row-reverse">
                    <span className="ltr:hidden">966+</span>
                    <span className="rtl:hidden">+966</span>{" "}
                    {filterPhone1.map((e: any, id) => (
                      <span key={id}>{e.value}</span>
                    ))}
                  </div>
                  <div className="text-sm font-semibold font-inter flex items-center gap-2 rtl:flex-row-reverse">
                    <span className="ltr:hidden">966+</span>
                    <span className="rtl:hidden">+966</span>
                    {filterPhone2.map((e: any, id) => (
                      <span key={id}>{e.value}</span>
                    ))}{" "}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 text-teal-600 flex-row-reverse">
                  <h3 className="font-inter text-xl ">{address}</h3>
                  <span>
                    <FaLocationDot />
                  </span>
                </div>
                {filterAddress.map((e: any, id) => (
                  <p
                    key={id}
                    className="text-sm max-w-60 text-center mt-5 text-gray-400 leading-5 font-inter"
                  >
                    {e.value}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-14">
              <form
                onSubmit={handleSubmit(handleContactUs)}
                className="flex flex-col-reverse gap-y-5 xs:flex-row items-center gap-2"
              >
                <button className="px-10 py-2 rounded-lg bg-teal-600 text-white">
                  {send}
                </button>
                <input
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.com)+$/,
                      message: "Enter Valid Email",
                    },
                  })}
                  className={`outline-none px-3 py-2 border-2 border-gray-300 rounded-lg ${
                    errors.email && "border-red-600"
                  }`}
                  placeholder={email}
                  type="text"
                />
              </form>
            </div>
          </div>
          <div>
            <Image src="/contact.png" alt="contact" width={350} height={350} />
          </div>
        </div>
      </div>
    </section>
  );
}
