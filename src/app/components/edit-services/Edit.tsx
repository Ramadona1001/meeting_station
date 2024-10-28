"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdFileCopy } from "react-icons/md";
import { toast } from "sonner";

interface Props {
  data: any;
  update: string;
  Place: string;
  description: string;
  hour: string;
  from: string;
  to: string;
  save: string;
  addressN: string;
  numberOfPeople: string;
  dayWork: string;
  sat: string;
  sun: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
}

export default function Edit({
  data,
  update,
  Place,
  description,
  hour,
  from,
  to,
  save,
  addressN,
  numberOfPeople,
  dayWork,
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

  const allDays = [sat, sun, mon, tue, wed, thu, fri];

  const [coffeeName, setCoffeeName] = useState(data.coffeeName);
  const [descriptionPlace, setDescriptionPlace] = useState(
    data.coffeeDescription
  );
  const [salary, setSalary] = useState(data.salary);
  const [address, setAddress] = useState(data.address);
  const [people, setPeople] = useState(data.numberOfPeople);
  const [startDay, setStartDay] = useState(data.from_day_work);
  const [photos, setPhotos] = useState<string[]>([]);

  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0];

    if (photo) {
      if (photos.includes(photo.name)) {
        toast.info("This photo is already selected");
      } else {
        const newPhotos = [...photos, photo.name];
        setPhotos(newPhotos);
        toast.success("Photo added successfully");
      }
    }
  };

  const handleUpdateService = (updates: any) => {
    const { address, fromDay, startHour, endHours, toDay } = updates;

    const data = {
      coffeeName: coffeeName,
      address,
      coffeeDescription: descriptionPlace,
      fromDay,
      toDay,
      startHour,
      endHours,
      numberOfPeople: people,
      salary: salary,
      images: photos,
    };

    console.log(data);
  };

  return (
    <section>
      <div className="container px-3 sm:px-0 mx-auto mt-8 lg:w-[80%]">
        <h3 className="text-2xl font-inter text-teal-800 font-bold animate-pulse">
          {update}
        </h3>

        <form
          className="mt-10 w-full sm:w-3/4 md:w-1/2"
          onSubmit={handleSubmit(handleUpdateService)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name">{Place}</label>
            <textarea
              {...register("placeName", { required: true })}
              onChange={(e) => setCoffeeName(e.target.value)}
              id="name"
              className={`resize-none w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                errors.placeName ? "border-red-500" : "border-gray-300"
              }`}
              cols={1}
              rows={1}
              value={coffeeName}
            ></textarea>
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="description">{description}</label>
            <textarea
              {...register("description", { required: true })}
              onChange={(e) => setDescriptionPlace(e.target.value)}
              id="description"
              className={`resize-none w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              cols={1}
              rows={5}
              value={descriptionPlace}
            ></textarea>
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="address">{addressN}</label>
            <textarea
              {...register("address", { required: true })}
              onChange={(e) => setAddress(e.target.value)}
              id="description"
              className={`resize-none w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              cols={1}
              rows={3}
              value={address}
            ></textarea>
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
                >
                  {allDays.map((e) => (
                    <option
                      key={e}
                      value={e}
                      onChange={(e: any) => setStartDay(e.target.value)}
                    >
                      {e}
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
                >
                  {/* <option value="s">ss</option> */}
                  {allDays.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 flex-wrap lg:flex-nowrap">
            <div className="flex flex-col gap-2 mt-5 w-[33%]">
              <label htmlFor="salary" className="text-[10px] xs:text-base">
                {hour}
              </label>
              <input
                {...register("salary", { required: true })}
                onChange={(e) => setSalary(e.target.value)}
                type="number"
                min={0}
                id="salary"
                className={`resize-none w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                  errors.salary ? "border-red-500" : "border-gray-300"
                }`}
                value={salary}
              />
            </div>
            <div className="flex flex-col gap-2 mt-5 w-[33%]">
              <label htmlFor="people" className="text-[10px] xs:text-base">
                {numberOfPeople}
              </label>
              <input
                {...register("people", { required: true })}
                onChange={(e) => setPeople(e.target.value)}
                type="number"
                min={0}
                id="salary"
                className={`resize-none w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                  errors.salary ? "border-red-500" : "border-gray-300"
                }`}
                value={people}
              />
            </div>
            <div className="flex flex-col gap-2 mt-5 w-[33%]">
              <label htmlFor="startHour" className="px-3">
                {from}
              </label>
              <input
                {...register("startHour", { required: true })}
                type="time"
                id="startHour"
                className={`resize-none w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                  errors.startHour ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div className="flex flex-col gap-2 mt-5 w-[33%]">
              <label htmlFor="endHours" className="px-3">
                {to}
              </label>
              <input
                {...register("endHours", { required: true })}
                type="time"
                id="endHours"
                className={`resize-none w-full outline-none border-2 border-gray-300 rounded-lg px-3 py-2 ${
                  errors.endHours ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-5 w-full">
            <label
              htmlFor="file"
              className="text-xl w-10 h-10 flex items-center justify-center py-2 rounded-full bg-teal-600 text-white cursor-pointer "
            >
              <MdFileCopy />
            </label>
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleChangePhoto}
            />
          </div>

          <button className="bg-teal-500 text-white mt-5 w-full py-2 rounded-md">
            {save}
          </button>
        </form>
      </div>
    </section>
  );
}
