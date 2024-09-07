"use client";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import NavComponent from "../navigation/navComponent";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { checkSession } from "@/utilis/CheckSession";

import axios from "axios";

import LoadingComponent from "../components/helper/Loading";
import { debug } from "console";
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
      // callbackUrl: "/chat/questionaire",
      redirect: true,
    });

    if (signInData?.error) {
      console.log("Logging sign in data errror", signInData.error);
    } else {
      console.log("Sign in was successful!");
    }

    console.log(values);
  };

  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false); // Track login initiation
  const [isLoading, setIsLoading] = useState<boolean>(false); // Track loading state for redirection
  const [completedForm, setCompletedForm] = useState<boolean | null>(null); // null means not determined yet

  useEffect(() => {
    const fetchProgress = async (userId: string) => {
      try {
        const response = await axios.get(`/api/getProgress`, {
          params: { userId },
        });

        if (response.data) {
          if (response.data.onComplete) {
            console.log("Logging the response data", response.data);
            setCompletedForm(true);
            router.push("/chat/app");
          } else {
            setCompletedForm(false);
          }
        } else {
          setCompletedForm(false);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
        setCompletedForm(false);
      }
    };

    if (status === "authenticated" && session?.user?.id) {
      const userId = session.user.id;
      fetchProgress(userId);
      getSubscriptionID();
    } else if (status === "unauthenticated") {
      setIsLoggingIn(false); // Reset logging in state if authentication fails
    }


    
  }, [session, completedForm]);

  //We are goging to fetch the userProgess on the rendering of this
  //If user Progres is True we are going to switch the redirect of the page

  const [subcriptionSessionID, setSubscriptionSessionID] = useState<string>("");

  

  const getSubscriptionID = async () => {
    try {
   
      const res = await fetch("/api/get-subscription-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user.id }),
      });
      const data = await res.json();

      setSubscriptionSessionID(data.paymentIntentId);

 
    } catch (error) {
      console.error("Error fetching subscription ID:", error);
    }
  };
  useEffect(() => {}, [subcriptionSessionID]);


  useEffect(() => {
    if (completedForm !== null) {
      setIsLoading(true);
      if (status === "authenticated" && completedForm) {
        router.push("/chat/app");
      } else if (subcriptionSessionID ) {
    
        router.push("/chat/app");
      } else if (status === "authenticated" && completedForm === false) {
        // router.push('/chat/app/questionaire'); // Previous redirect
        
        console.log("Logging the session ", session)
        console.log("Logging the current state of status", status)
        console.log("Logging the compelte form", completedForm)
        // debugger
        router.push("/chat/signup");
      }
    }
  }, [completedForm, status, router]);

  useEffect(() => {}, [isLoggingIn]);

  const handleSignIn = () => {
    setIsLoggingIn(true); // Set logging in state to true when login is initiated

    if (completedForm) {
      signIn("google", {
        callbackUrl: "/redirect",
      });
    } else {
      signIn("google", {
        callbackUrl: "/redirect",
      });
    }
  };
  useEffect(() => {
    if (completedForm !== null) {
      if (status === "authenticated" && completedForm) {
        console.log("Logging completed form", completedForm);
        // router.push("/chat/app");
      } else if (subcriptionSessionID !== null) {
        // router.push("/chat/app");
      } else if (status === "authenticated" && completedForm === false) {
        router.push("/chat/signup");
      }
    }
  }, [completedForm, status, router]);

  if (isLoading) {
    return <LoadingComponent />; // Show loading spinner if logging in or redirecting
  }

  return (
    <>
      <main className="bodyWrapper">
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
              <div className="loginForm text-white flex items-center justify-center flex-col mt-8">
                <div className="logoCircle"></div>

                <h3>Create Your Free Account</h3>

                {status === "authenticated" && completedForm ? (
                  <button
                    onClick={() => {
                      console.log("Completed Form: On Click", completedForm);
                      handleSignIn();
                    }}
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
                ) : (
                  <button
                    onClick={() => {
                      console.log("Completed Form: On Click", completedForm);
                      handleSignIn();
                    }}
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
                )}
                {/* 
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  style={{ color: "black" }}
                  className="w-full flex items-center justify-start flex-col gap-4 my-6 text-white  "
                >
                  <div className="flex flex-row gap-3 align-center items-center justify-center text-white ">
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

                      <div className="w-full relative">
                        <input
                          {...register("email")}
                          type="text"
                          className="w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none formInput"
                          placeholder="Enter your email/username"
                          required
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="password-input w-full flex items-start flex-col gap-2">
                    <div className="w-full flex items-start flex-col gap-4">
                      <div className="w-full relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="transparent"
                          stroke="#505050"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          aria-hidden="true"
                          className="inputIcon"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="m3 8 7.8906 5.2604c.6718.4479 1.547.4479 2.2188 0L21 8M5 19h14c1.1046 0 2-.8954 2-2V7c0-1.10457-.8954-2-2-2H5c-1.10457 0-2 .89543-2 2v10c0 1.1046.89543 2 2 2Z"
                          ></path>
                        </svg>

                        <input
                          {...register("password")}
                          type="password"
                          className=" formInput w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none"
                          placeholder="Enter your password"
                          required
                        />
                      </div>

                      <p className="secondary-font font-light text-[1rem] text-white text-left self-end	">
                        Forgot your password
                      </p>

                      <div className="w-full flex items-start flex-col gap-2 mt-8">
                        <button
                          type="submit"
                          className="p-4 w-full secondary-font  text-[1rem] text-black bg-white border border-[rgba(0,0,0,.5)] rounded-lg abc-diatype-Medium formBtn "
                        >
                          Login
                        </button>
                    
                      </div>
                    </div>
                  </div>
                  <p className="secondary-font font-light text-[1rem] text-gray-500">
                    Don't have an account yet?
                    <Link
                      href="/signup"
                      className="text-white  cursor-pointer text-left text-sm self-end"
                    >
                      Sign up
                    </Link>
                  </p>
                </form> */}
              </div>
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
      </main>
    </>
  );
};

export default Login;
