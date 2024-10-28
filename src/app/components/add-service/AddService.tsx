"use client";

import { GetCurrentUser } from "@/user/getUser";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { toast } from "sonner";

interface Props {
  place: string;
  description: string;
  type: string;
  coffee: string;
  restaurant: string;
  hour: string;
  sar: string;
  people: string;
  address: string;
  newService: string;
  available: string;
  photo: string;
  add: string;
  dayWork: string;
  from: string;
  to: string;
  sat: string;
  sun: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
}

export default function AddService({
  place,
  description,
  type,
  coffee,
  restaurant,
  hour,
  sar,
  people,
  address,
  newService,
  available,
  photo,
  add,
  dayWork,
  from,
  to,
  sat,
  sun,
  mon,
  tue,
  wed,
  thu,
  fri,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [photos, setPhotos] = useState<string[] | any>([]);
  const [category, setCategory] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState("en");
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const pathName = usePathname();
  const user = GetCurrentUser();
  const route = useRouter();
  const allDays = [
    {
      name: sun,
      id: 1,
    },
    {
      name: mon,
      id: 2,
    },
    {
      name: tue,
      id: 3,
    },
    {
      name: wed,
      id: 4,
    },
    {
      name: thu,
      id: 5,
    },
    {
      name: fri,
      id: 6,
    },
    {
      name: sat,
      id: 7,
    },
  ];
  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0];

    if (photo) {
      if (photos.includes(photo.name)) {
        toast.info("This photo is already selected");
      } else {
        const newPhotos = [...photos, photo];
        setPhotos(newPhotos);
        toast.success("Photo added successfully");
      }
    }
  };

  const handleAddService = async (data: any) => {
    const {
      placeName,
      type,
      address,
      description,
      from,
      to,
      people,
      hourCost,
      fromDay,
      toDay,
    } = data;

    const dataDetails = {
      name: placeName,
      category_id: type,
      address,
      description,
      open_time: from,
      close_time: to,
      people_count: people,
      hour_rate: hourCost,
      thumbnail: photos[0],
      images: photos,
      open_day: start,
      close_day: end,
      vendor_id: user?.id,
    };

    console.log(dataDetails);

    if (user) {
      await axios
        .post("https://api.meetingstation1.com/api/restaurants", dataDetails, {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(() => {
          toast.success("services added successfully");
          route.push("/");
        })
        .catch((error) => {
          toast.error("something wrong! try again later");
          console.log(error);
        });
    }
  };

  useEffect(() => {
    axios
      .get("https://api.meetingstation1.com/api/categories")
      .then((data) =>  setCategory(data.data?.data))
      .catch(() => setCategory([]));

    if (pathName.includes("/ar")) {
      setDefaultCategory("ar");
    } else {
      setDefaultCategory("en");
    }
  }, []);


  return (
    <section>
      <div className="container px-3 sm:px-0 mx-auto mt-8 lg:w-[80%]">
        <h3 className="text-2xl font-inter text-teal-800 font-bold animate-pulse text-center">
          {newService}
        </h3>

        <div className="flex justify-center">
          <form
            className="mt-10 w-full sm:w-3/4 md:w-1/2"
            onSubmit={handleSubmit(handleAddService)}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name">{place}</label>
              <input
                type="text"
                {...register("placeName", { required: true })}
                id="name"
                className={`resize-none w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                  errors.placeName ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="type">{type}</label>
              <select
                {...register("type", { required: true })}
                id="type"
                className={`resize-none w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                  errors.type ? "border-red-500" : "border-gray-300"
                }`}
              >
                {pathName.includes("/ar") ? (
                  <>
                    {category.map((e: any, id) => (
                      <option key={id} value={e.id}>
                        {e.name_ar}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    {category.map((e: any, id) => (
                      <option key={id} value={e.id}>
                        {e.name_en}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="description">{description}</label>
              <textarea
                {...register("description", { required: true })}
                id="description"
                className={`resize-none w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                rows={4}
              ></textarea>
            </div>

            <div className="flex items-center gap-5 mt-5">
              <div className="flex flex-col gap-2 w-1/2 relative">
                <label htmlFor="hourCost">{hour}</label>
                <input
                  {...register("hourCost", { required: true, min: 0 })}
                  id="hourCost"
                  type="number"
                  min={0}
                  className={`w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                    errors.hourCost ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <span className="absolute rtl:left-1 top-1/2 rtl:border-r-2 rtl:border-gray-300 px-2 ltr:right-1 ltr:border-l-2 ltr:border-l-gray-300">
                  {sar}
                </span>
              </div>

              <div className="flex flex-col gap-2 w-1/2 relative">
                <label htmlFor="people">{people}</label>
                <input
                  {...register("people", { required: true, min: 0 })}
                  id="day"
                  type="number"
                  min={1}
                  className={`w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                    errors.people ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="address">{address}</label>
              <input
                {...register("address", { required: true })}
                type="text"
                id="address"
                className={`resize-none w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            <div className="mt-5">
              <h2>{dayWork}</h2>
              <div className="flex items-end gap-5">
                <div className="flex flex-col gap-2 w-1/2 relative">
                  <label htmlFor="fromDay">{from}</label>

                  <select
                    {...register("fromDay", { required: true })}
                    id="fromDay"
                    className={`w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                      errors.fromDay ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={(e: any) => setStart(e.target.value)}
                  >
                    {allDays.map((e, id) => (
                      <option key={id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2 w-1/2 relative">
                  <label htmlFor="toDay">{to}</label>

                  <select
                    {...register("toDay", { required: true })}
                    id="toDay"
                    className={`w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                      errors.toDay ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={(e: any) => setEnd(e.target.value)}
                  >
                    {allDays.map((e, id) => (
                      <option key={id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-end gap-5 mt-5">
              <div className="flex flex-col gap-2 w-1/2 relative">
                <label htmlFor="from">{available}</label>
                <input
                  {...register("from", { required: true })}
                  id="from"
                  type="time"
                  className={`w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                    errors.from ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="w-1/2 ">
                <input
                  {...register("to", { required: true })}
                  id="to"
                  type="time"
                  className={`w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                    errors.to ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-5">
              <h3>{photo}</h3>
              <label
                htmlFor="camera"
                className="w-full py-3 text-4xl text-gray-500 border-2 border-dotted mt-5 cursor-pointer text-center flex justify-center items-center"
              >
                <FaCamera />
              </label>
              <input
                id="camera"
                type="file"
                className="hidden"
                onChange={handleChangePhoto}
              />
            </div>

            <button className="bg-teal-500 text-white mt-5 w-full py-2 rounded-md">
              {add}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
