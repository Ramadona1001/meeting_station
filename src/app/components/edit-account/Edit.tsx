"use client";

import { db } from "@/firebase/firebaseConfig";
import { useUpdateUserProfileMutation } from "@/redux/services/auth/authApiServices";
import { stateAuth } from "@/redux/slice/authSlice";
import GetUser from "@/user/currentUser";
import { GetCurrentUser } from "@/user/getUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPhotoVideo } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface Props {
  edit: string;
  email: string;
  name: string;
  phone: string;
  country: string;
  photo: string;
  save: string;
  error: string;
}

export default function Edit_Account({
  edit,
  email,
  name,
  phone,
  country,
  photo,
  save,
  error,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const route = useRouter();
  const userData = GetCurrentUser();

  const auth = useSelector(stateAuth);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const currentUser = GetUser();

  const user: any = GetCurrentUser();

  const handleUpdate = async (data: any) => {
    const allData = {
      ...data,
      id: userData?.id,
      userData,
      currentUser,
    };

    await updateUserProfile(allData)
      .unwrap()
      .then(() => {
        toast.success("Account Updated Successfully");
        route.push("/");
      });
  };

  useEffect(() => {
    if (!auth) {
      route.push("/ar/login");
    }
  }, []);

  return (
    <section className="pt-10 font-inter">
      <div className="container mx-auto px-3 sm:px-0 lg:w-[80%] flex flex-col md:flex-row md:gap-20">
        <div>
          <h3 className="font-bold text-lg">{edit}</h3>
        </div>
        <div className="mt-10 card bg-white border-2 border-gray-300 w-full lg:w-[40%] px-3 py-8 rounded-md">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
              {user?.photoURL === "" ? (
                <Image
                  src="/user.png"
                  alt="user"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={user?.photoURL}
                  alt="user"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              )}
            </div>
            <div>
              <p>{userData?.displayName}</p>
              <p className="text-gray-500">{userData?.email}</p>
            </div>
          </div>
          <form className="mt-8" onSubmit={handleSubmit(handleUpdate)}>
            <div className="flex flex-col gap-2">
              <h3>{photo} </h3>
              <div className="border-2 border-red-500 outline-none px-3 py-1 rounded-md text-gray-500 select-none flex justify-center">
                <label htmlFor="file" className="text-3xl">
                  <FaPhotoVideo />
                </label>
                <input
                  {...register("file")}
                  type="file"
                  id="file"
                  className="hidden"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="email">{email}</label>
              <input
                {...register("email")}
                type="text"
                className="border-2 border-red-500 outline-none px-3 py-1 rounded-md text-gray-500 cursor-not-allowed select-none"
                value={userData?.email}
                disabled
              />
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="name">{name}</label>
              <input
                {...register("name", { required: true })}
                placeholder={userData?.displayName}
                type="text"
                className="border-2 border-red-500 outline-none px-3 py-1 rounded-md resize-none"
              />

              {errors.name && (
                <small className="text-red-500 text-sm">{error}</small>
              )}
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="country">{country}</label>
              <textarea
                {...register("country")}
                value={"Saudi Arabia"}
                cols={1}
                rows={1}
                disabled
                className="border-2 border-red-500 outline-none px-3 py-1 rounded-md resize-none cursor-not-allowed text-gray-500"
              ></textarea>
            </div>

            <button className="w-full mt-5 bg-blue-500  py-2 rounded-md text-white duration-500 hover:bg-blue-700">
              {save}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
