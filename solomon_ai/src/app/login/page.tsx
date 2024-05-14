"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import NavComponent from "../navigation/navComponent";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(1, "Password must have than 8 characters"),
});

const Login = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/chat/dashboard",
      redirect: true,
    });

    if (signInData?.error) {
      console.log("Logging sign in data errror", signInData.error);
    } else {
      console.log("Sign in was successful!");
    }

    console.log(values);
  };

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  //   function handleForm(e) {
  //     e.preventDefault();

  //     console.log("Logging Login Credentials", loginData);
  //     setLoginData({ ...loginData, username: "", password: "" });
  //   }

  return (
    <>
      <NavComponent />
      <div className="site-container w-full h-full flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center flex-col gap-4">
            <div className="w-3/4 flex items-center justify-center flex-col text-center gap-2">
              <h1 className="w-full primary-font font-thin text-[2.5rem] lg:text-[3rem]">
                Enter the Gateway to{" "}
                <span className="font-medium">Enlightenment.</span>
              </h1>
              <p className="secondary-font font-light text-[1rem] text-gray-400 lg:text-[1.25rem]">
                Choose one of the options to login
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
                  Username
                </label>
                <input
                  {...register("email")}
                  type="text"
                  className="w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="password-input w-full flex items-start flex-col gap-2">
                <label className="secondary-font font-light text-[1rem] lg:text-[1.25rem]">
                  Password
                </label>
                <div className="w-full flex items-start flex-col gap-4">
                  <input
                    {...register("password")}
                    type="password"
                    className="w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none"
                    placeholder="Enter your password"
                    required
                  />
                  <div className="w-full flex items-start flex-col gap-2">
                    <button
                      type="submit"
                      className="p-4 w-full secondary-font font-light text-[1rem] text-white bg-[rgba(0,0,0,.85)] border border-[rgba(0,0,0,.5)] rounded-lg"
                    >
                      Login
                    </button>
                    <button className="p-4 w-full secondary-font font-light text-[1rem] border border-[rgba(0,0,0,.5)] rounded-lg">
                      Sign in with Google
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <hr className="w-3/4 h-[1px] bg-[rgba(0,0,0,.1)]" />
            <p className="secondary-font font-light text-[1rem] text-gray-500">
              Don't have an account yet?{" "}
              <Link
                href="/signup"
                className="text-black underline cursor-pointer"
              >
                Sign up
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

export default Login;
