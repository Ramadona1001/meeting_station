"use client";

import { useForm } from "react-hook-form";
import { FaPhone } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

interface Props {
  contact: string;
  name: string;
  email: string;
  phone: string;
  msg: string;
  send: string;
  team: string;
}
export default function Contact({
  contact,
  name,
  email,
  phone,
  msg,
  send,
  team,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleContactUs = (data: any) => {
    const { name, email, phone, message } = data;
  };

  return (
    <section>
      <div className="container px-3 sm:px-0 mx-auto mt-8 lg:w-[80%]">
        <h3 className="text-center text-3xl font-inter font-bold text-teal-700">
          {contact}
        </h3>
        <div className="flex flex-col md:flex-row gap-y-8 justify-around mt-20">
          <div>
            <h3 className="text-xl font-bold font-inter">{contact}</h3>
            <p className="mt-2 text-sm font-inter">{team}</p>
            <div className="mt-8 text-teal-700 flex items-center gap-3">
              <span className="text-xl">
                <MdEmail />
              </span>
              <span className="text-sm">hello@relume.io</span>
            </div>
            <div className="mt-8 text-teal-700 flex items-center gap-3">
              <span className="text-xl">
                <FaPhone />
              </span>
              <span className="text-sm">+1 (555) 000-0000</span>
            </div>
            <div className="mt-8 text-teal-700 flex items-center gap-3">
              <span className="text-xl">
                <MdLocationOn />
              </span>
              <span className="text-sm">
                123 شارع سامبل، سيدني نيو ساوث ويلز 2000 إيه يو
              </span>
            </div>
          </div>
          <div>
            <form
              className="w-11/12 sm:w-3/4"
              onSubmit={handleSubmit(handleContactUs)}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm">
                  {name}
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className={`outline-none border-2 border-gray-300 px-3 py-1 rounded-md ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  id="name"
                  placeholder={name}
                />
              </div>

              <div className="flex items-center gap-3 mt-5">
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="email" className="text-sm">
                    {email}
                  </label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.com)+$/,
                        message: "Enter valid email",
                      },
                    })}
                    id="email"
                    type="text"
                    className={`outline-none border-2 border-gray-300 px-3 py-1 rounded-md ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={email}
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="phone" className="text-sm">
                    {phone}
                  </label>
                  <input
                    {...register("phone", { required: true })}
                    type="tel"
                    className={`outline-none border-2 border-gray-300 px-3 py-1 rounded-md ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    id="phone"
                    placeholder={phone}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="message" className="text-sm">
                  {msg}
                </label>
                <textarea
                  {...register("message", { required: true })}
                  id="message"
                  rows={3}
                  className={`outline-none border-2 border-gray-300 px-3 py-1 rounded-md resize-none w-full ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={`${msg}...`}
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-5 bg-teal-700 text-white py-1 w-full text-center rounded-md duration-500 hover:bg-teal-800 hover:scale-105"
              >
                {send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
