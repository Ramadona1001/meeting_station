"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";
import { GetCurrentUser } from "@/user/getUser";
export default function User() {
  const user: any = GetCurrentUser();

  const [dir, setDir] = useState("en");

  useEffect(() => {
    document.dir === "rtl" ? setDir("ar") : setDir("en");
  }, []);

  return (
    <div>
      <div className="flex items-center">
        <span className="text-lg text-gray-500">
          <IoMdArrowDropdown />
        </span>
        <Link href={`/${dir}/account`}>
          {user?.photoURL === "" ? (
            <Image
              src="/user.png"
              alt="user"
              width={50}
              height={50}
              className="rounded-full"
            />
          ) : (
            <Image
              src={user?.photoURL}
              alt="user"
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
        </Link>
      </div>
    </div>
  );
}
