"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  verEmail: string;
  check: string;
  received: string;
  otpCode: string;
  verification: string;
}

export default function Verify({
  verEmail,
  check,
  received,
  otpCode,
  verification,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const router = useRouter();

  const handleOtp = (otp: any) => {
    console.log(otp);
    router.push("change-password");
  };

  return (
    <section>
      <div className="container px-3 sm:px-0 mx-auto sm:w-1/2 lg:w-1/4 min-h-screen flex flex-col justify-center gap-5">
        <div>
          <Image
            src="/Enter OTP-amico 1.png"
            alt="forget"
            width={200}
            height={200}
            className="m-auto"
          />
          <h3 className="text-center font-inter text-sm font-bold">{check}</h3>
          <div className="text-center mt-3 text-gray-500 text-xs flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">{received}</span>
              <span className="font-bold">{verEmail}</span>
            </div>
          </div>

          <form className="mt-8" onSubmit={handleSubmit(handleOtp)}>
            <div className="flex flex-col gap-2">
              <label htmlFor="otp" className="text-xs text-gray-400">
                {otpCode}
              </label>
              <input
                {...register("otp", {
                  required: true,
                })}
                id="otp"
                type="text"
                className={`outline-none border-2 rounded-md px-2 py-2 ${
                  errors.otp ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter code here"
              />
            </div>

            <button className="bg-teal-500 text-white w-full py-1 rounded-md mt-5">
              {verification}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
