"use client";
import { CiBookmark } from "react-icons/ci";
import { IoMdClose, IoMdNotificationsOutline } from "react-icons/io";
import SwitchLanguage from "./SwitchLanguage";
import User from "./User";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { stateAuth } from "@/redux/slice/authSlice";
import { DiVim } from "react-icons/di";
import { GetCurrentUser } from "@/user/getUser";
import axios from "axios";
import GetUser from "@/user/currentUser";

export default function Notifications({
  login,
  not,
}: {
  login: string;
  not: string;
}) {
  const [dir, setDir] = useState<string>("ar");
  const [notifications, setNotification] = useState<{}[]>([]);
  const user: any = GetCurrentUser();

  const auth = useSelector(stateAuth);

  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    document.dir === "ltr" ? setDir("en") : setDir("ar");
  }, []);

  

  useEffect(() => {
    axios
      .get(`https://api.meetingstation1.com/api/notifications/${user?.id}`)
      .then((response) => setNotification(response.data?.data))
      .catch(() => setNotification([]));
  }, [showNotification]);

  return (
    <div className="flex items-center gap-8 font-poppins">
      <div className="flex items-center gap-2">
        <div className="relative border-l-2 border-l-gray-200 px-3">
          <span
            onClick={() => setShowNotification(!showNotification)}
            className="text-xl cursor-pointer"
          >
            <IoMdNotificationsOutline />
          </span>
          {showNotification && (
            <div className="absolute max-w-[200px] right-0 w-[150px] xs:w-[200px]  mt-5 max-h-60 overflow-y-scroll z-50">
              {notifications.length === 0 ? (
                <h3 className="text-xs py-3 text-red-600 bg-white text-center select-none">
                  {not}
                </h3>
              ) : (
                <>
                  {notifications
                    .slice()
                    .reverse()
                    .map((e: any, id) => (
                      <>
                        {e.type === 2 && (
                          <div
                            key={id}
                            className={`bg-teal-500 text-black shadow-md p-2 mt-2 cursor-pointer `}
                          >
                            <a
                              href={e?.link}
                            >
                              <p className="py-2 text-xs max-w-[180px] w-full">
                                {e.notification}
                              </p>
                            </a>
                          </div>
                        )}
                        {e.type === 3 && (
                          <div
                            key={id}
                            className={`bg-red-600 text-white shadow-md p-2 mt-2 cursor-pointer `}
                          >
                            <div>
                              <p className="py-2 text-xs max-w-[180px] w-full">
                                {e.notification}
                              </p>
                            </div>
                          </div>
                        )}

                        {e.type === 1 && (
                          <div
                            key={id}
                            className={`bg-gray-600 text-white shadow-md p-2 mt-2 cursor-pointer `}
                          >
                            <div>
                              <p className="py-2 text-xs max-w-[180px] w-full">
                                {e.notification}
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                </>
              )}
            </div>
          )}
        </div>
        <div className="relative border-l-2 border-l-gray-200 px-3">
          <Link href={`/${dir}/favorite`} className="text-xl cursor-pointer">
            <CiBookmark />
          </Link>
        </div>
        <SwitchLanguage />

        {auth ? (
          <User />
        ) : (
          <div className="border-2 border-black duration-500 hover:bg-black hover:text-white px-4 py-1 text-sm rounded-xl">
            <Link href={`/${dir}/login`}>
              <button>{login}</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
