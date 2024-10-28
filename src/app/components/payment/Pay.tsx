"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SiVisa } from "react-icons/si";
import { postData } from "@/fetchData";
import { toast } from "sonner";
import { redirect } from 'next/navigation'

    
interface Props {
  data: any;
  pay: string;
  choose: string;
  card: string;
  name: string;
  cardNumber: string;
  expiration: string;
  cvvCode: string;
  total: string;
  sar: string;
  payNow: string;
  fatoora: string;
  go: string;
}
export default function Pay({
  data,
  pay,
  choose,
  card,
  name,
  cardNumber,
  expiration,
  cvvCode,
  total,
  sar,
  payNow,
  fatoora,
  go,
}: Props) {
  const [visa, setVisa] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [date, setDate] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  function formatCardNumber(cardNumber: string) {
    cardNumber = cardNumber.replace(/\D/g, "");

    const formattedCardNumber = cardNumber.replace(/(\d{4})/g, "$1 ");

    return formattedCardNumber.trim();
  }

  function formatExpirationDate(expirationDate: string) {
    expirationDate = expirationDate.replace(/\D/g, "");
    const formattedExpirationDate = expirationDate.replace(
      /(\d{2})(\d{2})/,
      "$1/$2"
    );

    return formattedExpirationDate;
  }

  const handlePaymentSubmit = async () => {
    console.log(data);
    const newData = { 
      event_name : data.eventName,
      hours : data.hours,
      resturant_name : data.name,
      people_amount : data.people,
      price : data.price,
      rate : data.rate,
      description : data.text,
      time : data.time,
      date : data.date,
      resturant_id: data.resturant_id
    };

    const response = await postData("/booking", newData);

    console.log(response);
    if (response.errors) {
      toast.error(response.message);
    } else {
      if (response.data == 'success') {
        toast.success(
          "order completed successfully you will be directed for the payment"
        );
        location.assign('/');
      } else {
        toast.success(
          "some thing went wrong please try again later and contact us"
        );
      }
    }


  };

  return (
    <section>
      <div className="container px-3 sm:px-0 mx-auto lg:w-[80%] mt-20">
        <div className="w-full sm:w-1/2 lg:w-1/4 mx-auto">
          <h2 className="font-bold font-inter text-2xl text-teal-600 leading-6 text-center">
            {pay}
          </h2>
          <p className="text-sm font-light font-inter tracking-wider mt-8">
            {choose}
          </p>
          <form className="mt-8 flex items-center justify-around">
            <div className="flex items-center gap-2 w-fit">
              <input
                onClick={() => setVisa(false)}
                type="radio"
                id="visa"
                value="visa"
                name="payment-methods"
              />
              <label onClick={() => setVisa(false)} htmlFor="visa">
                <Image
                  src="/myfatoora logo.png"
                  alt="fatoora"
                  width={60}
                  height={60}
                />
              </label>
            </div>
            {/* <div className="flex items-center gap-2 w-fit">
              <input
                onClick={() => setVisa(true)}
                type="radio"
                id="fatoora"
                value="fatoora"
                name="payment-methods"
              />
              <label
                onClick={() => setVisa(true)}
                htmlFor="fatoora"
                className="text-4xl text-teal-600"
              >
                <SiVisa />
              </label>
            </div> */}
          </form>

          <div className="mt-10">
            {/* {visa ? (
              <div>
                <h3 className="text-sm">{card}</h3>
                <form
                  onSubmit={handleSubmit(handlePaymentSubmit)}
                  className="mt-5"
                >
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-xs font-inter tracking-wide"
                      htmlFor="userName"
                    >
                      {name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      id="userName"
                      className={`w-full rounded-md border-2 border-gray-300 px-3 py-2 mt-1 outline-none ${
                        errors.name ? "border-red-700" : "border-gray-300"
                      }`}
                      placeholder={name}
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-5">
                    <label
                      className="text-xs font-inter tracking-wide"
                      htmlFor="cardNumber"
                    >
                      {cardNumber} <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("cardNumber", {
                        required: true,
                        minLength: 19,
                      })}
                      onChange={(e) =>
                        setCardNum(formatCardNumber(e.target.value))
                      }
                      type="text"
                      id="cardNumber"
                      maxLength={19}
                      className={`w-full rounded-md border-2 border-gray-300 px-3 py-2 mt-1 outline-none text-left ${
                        errors.cardNumber ? "border-red-700" : "border-gray-300"
                      }`}
                      placeholder="0000 0000 0000 0000"
                      value={cardNum}
                    />
                  </div>

                  <div className="flex gap-3 mt-5">
                    <div>
                      <label
                        className="text-xs font-inter tracking-wide"
                        htmlFor="expiration"
                      >
                        {expiration} <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("expiration", {
                          required: true,
                          minLength: 5,
                        })}
                        onChange={(e) =>
                          setDate(formatExpirationDate(e.target.value))
                        }
                        type="text"
                        id="expiration"
                        maxLength={5}
                        className={`w-full rounded-md border-2 border-gray-300 px-3 py-2 mt-1 outline-none text-left ${
                          errors.expiration
                            ? "border-red-700"
                            : "border-gray-300"
                        }`}
                        placeholder="20/3"
                        value={date}
                      />
                    </div>

                    <div>
                      <label
                        className="text-xs font-inter tracking-wide"
                        htmlFor="cvv"
                      >
                        {cvvCode} <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("cvv", {
                          required: true,
                          minLength: 3,
                        })}
                        type="password"
                        id="cvv"
                        maxLength={3}
                        className={`w-full rounded-md border-2 border-gray-300 px-3 py-2 mt-1 outline-none text-left ${
                          errors.cvv ? "border-red-700" : "border-gray-300"
                        }`}
                        placeholder="***"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-base font-light font-inter">
                      {total}
                    </span>
                    <span className="text-teal-600 font-bold text-lg">
                      {data.price} {sar}
                    </span>
                  </div>

                  <div className="mt-5 flex justify-center">
                    <button className="bg-teal-500 w-full sm:w-3/4 py-2 text-white rounded-md duration-500 hover:bg-teal-800">
                      {payNow}
                    </button>
                  </div>
                </form>
              </div>
            ) : ( */}
              <div className="h-[50vh]">
                <h3 className="text-sm font-inter">{fatoora}</h3>
                <button onClick={handlePaymentSubmit} className="mt-5 bg-teal-500 w-full py-2 text-white rounded-md duration-500 hover:bg-teal-800">
                  {payNow}
                </button>
              </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
