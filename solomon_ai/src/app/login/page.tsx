"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../styles/signup.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";


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

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
    });

    if (signInData?.error) {
      console.log("Logging sign in data errror", signInData.error);
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
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
    //     <div className="space-y-2">
    //       <FormField
    //         control={form.control}
    //         name="email"
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormLabel>Email</FormLabel>
    //             <FormControl>
    //               <Input placeholder="mail@example.com" {...field} />
    //             </FormControl>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //       <FormField
    //         control={form.control}
    //         name="password"
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormLabel>Password</FormLabel>
    //             <FormControl>
    //               <Input
    //                 type="password"
    //                 placeholder="Enter your password"
    //                 {...field}
    //               />
    //             </FormControl>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //     </div>
    //     <button type="submit" className={styles.login}>
    //       LOG IN
    //     </button>
    //   </form>
    //   <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
    //     or
    //   </div>
    //   <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
    //   <p className="text-center text-sm text-gray-600 mt-2">
    //     If you don&apos;t have an account, please&nbsp;
    //     <Link className="text-blue-500 hover:underline" href="/sign-up">
    //       Sign up
    //     </Link>
    //   </p>
    // </Form>
    <>
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
            style = {{color: "black"}}
            //   onSubmit={handleForm}
              className="w-3/4 flex items-center justify-center flex-col gap-4"
            >
              <div className="username-input w-full flex items-start flex-col gap-2">
                <label className="secondary-font font-light text-[1rem] lg:text-[1.25rem]">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData({ ...loginData, username: e.target.value })
                  }
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
                    type="password"
                    className="w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
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
                href="/Signup"
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