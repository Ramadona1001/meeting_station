"use client";
import { GetCurrentUser } from "@/user/getUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  home: string;
  services: string;
  transaction: string;
  about: string;
  terms: string;
  myServices: string;
  reservations: string;
}
export default function Links({
  home,
  services,
  transaction,
  about,
  terms,
  myServices,
  reservations,
}: Props) {
  const pathName = usePathname();
  const [dir, setDir] = useState("ar");

  const userState: any = GetCurrentUser();

  const userLinks = [
    {
      href: `/${dir}`,
      locale: home,
    },
    {
      href: `/${dir}/services`,
      locale: services,
    },
    {
      href: `/${dir}/transaction`,
      locale: transaction,
    },
    {
      href: `/${dir}/about`,
      locale: about,
    },
    {
      href: `/${dir}/terms`,
      locale: terms,
    },
  ];
  const venderLinks = [
    {
      href: `/${dir}/my-services`,
      locale: myServices,
    },
    {
      href: `/${dir}/reservations`,
      locale: reservations,
    },
    {
      href: `/${dir}/about`,
      locale: about,
    },
    {
      href: `/${dir}/terms`,
      locale: terms,
    },
  ];

  useEffect(() => {
    document.dir === "ltr" ? setDir("en") : setDir("ar");
  }, []);

  return (
    <div>
      <ul className="hidden lg:flex gap-7 items-center font-poppins">
        <>
          {userState?.user === "vender"
            ? venderLinks.map((e, id) => (
                <li
                  key={id}
                  className="relative text-[#666666] text-sm leading-4"
                >
                  <Link href={e.href}>{e.locale}</Link>
                  <span
                    className={
                      pathName === e.href
                        ? "w-[6px] h-[6px] rounded-full bg-green-600 absolute bottom-[-10px] left-1/2 -translate-x-1/2"
                        : "w-0 h-0"
                    }
                  ></span>
                </li>
              ))
            : userLinks.map((e, id) => (
                <li
                  key={id}
                  className="relative text-[#666666] text-sm leading-4"
                >
                  <Link href={e.href}>{e.locale}</Link>
                  <span
                    className={
                      pathName === e.href
                        ? "w-[6px] h-[6px] rounded-full bg-green-600 absolute bottom-[-10px] left-1/2 -translate-x-1/2"
                        : "w-0 h-0"
                    }
                  ></span>
                </li>
              ))}
        </>
        <li className="relative flex gap-3 items-center border-2 border-gray-100 px-5 py-2 rounded-full">
          <label htmlFor="search" className="text-lg cursor-pointer">
            <FaSearch />
          </label>
          <input
            type="text"
            id="search"
            className="outline-none w-0 duration-500 focus:w-20"
          />
        </li>
      </ul>
    </div>
  );
}
