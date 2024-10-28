import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaGithub, FaPhone, FaTelegram, FaTwitter } from "react-icons/fa";
import Des from "./Des";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-gray-300 py-10 mt-8">
      <div className="container px-3 sm:px-0 mx-auto lg:w-[80%]">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:gird-cols-3 lg:grid-cols-4 gap-16">
          <div>
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={150} height={150} />
            </Link>
            <p className="mt-3 text-xs text-gray-600">{t("copy")} &copy;</p>
          </div>

          <div className="flex sm:justify-center">
            <ul className="flex flex-col gap-3 ">
              <li>
                <Link href="/">{t("home")}</Link>
              </li>
              <li>
                <Link href="/ar/contact">{t("contactUs")}</Link>
              </li>
              <li>
                <Link href="/ar/about">{t("about")}</Link>
              </li>
              <li>
                <Link href="/ar/terms">{t("terms")}</Link>
              </li>
            </ul>
          </div>

          <Des address={t("address")} contact={t("contact")} />
        </div>
        <div className="mt-10 flex flex-col-reverse sm:flex-row gap-5 items-center justify-between">
          <form action="" className="flex flex-wrap-reverse items-center gap-2">
            <button className="bg-teal-500 px-3 py-1 text-white rounded-md">
              {t("contactUs")}
            </button>
            <input
              className="px-2 py-1 rounded-md"
              placeholder="david@gmail.com"
              type="email"
            />
          </form>

          <div className="flex items-center gap-5">
            <Link
              href=""
              className="w-7 h-7 bg-white rounded-full cursor-pointer flex items-center justify-center text-teal-500"
            >
              <FaTwitter />
            </Link>
            <Link
              href=""
              className="w-7 h-7 bg-white rounded-full cursor-pointer flex items-center justify-center text-teal-500"
            >
              <FaGithub />
            </Link>
            <Link
              href=""
              className="w-7 h-7 bg-white rounded-full cursor-pointer flex items-center justify-center text-teal-500"
            >
              <FaTelegram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
