"use client";
import { GetCurrentUser } from "@/user/getUser";
import axios from "axios";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegCalendarAlt, FaRegClock, FaStar } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { toast } from "sonner";

export default function BookDetails({
  data,
  edit,
  sar,
  pay,
  details,
  rate,
}: any) {
  // Start Handle Time
  const user = GetCurrentUser();

  function convertHour() {
    const [startHour, startMinute] = data.from.split(":").map(Number);
    const [endHour, endMinute] = data.to.split(":").map(Number);

    let hourDiff = endHour - startHour;
    let minuteDiff = endMinute - startMinute;

    if (minuteDiff < 0) {
      minuteDiff += 60;
      hourDiff--;
    }

    const hour: any = `${hourDiff}.${minuteDiff}`;

    // setHour(eval(`${hourDiff}.${minuteDiff}`));
    return hour;
  }

  // End Handle Time

  const route = useRouter();

  const totalSalary = eval(`${convertHour() * data.price}`);


  const handleAddRequest = async () => {
    const allData = {
      user_id: user?.id,
      restaurant_id: data.restaurant_id,
      event_name: data.eventName,
      date: data?.date,
      start_time: data?.from,
      end_time: data.to,
      people_count: data.people,
      total: totalSalary,
      description: data.text,
      rate: data.rate,
    };

    console.log(allData);

    await axios
      .post("https://api.meetingstation1.com/api/booking", allData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        toast.success("The application has been send");
        route.push("/");
      })
      .catch((error) => {
        // throw Error(error.error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <section>
      <div className="container px-3 sm:px-0 mx-auto mt-14 lg:w-[80%]">
        <h3 className="text-center text-teal-700 font-inter font-bold text-3xl leading-7">
          {details}
        </h3>
        <div className="flex flex-col-reverse md:flex-row items-center  gap-x-10 gap-y-5 justify-between bg-active px-5 py-3 mt-7 rounded-lg">
          <div>
            <h6 className="text-xs text-gray-500 font-inter font-light">
              {data.name}
            </h6>
            <h2 className="font-inter font-bold py-2 text-2xl">
              {data.eventName}
            </h2>
            <p className="max-w-[400px] w-full font-inter text-sm leading-6 text-gray-500">
              {data.address}
            </p>
            <div className="max-w-[300px] w-full mt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-inter">
                  <span>
                    <FaRegClock />
                  </span>
                  <span>{Math.abs(convertHour())}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-inter">
                  <span className="text-xl">
                    <MdGroups2 />
                  </span>
                  <span>{data.people}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-inter">
                  <span>
                    <FaRegClock />
                  </span>
                  <span>
                    {data.from} - {data.to}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-inter">
                  <span>
                    <FaRegCalendarAlt />
                  </span>
                  <span>{data.date}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-center justify-between mt-5">
              <span className="text-xs font-inter">{rate}</span>
              <div className="flex items-center gap-2 text-lg">
                <span>
                  <FaStar color="orange" />
                </span>
                <span>
                  <FaStar color="orange" />
                </span>
                <span>
                  <FaStar color="orange" />
                </span>
                <span>
                  <FaStar color="orange" />
                </span>
                <span>
                  <FaStar />
                </span>
              </div>
            </div>

            <div className="flex justify-between max-w-[420px] w-full mt-7">
              <Link href="/ar/services">
                <button className="px-6 py-1 rounded-lg text-center text-white bg-teal-600">
                  {edit}
                </button>
              </Link>
              <span className="text-teal-600 font-bold font-inter">
                {Math.abs(totalSalary)} {sar}
              </span>
            </div>
          </div>
          <div>
            <Image
              src={`${data.image}`}
              alt={data.name}
              width={360}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="mt-10 px-5">
          <button
            onClick={handleAddRequest}
            className="bg-teal-700 text-white max-w-[150px] w-full py-2 rounded-md font-inter hover:bg-teal-800 duration-500"
          >
            {pay}
          </button>
        </div>
      </div>
    </section>
  );
}
