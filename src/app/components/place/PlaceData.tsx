"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import BookArea from "./BookArea";
import { CiBookmark } from "react-icons/ci";
import { toast } from "sonner";
import Rate from "./Rate";
import axios from "axios";
import { GetCurrentUser } from "@/user/getUser";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { stateAuth } from "@/redux/slice/authSlice";
import { formatDay } from "@/format/formatDay";
import { getCookie } from "cookies-next";

interface Props {
  params: any;
  place: string;
  sar: string;
  hour: string;
  book: string;
  spaceName: string;
  coffeeName: string;
  event: string;
  time: string;
  date: string;
  hours: string;
  people: string;
  text: string;
  continueBooking: string;
  from: string;
  to: string;
  am: string;
  pm: string;
}

export default function PlaceData({
  params,
  place,
  sar,
  hour,
  book,
  spaceName,
  coffeeName,
  event,
  time,
  date,
  hours,
  people,
  text,
  continueBooking,
  from,
  to,
  am,
  pm,
}: Props) {
  const [bookArea, setBookArea] = useState(false);
  const [rate, setRate] = useState(1);
  const [data, setData]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const restaurant_id = params.id;
  const [defaultImg, setDefaultImg] = useState("");
  const [isOwn, setIsOwn] = useState<boolean>(false);

  const user = useSelector(stateAuth);
  const venderID = params.vendor;
  const currentUser: { id: string } = GetCurrentUser();



  const handleAddToFav = () => {
    const storedItem = localStorage.getItem("myFavPlace");
    const existItem: any = storedItem ? JSON.parse(storedItem) : [];

    const find = existItem?.find((e: any) => e.id === params.id);

    if (find) {
      toast.info("This place is already on your favorite list");
    } else {
      existItem?.push(params);
      toast.success("Place added successfully");
      localStorage.setItem("myFavPlace", JSON.stringify(existItem));
    }
  };

  function removeSeconds(time: any) {
    let parts = time?.split(":");
    if (parts?.length >= 2) {
      let hours = parseInt(parts[0]);
      let minutes = parts[1];

      let period = hours >= 12 ? pm : am;

      hours = hours % 12;
      hours = hours ? hours : 12;

      return hours + ":" + minutes + " " + period;
    }
    return time;
  }

  function calculateAverageRating(rates: any) {
    if (!Array.isArray(rates) || rates.length === 0) {
      return 0;
    }
    let sum = rates.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.rate;
    }, 0);
    let average = sum / rates.length;
    return average;
  }

  useEffect(() => {
    const fetchData = axios
      .get(`https://api.meetingstation1.com/api/restaurants/${restaurant_id}`)
      .then((response) => {
        setData(response.data.data);
        setDefaultImg(response.data.data.thumbnail);
        setLoading(false);
      })
      .catch(() => {
        setData([]);
      });

    if (user === false) {
      redirect("/ar/login");
    }

    currentUser?.id === venderID ? setIsOwn(true) : setIsOwn(false);
  }, [loading, data]);

  const locale = getCookie("NEXT_LOCALE");

  return (
    <section>
      <div className="w-full">
        <div className="w-full h-60 bg-[url('/details.png')] bg-cover bg-center bg-no-repeat relative flex items-center justify-center">
          <div className="overlay absolute top-0 left-0 w-full h-full bg-teal-600 opacity-20"></div>
          <div>
            <h3 className="text-white text-3xl font-inter font-bold relative z-50">
              {place}
            </h3>
          </div>
        </div>
        <div className="container px-3 sm:px-0 mx-auto lg:w-[85%] flex flex-col-reverse items-center xl:flex-row md:items-start  gap-10 justify-between mt-10">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/user.png"
                alt="owner-img"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h5 className="text-xs capitalize text-black font-medium font-inter">
                {data?.vendor?.name}
              </h5>
            </div>
            <div className="w-full xl:max-w-[700px]">
              <div className="flex items-center justify-between">
                <h3 className="font-inter font-bold text-2xl py-3">
                  {params.name}
                </h3>
                <div className="flex flex-row-reverse items-center gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {calculateAverageRating(data.rates)}
                    </span>
                    <span className="text-lg animate-pulse">
                      <FaStar color="orange" />
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    ({data.rates?.length})
                  </span>
                </div>
              </div>
              <p className="text-sm font-inter font-light leading-6 max-w-[440px] mt-5">
                {data.description}
              </p>

              {/* Group */}
              <div className="grid grid-cols-3 gap-10 mt-6">
                <div className="flex items-center gap-2">
                  <span>
                    <Image
                      src={"/group.png"}
                      alt="group"
                      width={25}
                      height={25}
                    />
                  </span>
                  <span className="font-inter text-xs font-light">
                    {data.people_count}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span>
                    <Image
                      src={"/calender.png"}
                      alt="group"
                      width={25}
                      height={25}
                    />
                  </span>
                  <div>
                    {locale === "ar" ? (
                      <>
                        <span className="text-xs">
                          {formatDay(data.open_day).name_ar} -{" "}
                          {formatDay(data.close_day).name_ar}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs">
                        {formatDay(data.open_day).name_en} -{" "}
                        {formatDay(data.close_day).name_en}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span>
                    <Image
                      src={"/time.png"}
                      alt="group"
                      width={25}
                      height={25}
                    />
                  </span>
                  <span className="font-inter text-xs font-light">
                    {removeSeconds(data.open_time)} -{" "}
                    {removeSeconds(data.close_time)}
                  </span>
                </div>
              </div>

              {/* Salary */}
              <div className="salary mt-8 flex gap-1 items-center">
                <span className="text-teal-600 text-lg font-inter font-bold">
                  {data.hour_rate}
                </span>
                <span className="text-teal-600 text-lg font-inter font-bold">
                  {sar}
                </span>
                <span className="text-lg text-gray-400 font-inter">{hour}</span>
              </div>

              {/* Book Button */}

              {!isOwn && (
                <div className="flex justify-between items-center gap-8 mt-10">
                  <button
                    onClick={() => setBookArea(true)}
                    className="w-48 block text-center py-2 rounded-xl bg-teal-600 text-white text-sm font-inter duration-500 hover:bg-teal-800 hover:scale-105"
                  >
                    {book}
                  </button>
                  <Rate changeRate={setRate} />
                </div>
              )}

              {/* Book Area */}

              {bookArea && (
                <BookArea
                  setBookArea={setBookArea}
                  bookArea={bookArea}
                  spaceName={spaceName}
                  coffeeName={coffeeName}
                  event={event}
                  time={time}
                  date={date}
                  hours={hours}
                  people={people}
                  text={text}
                  continueBooking={continueBooking}
                  cafeImg={data.thumbnail}
                  cafeName={data.name}
                  address={data.address}
                  price={data.hour_rate}
                  rate={rate}
                  resturant_id={data.id}
                  from={from}
                  to={to}
                  people_count={data.people_count}
                  restaurant_id={restaurant_id}
                />
              )}
            </div>
          </div>

          <div className="max-w-[420px] w-full">
            <div className="relative max-w-[350px] w-full">
              <Image src={defaultImg} alt="img" width={350} height={350} />
              <span
                onClick={handleAddToFav}
                className="absolute top-5 left-3 text-white text-xl cursor-pointer"
              >
                <CiBookmark />
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {data.images?.slice(0, 4)?.map((e: any, id: number) => (
                <div className="w-[25%] h-20 relative" key={id}>
                  <Image
                    onClick={() => setDefaultImg(e.image)}
                    key={id}
                    src={e.image}
                    alt="image"
                    fill
                    objectFit="cover"
                    className="cursor-pointer rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
