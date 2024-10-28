"use client";
import { auth, db, provider } from "@/firebase/firebaseConfig";
import {
  useSignInWithFacebookMutation,
  useSignInWithGoogleMutation,
  useSignUpNewUserMutation,
} from "@/redux/services/auth/authApiServices";
import { onAuthStateSuccess } from "@/redux/slice/authSlice";
import { handleFirebaseAuthErrors } from "@/utility/firebaseError";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaHandPeace,
  FaEye,
  FaRegEyeSlash,
  FaApple,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { postData } from "@/fetchData";

import { GetCurrentUser } from "@/user/getUser";

interface Props {
  newUser: string;
  welcome: string;
  first: string;
  last: string;
  email: string;
  password: string;
  rePassword: string;
  you: string;
  foundation: string;
  user: string;
  login: string;
  other: string;
  have: string;
}

export default function SignUp({
  newUser,
  welcome,
  first,
  last,
  email,
  password,
  rePassword,
  you,
  foundation,
  user,
  login,
  other,
  have,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [matchPass, setMatchPass] = useState(true);

  const [checked, setChecked] = useState(user);
  const [checkedUser, setCheckedUser] = useState("user");
  const [dir, setDir] = useState("ar");
  const [signUpNewUser] = useSignUpNewUserMutation();
  const [signInWithGoogle] = useSignInWithGoogleMutation();
  const [signInWithFacebook] = useSignInWithFacebookMutation();
  const [isVender, setIsVender] = useState(false);

  const route = useRouter();
  const dispatch = useDispatch();
  const handleMatchPass = (e: any) => {
    if (e.target.value === currentPass) {
      setMatchPass(true);
    } else {
      setMatchPass(false);
    }
  };

  const handleCreateNewAccount = async (userData: any) => {
    const { firstName, lastName, email, password } = userData;

    const data = {
      firstName,
      lastName,
      email,
      password,
      checkedUser,
      isVender,
    };

    if (matchPass) {
      await signUpNewUser(data)
        .unwrap()
        .then(async (data) => {
          if (checkedUser == "vender") {
            submitVendor(data);
          }
          toast.success("Account Created Successfully");
          reset();
          route.push(`/${dir}/login`);
        });
    }
  };

  const submitVendor = async (data: any) => {
    const allData: any = {
      name: data.displayName,
    };
    const response = await postData("/vendor/register", data);
    console.log(response);
    if (response.errors) {
      toast.error(response.message);
    } else {
      if (response.data == "success") {
        console.log("success");
      } else {
        toast.error(
          "some thing went wrong please try again later and contact us"
        );
      }
    }
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

  useEffect(() => {
    if (document.dir === "rtl") {
      setDir("ar");
    } else {
      setDir("en");
    }
  }, []);

  return (
    <section>
      <div className="container px-3 sm:px-0 mx-auto lg:w-[80%] min-h-screen flex flex-col md:flex-row justify-between items-center">
        <div className="w-full sm:w-1/2">
          <Image src="/sign-up.png" alt="login" width={800} height={400} />
        </div>
        <div className="w-full sm:w-1/2 pb-5">
          <h3 className="text-center text-lg font-bold font-inter">
            {newUser}
          </h3>
          <div className="flex items-center gap-2 mt-5">
            <span className="text-lg font-inter">{welcome}</span>
            <span className="text-orange-500">
              <FaHandPeace />
            </span>
          </div>

          <form
            className="mt-8"
            onSubmit={handleSubmit(handleCreateNewAccount)}
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label htmlFor="first" className="text-sm">
                  {first} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("firstName", { required: true })}
                  id="first"
                  type="text"
                  className={`outline-none border-2 rounded-md px-2 py-1 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="jane"
                />
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label htmlFor="last" className="text-sm">
                  {last} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("lastName", { required: true })}
                  id="last"
                  type="text"
                  className={`outline-none border-2 rounded-md px-2 py-1 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="jane"
                />
              </div>
            </div>

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
                  minLength: 8,
                })}
                onChange={(e) => setCurrentPass(e.target.value)}
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

            <div className="flex flex-col gap-2 mt-5 relative">
              <label htmlFor="rePassword" className="text-sm">
                {rePassword} <span className="text-red-500">*</span>
              </label>
              <input
                onChange={handleMatchPass}
                id="rePassword"
                type={showRePassword ? "text" : "password"}
                className={`outline-none border-2 rounded-md px-2 py-2 ${
                  matchPass ? "border-gray-300" : "border-red-500"
                }`}
                placeholder="*************"
              />
              <div
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute top-2/3 -translate-y-1/2 rtl:left-5 ltr:right-5 cursor-pointer text-xl"
              >
                {showRePassword ? <FaRegEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="mt-5 flex justify-between items-center">
              <span className="font-inter text-sm">{you}</span>
              <div className="flex items-center gap-2">
                <div
                  onClick={() => {
                    setChecked(foundation);
                    setCheckedUser("vender");
                    setIsVender(true);
                  }}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 border-gray-300 relative ${
                      checked === foundation && "bg-teal-500"
                    }`}
                  >
                    {checked === foundation && (
                      <span
                        className={
                          "w-[5px] h-[5px] bg-gray-200 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        }
                      ></span>
                    )}
                  </span>
                  <span>{foundation}</span>
                </div>
                <div
                  onClick={() => {
                    setChecked(user);
                    setCheckedUser("user");
                    setIsVender(false);
                  }}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 border-gray-300 relative ${
                      checked === user && "bg-teal-500"
                    }`}
                  >
                    {checked === user && (
                      <span
                        className={
                          "w-[5px] h-[5px] bg-gray-200 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        }
                      ></span>
                    )}
                  </span>
                  <span>{user}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center flex-col xs:flex-row gap-4 mt-5">
              <div
                onClick={handleSignInWithGoogle}
                className="flex items-center justify-center gap-2 border-2 border-gray-300 w-full py-2 rounded-md cursor-pointer"
              >
                <span className="text-lg text-blue-500">
                  <FaGoogle />
                </span>
                <span className="text-sm font-inter tracking-wide">Google</span>
              </div>
              <div className="flex items-center justify-center gap-2 border-2 border-gray-300 w-full py-2 rounded-md cursor-pointer">
                <span className="text-lg text-blue-500">
                  <FaFacebook />
                </span>
                <span className="text-sm font-inter tracking-wide">
                  Facebook
                </span>
              </div>
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

          <div className="mt-14 text-center text-sm font-inter flex gap-1 items-center justify-center">
            <span>{have}</span>
            <Link
              href={"login"}
              className="text-teal-500 font-bold underline underline-offset-2"
            >
              {login}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
