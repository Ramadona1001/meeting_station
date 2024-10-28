"use client";
import { auth } from "@/firebase/firebaseConfig";
import { useSignOutMutation } from "@/redux/services/auth/authApiServices";
import { onAuthStateFail, stateAuth } from "@/redux/slice/authSlice";
import GetUser from "@/user/currentUser";
import { GetCurrentUser } from "@/user/getUser";
import { handleFirebaseAuthErrors } from "@/utility/firebaseError";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsBoxArrowLeft, BsBoxArrowRight } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function Account({
  logout,
  account,
}: {
  logout: string;
  account: string;
}) {
  const [dir, setDir] = useState("ar");

  const [signOut] = useSignOutMutation();
  const route = useRouter();

  const dispatch = useDispatch();

  const auth = useSelector(stateAuth);

  const userData: any = GetCurrentUser();
  const currentUser: any = GetUser();

  const handleSignOut = async () => {
    await signOut(auth)
      .unwrap()
      .then(() => {
        toast.success("Sign Out Successfully");
        route.push("/");
        dispatch(onAuthStateFail());
      })
      .catch((error: any) => {
        toast.error("something wrong! try again");
      });
  };

  useEffect(() => {
    if (document.dir === "ltr") {
      setDir("en");
    } else {
      setDir("ar");
    }

    if (!auth) {
      route.push(`/${dir}/login`);
    }
  }, []);

  return (
    <section className="min-h-[80vh]">
      <div className="container mt-8 mx-auto px-3 sm:px-0 lg:w-[80%]">
        <h3 className="text-2xl font-bold font-inter">{account}</h3>
        <div className="mt-5 flex justify-between items-center w-full sm:w-1/2 bg-white border-2 border-gray-300 rounded-md px-4 py-3 duration-500 hover:shadow-md">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 xs:w-14 xs:h-14 flex items-center justify-center text-3xl text-black rounded-full uppercase  ">
              {userData?.photoURL === "" ? (
                <Image
                  src="/user.png"
                  alt="user"
                  width={70}
                  height={70}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={userData?.photoURL}
                  alt="user"
                  width={70}
                  height={70}
                  className="rounded-full"
                />
              )}
            </div>
            <div className="flex flex-col gap-1 font-inter">
              <h3 className="text-lg">{currentUser?.displayName}</h3>
              <p className="text-xs xs:text-sm text-gray-500">
                {currentUser?.email}
              </p>
              <div
                onClick={handleSignOut}
                className="flex items-center gap-1 cursor-pointer w-fit"
              >
                <span className="text-sm text-gray-500 ">
                  {dir === "en" ? <BsBoxArrowLeft /> : <BsBoxArrowRight />}
                </span>

                <span className="text-sm text-gray-600">{logout}</span>
              </div>
            </div>
          </div>
          <Link href="edit-account" className="text-red-500">
            <FaRegEdit />
          </Link>
        </div>
      </div>
    </section>
  );
}
