"use client";
import { useChangeNewPassMutation } from "@/redux/services/auth/authApiServices";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

interface Props {
  reset: string;
  verPass: string;
  password: string;
  rePassword: string;
  save: string;
}

export default function ChangePass({
  reset,
  verPass,
  password,
  rePassword,
  save,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [showPassword, setShowPassword] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [currentPass, setCurrentPass] = useState("");

  const [changeNewPass] = useChangeNewPassMutation();

  const [match, setMatch] = useState(true);

  const router = useRouter();

  const handleMatchPass = (e: any) => {
    if (e.target.value === currentPass) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  };

  const handleChangePassword = async (pass: any) => {
    if (match) {
      await changeNewPass(pass)
        .unwrap()
        .then(() => {
          toast.success("password reset successfully");
          router.push("/ar/login");
        });
    }
  };

  return (
    <section>
      <div className="container px-3 sm:px-0 mx-auto sm:w-1/2 lg:w-1/4 min-h-screen flex flex-col justify-center gap-5">
        <div>
          <Image
            src="/Add New Pass.png"
            alt="pass "
            width={200}
            height={200}
            className="m-auto"
          />
          <h3 className="text-center font-inter text-sm font-bold">{reset}</h3>
          <div className="text-center mt-3 text-gray-500 text-xs flex flex-col gap-1">
            <p>{verPass}</p>
          </div>

          <form className="mt-8" onSubmit={handleSubmit(handleChangePassword)}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 mt-5 relative">
                <label htmlFor="password" className="text-sm">
                  {password} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("password", {
                    required: true,
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
                  id="rePassword"
                  onChange={handleMatchPass}
                  type={showRePass ? "text" : "password"}
                  className={`outline-none border-2 rounded-md px-2 py-2 ${
                    match ? "border-gray-300" : "border-red-500"
                  }`}
                  placeholder="*************"
                />
                <div
                  onClick={() => setShowRePass(!showRePass)}
                  className="absolute top-2/3 -translate-y-1/2 rtl:left-5 ltr:right-5 cursor-pointer text-xl"
                >
                  {showRePass ? <FaRegEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button className="bg-teal-500 text-white w-full py-1 rounded-md mt-5">
              {save}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
