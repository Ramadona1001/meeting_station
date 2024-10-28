"use client";
import { useForgetPassMutation } from "@/redux/services/auth/authApiServices";
import { handleFirebaseAuthErrors } from "@/utility/firebaseError";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  remember: string;
  msg: string;
  otp: string;
  email: string;
  continueResetPass: string;
  remembered: string;
  login: string;
}
export default function Reset({
  remember,
  msg,
  otp,
  email,
  continueResetPass,
  remembered,
  login,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const router = useRouter();

  const [con, setCon] = useState(false);
  const [mail, setMail] = useState("");
  const [dir, setDir] = useState("ar");

  const [forgetPass] = useForgetPassMutation();

  const handleReset = async (email: any) => {
    await forgetPass(email)
      .unwrap()
      .then(() => {
        toast.info("check your email to change new password");
        router.push(`/${dir}/login`);
      }).catch((error)=> {
       handleFirebaseAuthErrors(error)
      })
  };

  useEffect(() => {
    if (document.dir === "ltr") {
      setDir("en");
    } else {
      setDir("ar");
    }
  }, []);

  return (
    <section>
      <div className="container px-3 sm:px-0 mx-auto sm:w-1/2 lg:w-1/4 min-h-screen flex flex-col justify-center gap-5">
        <div>
          <Image
            src="/Forgot password-bro 1.png"
            alt="forget"
            width={200}
            height={200}
            className="m-auto"
          />
          <h3 className="text-center font-inter text-sm font-bold">
            {remember}
          </h3>
          <div className="text-center mt-3 text-gray-500 text-xs flex flex-col gap-1">
            <p>{msg}</p>
            <p>{otp}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleReset)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs text-gray-400">
              {email}
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.com)+$/,
                  message: "Enter Valid Email",
                },
              })}
              onChange={(e) => setMail(e.target.value)}
              id="email"
              type="text"
              className={`outline-none border-2 rounded-md px-2 py-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="jane@gmail.com"
            />
          </div>

          <div className="mt-5">
            {con ? (
              <button className="w-full bg-teal-500 py-1 rounded-lg text-white duration-500 hover:bg-teal-700">
                <Link
                  href={{
                    pathname: "verify",
                    query: {
                      email: mail,
                    },
                  }}
                >
                  {continueResetPass}
                </Link>
              </button>
            ) : (
              <button className="w-full bg-teal-500 py-1 rounded-lg text-white duration-500 hover:bg-teal-700">
                {continueResetPass}
              </button>
            )}
            <div className="mt-2 text-xs text-center flex gap-1 justify-center text-gray-500">
              <span>{remembered}</span>
              <Link href="login" className="text-teal-500">
                {login}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
