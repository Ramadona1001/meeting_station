"use client";
import { GetCurrentUser } from "@/user/getUser";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

interface Props {
  home: string;
  services: string;
  transaction: string;
  about: string;
  terms: string;
  myServices: string;
  reservations: string;
}
export default function Menu({
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
  const [showMenu, setShowMenu] = useState(false);
  const active = useLocale();
  const [path, setPath] = useState("en");
  const router = useRouter();

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

  const handleChangeLang = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    const search = window.location.search;

    router.push(`/${nextLocale}/${path}${search}`);
  };

  useEffect(() => {
    document.dir === "ltr" ? setDir("en") : setDir("ar");
    setPath(window.location.pathname.replace("/en", "").replace("/ar", ""));

    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showMenu]);

  return (
    <div className="lg:hidden w-fit px-2">
      <span
        onClick={() => setShowMenu(true)}
        className="text-2xl cursor-pointer w-fit"
      >
        <IoMdMenu />
      </span>

      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="overlay absolute w-full h-screen top-0 left-0 opacity-50 bg-black z-50 "
        ></div>
      )}

      <div
        className={`px-8 py-16 absolute max-w-96 w-full h-[120vh] top-[-20px] z-[9999] bg-white text-black duration-500 s ${
          showMenu
            ? "rtl:right-0 ltr:left-0"
            : "rtl:right-[-1500px] ltr:left-[-1500px]"
        }`}
      >
        <span
          onClick={() => setShowMenu(false)}
          className="text-3xl cursor-pointer w-fit"
        >
          <IoClose />
        </span>

        <ul className="flex flex-col gap-7 font-poppins py-10">
          <>
            {userState?.user === "vender"
              ? venderLinks.map((e, id) => (
                  <li
                    key={id}
                    className={`relative text-[#666666] text-sm leading-4 w-fit px-3 py-1 rounded-lg ${
                      pathName === e.href && "bg-green-600 text-white"
                    }`}
                  >
                    <Link href={e.href}>{e.locale}</Link>
                  </li>
                ))
              : userLinks.map((e, id) => (
                  <li
                    key={id}
                    className={`relative text-[#666666] text-sm leading-4 w-fit px-3 py-1 rounded-lg ${
                      pathName === e.href && "bg-green-600 text-white"
                    }`}
                  >
                    <Link href={e.href}>{e.locale}</Link>
                  </li>
                ))}
          </>

          <li>
            <label className="flex items-center border-2 border-gray-300 w-fit py-1 px-2 rounded-lg">
              <select
                defaultValue={active}
                className="outline-none capitalize bg-transparent text-sm px-2"
                onChange={handleChangeLang}
              >
                <option value="en" className="capitalize">
                  EN
                </option>
                <option value="ar" className="capitalize w-full">
                  AR
                </option>
              </select>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
