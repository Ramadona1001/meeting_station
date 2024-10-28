import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { toast } from "sonner";
interface Props {
  setBookArea: any;
  bookArea: any;
  spaceName: string;
  coffeeName: string;
  event: string;
  time: string;
  date: string;
  hours: string;
  people: string;
  text: string;
  continueBooking: string;
  cafeImg: string;
  cafeName: string;
  address: string;
  price: string;
  rate: number;
  resturant_id: number;
  from: string;
  to: string;
  people_count: string;
  restaurant_id: string;
}

export default function BookArea({
  setBookArea,
  bookArea,
  spaceName,
  coffeeName,
  event,
  time,
  date,
  hours,
  people,
  text,
  continueBooking,
  cafeImg,
  cafeName,
  address,
  price,
  rate,
  resturant_id,
  from,
  to,
  people_count,
  restaurant_id,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [allData, setAllData] = useState({});
  const [done, setDone] = useState(false);

  const handleContinueBook = (data: any) => {
    setAllData({
      ...data,
      image: cafeImg,
      name: cafeName,
      address,
      resturant_id,
    });

    if (data.people <= people_count) {
      setDone(true);
    } else {
      toast.info("check to number of people and try again!");
    }
  };

  return (
    <>
      {bookArea && (
        <div
          onClick={() => setBookArea(false)}
          className="overlay min-h-[200vh] absolute w-full h-full bg-black top-0 left-0 opacity-15 cursor-pointer"
        ></div>
      )}
      <div className="max-w-[520px] w-full bg-white border-2 border-gray-300 absolute top-[125%]  md:top-[60%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-xl">
        <span
          onClick={() => setBookArea(false)}
          className="text-gray-500 px-2 py-3 block text-2xl cursor-pointer"
        >
          <IoMdClose />
        </span>

        <div>
          <h3 className="text-center text-xl font-semibold font-inter leading-6 pb-1">
            {spaceName}
          </h3>
          <p className="text-center text-xs font-light font-inter leading-6">
            ({coffeeName})
          </p>

          <form
            onSubmit={handleSubmit(handleContinueBook)}
            className="px-10 pb-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="event" className="text-xs font-inter">
                {event} <span className="text-red-600">*</span>
              </label>
              <input
                {...register("eventName", { required: true })}
                type="text"
                id="event"
                placeholder={event}
                className={
                  "w-full outline-none py-1 px-2 rounded-lg border-2 border-gray-300"
                }
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <div className="w-full sm:w-1/2 flex flex-col gap-2">
                <label htmlFor="people" className="text-xs font-inter">
                  {people} <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("people", { required: true })}
                    type="number"
                    min={1}
                    id="people"
                    placeholder={people}
                    className={
                      "w-full outline-none py-1 px-2 rounded-lg border-2 border-gray-300"
                    }
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 rtl:left-2 ltr:right-2">
                    <IoPeople />
                  </span>
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-2">
                <label htmlFor="date" className="text-xs font-inter">
                  {date} <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("date", { required: true })}
                  type="date"
                  id="date"
                  min={"01-01-2024"}
                  placeholder={date}
                  className={
                    "w-full outline-none py-1 px-2 rounded-lg border-2 border-gray-300"
                  }
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <div className="w-full sm:w-1/2 flex flex-col gap-2">
                <label htmlFor="from" className="text-xs font-inter">
                  {from} <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("from", { required: true })}
                  type="time"
                  id="from"
                  placeholder={from}
                  className={
                    "w-full outline-none py-1 px-2 rounded-lg border-2 border-gray-300"
                  }
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-2">
                <label htmlFor="from" className="text-xs font-inter">
                  {to} <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("to", { required: true })}
                  type="time"
                  id="to"
                  placeholder={to}
                  className={
                    "w-full outline-none py-1 px-2 rounded-lg border-2 border-gray-300"
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="text" className="text-xs font-inter">
                {text} <span className="text-red-600">*</span>
              </label>
              <textarea
                {...register("text", { required: true })}
                id="text"
                placeholder={text}
                className={
                  "w-full outline-none py-1 px-2 rounded-lg border-2 border-gray-300 resize-none"
                }
                cols={5}
                rows={3}
              ></textarea>
            </div>
            {!done ? (
              <div className="mt-5">
                <button className="w-full py-2 rounded-md text-center text-white bg-teal-600 duration-500 hover:bg-teal-800">
                  {continueBooking}
                </button>
              </div>
            ) : (
              <Link
                href={{
                  pathname: "/ar/book-details",
                  query: { ...allData, rate, price, restaurant_id },
                }}
                className="mt-5"
              >
                <button className="w-full py-2 mt-2 rounded-md text-center text-white bg-teal-600 duration-500 hover:bg-teal-800">
                  {continueBooking}
                </button>
              </Link>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
