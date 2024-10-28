"use client";
import { auth } from "@/firebase/firebaseConfig";
import {
  useSignInMutation,
  useSignInWithFacebookMutation,
  useSignInWithGoogleMutation,
} from "@/redux/services/auth/authApiServices";
import { onAuthStateSuccess } from "@/redux/slice/authSlice";
import { handleFirebaseAuthErrors } from "@/utility/firebaseError";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaApple,
  FaEye,
  FaFacebook,
  FaGoogle,
  FaHandPeace,
  FaRegEyeSlash,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface Props {
  welcome: string;
  email: string;
  password: string;
  login: string;
  other: string;
  have: string;
  dont: string;
  createAccount: string;
  forget: string;
}
export default function Login({
  welcome,
  email,
  password,
  login,
  other,
  have,
  dont,
  createAccount,
  forget,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [showPassword, setShowPassword] = useState(false);

  const [signIn] = useSignInMutation();
  const [signInWithGoogle] = useSignInWithGoogleMutation();
  const [signInWithFacebook] = useSignInWithFacebookMutation();
  const route = useRouter();

  const dispatch = useDispatch();

  const handleLogin = async (data: any) => {
    await signIn(data)
      .unwrap()
      .then(() => {
        toast.success("Login Successfully");
        route.push("/");
        dispatch(onAuthStateSuccess());
      })
      .catch(() => {
        toast.error("Something Wrong! try again");
      });
  };

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle(auth)
      .unwrap()
      .then(() => {
        toast.success("Sign In Successfully");
        route.push("/");
        dispatch(onAuthStateSuccess());
      })
      .catch((error) => {
        handleFirebaseAuthErrors(error);
      });
  };
  const handleSignInWithFacebook = async () => {
    await signInWithFacebook(auth)
      .unwrap()
      .then(() => {
        toast.success("Sign In Successfully");
        route.push("/");
        dispatch(onAuthStateSuccess());
      })
      .catch((error) => {
        handleFirebaseAuthErrors(error);
      });
  };

  return (
    <section>
      <div className="container px-3 sm:px-0 mx-auto lg:w-[80%] min-h-screen flex flex-col md:flex-row justify-between items-center">
        <div className="w-full sm:w-1/2">
          <Image src="/login.png" alt="login" width={400} height={400} />
        </div>
        <div className="w-full sm:w-1/2 pb-5">
          <h3 className="text-center text-lg font-bold font-inter">{login}</h3>
          <div className="flex items-center gap-2 mt-5">
            <span className="text-lg font-inter">{welcome}</span>
            <span className="text-orange-500">
              <FaHandPeace />
            </span>
          </div>

          <form className="mt-8" onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="email" className="text-sm">
                {email} <span className="text-red-500">*</span>
              </label>
              <input
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.com)+$/,
                    message: "Enter Valid Email",
                  },
                })}
                id="email"
                type="text"
                className={`outline-none border-2 rounded-md px-2 py-2 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="jane@gmail.com"
              />
            </div>

            <div className="flex flex-col gap-2 mt-5 relative">
              <label htmlFor="password" className="text-sm">
                {password} <span className="text-red-500">*</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                })}
                id="password"
                type={showPassword ? "text" : "password"}
                className={`outline-none border-2 rounded-md px-2 py-2 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="*************"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2/3 -translate-y-1/2 rtl:left-5 ltr:right-5 cursor-pointer text-xl"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="mt-3 text-xs text-teal-500 underline underline-offset-2">
              <Link href="reset-password">{forget}</Link>
            </div>

            <button className="w-full py-2 rounded-md text-white bg-teal-500 mt-5 duration-500 hover:bg-teal-800">
              {login}
            </button>
          </form>

          <div className="relative">
            <span className="w-full h-[2px] bg-gray-300 absolute top-5"></span>
            <span className="absolute top-2 bg-white left-1/2 -translate-x-1/2">
              {other}
            </span>
          </div>

          <div className="flex items-center flex-col xs:flex-row gap-4 mt-14">
            <div
              onClick={handleSignInWithGoogle}
              className="flex items-center justify-center gap-2 border-2 border-gray-300 w-full py-2 rounded-md cursor-pointer"
            >
              <span className="text-lg text-blue-500">
                <FaGoogle />
              </span>
              <span className="text-sm font-inter tracking-wide">Google</span>
            </div>
            <div
              onClick={handleSignInWithFacebook}
              className="flex items-center justify-center gap-2 border-2 border-gray-300 w-full py-2 rounded-md cursor-pointer"
            >
              <span className="text-lg text-blue-500">
                <FaFacebook />
              </span>
              <span className="text-sm font-inter tracking-wide">Facebook</span>
            </div>
          </div>

          <div className="mt-5 text-center text-sm font-inter flex gap-1 items-center justify-center">
            <span>{dont}</span>
            <Link
              href={"sign-up"}
              className="text-teal-500 font-bold underline underline-offset-2"
            >
              {createAccount}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
