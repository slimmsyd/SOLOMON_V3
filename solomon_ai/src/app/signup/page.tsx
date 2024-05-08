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
    console.log("This submit was sent")
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
      const errorData = await response.text();  // or response.json() if the server responds with JSON
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              style={{ color: "black" }}
              //   onSubmit={handleForm}
              className="w-3/4 flex items-center justify-center flex-col gap-4"
            >
              <div className="username-input w-full flex items-start flex-col gap-2">
                <label className="secondary-font font-light text-[1rem] lg:text-[1.25rem]">
                  Username*
                </label>
                <input
                 {...register('username')} 
                  type="text"
                  className="w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none"
                  value={signupData.username}
                  
                  onChange={(e) =>
                    setSignupData({ ...signupData, username: e.target.value })
                  }
                  placeholder="Enter a username"
                  required
                />
              </div>
              <div className="email-input w-full flex items-start flex-col gap-2">
                <label className="secondary-font font-light text-[1rem] lg:text-[1.25rem]">
                  Email*
                </label>
                <input
                {...register('email')}
                  type="email"
                  className="w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  placeholder="Enter a email address"
                  required
                />
              </div>
              <div className="password-input w-full flex items-start flex-col gap-2">
                <label className="secondary-font font-light text-[1rem] lg:text-[1.25rem]">
                  Password*
                </label>
                <input
                {...register('password')}
                  type="password"
                  className="w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  placeholder="Enter a password"
                  required
                />
                <p
                  className={
                    signupData.passwordsMatch
                      ? "secondary-font font-light text-[1rem] text-red-500"
                      : "secondary-font font-light text-[1rem] text-gray-400"
                  }
                >
                  {signupData.passwordsMatch
                    ? "Passwords do not match"
                    : " Must be at least 8 characters."}
                </p>
              </div>
              <div className="confirm-password-input w-full flex items-start flex-col gap-2">
                <label className="secondary-font font-light text-[1rem] lg:text-[1.25rem]">
                  Confirm password*
                </label>
                <input
                {...register('confirmPassword')}
                  type="password"
                  className="w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none"
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
              <button
                type="submit"
                className="p-4 w-full secondary-font font-light text-[1rem] text-white bg-[rgba(0,0,0,.85)] border border-[rgba(0,0,0,.5)] rounded-lg"
              >
                Create an account
              </button>
            </form>
            <hr className="w-3/4 h-[1px] bg-[rgba(0,0,0,.1)]" />
            <p className="secondary-font font-light text-[1rem] text-gray-500">
              Already have an account?{" "}
              <Link
                href="/Login"
                className="text-black underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
          {/* <figure className="hidden w-full h-full items-center justify-center lg:flex">
            <Image
              src="/assets/studio-image.png"
              width={1200}
              height={1200}
              alt="Login image"
              className="object-cover"
            />
          </figure> */}
        </div>
      </div>
    </>
  );
};

export default Signup;
