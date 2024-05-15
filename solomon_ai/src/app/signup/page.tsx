"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/signup.module.css";
import StudioImage from "../../public/assets/studio-image.png";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import NavComponent from "../navigation/navComponent";

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(1, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const Signup = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { register, handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log("This submit was sent");
    const response = await fetch("api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      console.log("Logging the values", values);
      router.push("/chat");
    } else {
      console.log("Logging the values", values);
      console.error("Registration failed", response);
    }
    if (!response.ok) {
      console.log("Logging the values", values);
      const errorData = await response.text(); // or response.json() if the server responds with JSON
      console.error("Registration failed with response:", errorData);
    }
  };

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    passwordsMatch: false,
  });

  return (
    <>
      <main className="bodyWrapper">
        <NavComponent />
        <div className="site-container w-full h-full flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full flex items-center justify-center flex-col gap-4">
              <div className="w-3/4 flex items-center justify-center flex-col text-center gap-2">
                <h1 className="w-full primary-font font-thin text-[2.5rem] lg:text-[3rem]">
                  Let's Get You <span className="font-medium">Started</span>
                </h1>
                <p className="secondary-font font-light text-[1rem] text-gray-400 lg:text-[1.25rem]">
                  Enter your credentials below to begin
                </p>
              </div>

              <div className="loginForm text-white flex items-center justify-center flex-col">
                <div className="logoCircle"></div>

                <h3>Create Your Free Account</h3>

                <button
                  onClick={() => signIn("google")}
                  className="googleForm w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none flex items-center justify-center gap-3 my-6"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1941_23972)">
                      <path
                        d="M23.7643 12.2763C23.7643 11.4605 23.6982 10.6404 23.5571 9.83789H12.2383V14.4589H18.72C18.451 15.9492 17.5868 17.2676 16.3213 18.1054V21.1037H20.1883C22.4591 19.0137 23.7643 15.9272 23.7643 12.2763Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.2391 24.0013C15.4756 24.0013 18.205 22.9387 20.1936 21.1044L16.3266 18.106C15.2507 18.838 13.8618 19.2525 12.2435 19.2525C9.11291 19.2525 6.45849 17.1404 5.50607 14.3008H1.51562V17.3917C3.55274 21.4439 7.70192 24.0013 12.2391 24.0013Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.50082 14.3007C4.99816 12.8103 4.99816 11.1965 5.50082 9.70618V6.61523H1.51478C-0.187219 10.006 -0.187219 14.0009 1.51478 17.3916L5.50082 14.3007Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M12.2391 4.74966C13.9499 4.7232 15.6034 5.36697 16.8425 6.54867L20.2685 3.12262C18.0991 1.0855 15.2198 -0.034466 12.2391 0.000808666C7.70192 0.000808666 3.55274 2.55822 1.51562 6.61481L5.50166 9.70575C6.44967 6.86173 9.1085 4.74966 12.2391 4.74966Z"
                        fill="#EA4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1941_23972">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Sign in with google
                </button>

                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  style={{ color: "black" }}
                  //   onSubmit={handleForm}
                  className="w-full flex items-center justify-start flex-col gap-4 my-6  "
                >
                  <div className="flex text-white flex-row gap-3 align-center items-center justify-center">
                    <hr className="loginDivider"></hr>
                    <p>Or</p>
                    <hr className="loginDivider"></hr>
                  </div>

                  <div className="username-input w-full flex items-start flex-col gap-2">
               

                    <div className="w-full relative">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#505050"
                        className="icon-md inputIcon"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z"
                          fill="#505050"
                        ></path>
                        <path
                          d="M4.5 21C4.5 17.7804 6.82883 15.0685 10 14.2516"
                          stroke="#505050"
                          stroke-width="2"
                          stroke-linecap="round"
                        ></path>
                        <circle
                          cx="15.625"
                          cy="15.625"
                          r="1.625"
                          fill="#505050"
                        ></circle>
                        <circle
                          cx="20.125"
                          cy="15.625"
                          r="1.625"
                          fill="#505050"
                        ></circle>
                        <circle
                          cx="20.125"
                          cy="20.125"
                          r="1.625"
                          fill="#505050"
                        ></circle>
                        <circle
                          cx="15.625"
                          cy="20.125"
                          r="1.625"
                          fill="#505050"
                        ></circle>
                      </svg>

                      <input
                        {...register("username")}
                        type="text"
                        className="w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none formInput"
                        value={signupData.username}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            username: e.target.value,
                          })
                        }
                        placeholder="Enter a username"
                        required
                      />
                    </div>
                  </div>
                  <div className="email-input w-full flex items-start flex-col gap-2">
                    {/* <label className="secondary-font font-light text-[1rem] lg:text-[1.25rem]">
                    Email*
                  </label> */}

                    <div className="w-full relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="#505050"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className=" text-gray-500 inputIcon "
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="m3 8 7.8906 5.2604c.6718.4479 1.547.4479 2.2188 0L21 8M5 19h14c1.1046 0 2-.8954 2-2V7c0-1.10457-.8954-2-2-2H5c-1.10457 0-2 .89543-2 2v10c0 1.1046.89543 2 2 2Z"
                        ></path>
                      </svg>

                      <input
                        {...register("email")}
                        type="email"
                        className="w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none formInput"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            email: e.target.value,
                          })
                        }
                        placeholder="Enter a email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="password-input w-full flex items-start flex-col gap-2">
                    {/* <label className="secondary-font font-light text-[1rem] lg:text-[1.25rem]">
                    Password*
                  </label> */}

                    <p
                      className={
                        signupData.passwordsMatch
                          ? "secondary-font font-light text-[16px] text-red-500"
                          : "secondary-font font-light text-[16px] text-gray-400"
                      }
                    >
                      {signupData.passwordsMatch
                        ? "Passwords do not match"
                        : " Must be at least 8 characters."}
                    </p>

                    <div className="w-full relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#505050"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="inputIcon"
                        aria-hidden="true"
                      >
                        <path d="M16 11v.75h.75V11H16Zm-8 0h-.75v.75H8V11Zm4.75 4c0-.4142-.3358-.75-.75-.75s-.75.3358-.75.75h1.5Zm-1.5 2c0 .4142.3358.75.75.75s.75-.3358.75-.75h-1.5ZM6 11.75h12v-1.5H6v1.5ZM19.25 13v6h1.5v-6h-1.5ZM18 20.25H6v1.5h12v-1.5ZM4.75 19v-6h-1.5v6h1.5ZM6 20.25c-.69036 0-1.25-.5596-1.25-1.25h-1.5c0 1.5188 1.23122 2.75 2.75 2.75v-1.5ZM19.25 19c0 .6904-.5596 1.25-1.25 1.25v1.5c1.5188 0 2.75-1.2312 2.75-2.75h-1.5ZM18 11.75c.6904 0 1.25.5596 1.25 1.25h1.5c0-1.5188-1.2312-2.75-2.75-2.75v1.5Zm-12-1.5c-1.51878 0-2.75 1.2312-2.75 2.75h1.5c0-.6904.55964-1.25 1.25-1.25v-1.5ZM15.25 7v4h1.5V7h-1.5Zm.75 3.25H8v1.5h8v-1.5ZM8.75 11V7h-1.5v4h1.5ZM12 3.75c1.7949 0 3.25 1.45507 3.25 3.25h1.5c0-2.62335-2.1266-4.75-4.75-4.75v1.5Zm0-1.5C9.37665 2.25 7.25 4.37665 7.25 7h1.5c0-1.79493 1.4551-3.25 3.25-3.25v-1.5ZM11.25 15v2h1.5v-2h-1.5Z"></path>
                      </svg>

                      <input
                        {...register("password")}
                        type="password"
                        className="w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none formInput"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        placeholder="Enter a password"
                        required
                      />
                    </div>
                  </div>
                  <div className="confirm-password-input w-full flex items-start flex-col gap-2">
                    {/* <label className="secondary-font font-light text-[1rem] lg:text-[1.25rem]">
                    Confirm password*
                  </label> */}

                    <div className="w-full relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#505050"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="inputIcon"
                        aria-hidden="true"
                      >
                        <path d="M16 11v.75h.75V11H16Zm-8 0h-.75v.75H8V11Zm4.75 4c0-.4142-.3358-.75-.75-.75s-.75.3358-.75.75h1.5Zm-1.5 2c0 .4142.3358.75.75.75s.75-.3358.75-.75h-1.5ZM6 11.75h12v-1.5H6v1.5ZM19.25 13v6h1.5v-6h-1.5ZM18 20.25H6v1.5h12v-1.5ZM4.75 19v-6h-1.5v6h1.5ZM6 20.25c-.69036 0-1.25-.5596-1.25-1.25h-1.5c0 1.5188 1.23122 2.75 2.75 2.75v-1.5ZM19.25 19c0 .6904-.5596 1.25-1.25 1.25v1.5c1.5188 0 2.75-1.2312 2.75-2.75h-1.5ZM18 11.75c.6904 0 1.25.5596 1.25 1.25h1.5c0-1.5188-1.2312-2.75-2.75-2.75v1.5Zm-12-1.5c-1.51878 0-2.75 1.2312-2.75 2.75h1.5c0-.6904.55964-1.25 1.25-1.25v-1.5ZM15.25 7v4h1.5V7h-1.5Zm.75 3.25H8v1.5h8v-1.5ZM8.75 11V7h-1.5v4h1.5ZM12 3.75c1.7949 0 3.25 1.45507 3.25 3.25h1.5c0-2.62335-2.1266-4.75-4.75-4.75v1.5Zm0-1.5C9.37665 2.25 7.25 4.37665 7.25 7h1.5c0-1.79493 1.4551-3.25 3.25-3.25v-1.5ZM11.25 15v2h1.5v-2h-1.5Z"></path>
                      </svg>

                      <input
                        {...register("confirmPassword")}
                        type="password"
                        className="w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none formInput"
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="p-4 w-full secondary-font  text-[1rem] text-black bg-white border border-[rgba(0,0,0,.5)] rounded-lg abc-diatype-Medium formBtn "
                  >
                    Create an account
                  </button>

                  <p className="secondary-font font-light text-[1rem] text-gray-500">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-white  cursor-pointer text-left text-sm self-end"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
