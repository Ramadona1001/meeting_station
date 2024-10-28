"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { RiGlobalLine } from "react-icons/ri";

export default function SwitchLanguage() {
  const router = useRouter();
  const [isPending] = useTransition();

  const active = useLocale();
  const [path, setPath] = useState("en");

  const handleChangeLang = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    const search = window.location.search;

    router.push(`/${nextLocale}/${path}${search}`);
  };

  useEffect(() => {
    setPath(window.location.pathname.replace("/en", "").replace("/ar", ""));
  }, []);

  return (
    <label className="hidden lg:flex items-center border-l-2 border-l-gray-200 px-2">
      <select
        defaultValue={active}
        className="outline-none capitalize bg-transparent text-sm px-2"
        onChange={handleChangeLang}
        disabled={isPending}
      >
        <option value="en" className="capitalize">
          EN
        </option>
        <option value="ar" className="capitalize w-full">
          AR
        </option>
      </select>
      <span className="text-lg">
        <RiGlobalLine />
      </span>
    </label>
  );
}
