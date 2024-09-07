"use client"

import LoadingComponent from "../components/helper/Loading";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";



const Redirect = () => { 
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false); // Track login initiation
    const [isLoading, setIsLoading] = useState<boolean>(false); // Track loading state for redirection
    const [completedForm, setCompletedForm] = useState<boolean | null>(null); // null means not determined yet
  


useEffect(() => { 

    console.log("Loggin the session in the reload", session)
},[session])

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
              router.push('/chat/app');
  
            } else {
              setCompletedForm(false);
  
            }
          } else {
            setCompletedForm(false);
  
          }
        } catch (error) {
          console.error('Error fetching progress:', error);
          setCompletedForm(false);
        }
      };
  
      if (status === 'authenticated' && session?.user?.id) {
        const userId = session.user.id;
        fetchProgress(userId);
      } else if (status === 'unauthenticated') {
        setIsLoggingIn(false); // Reset logging in state if authentication fails
      }
    }, [session]);


    useEffect(() => {
        if (completedForm !== null) {
          setIsLoading(true);
          if (status === 'authenticated' && completedForm) {
            console.log("Logging completed form", completedForm);
            router.push('/chat/app');
          } else if (status === 'authenticated' && completedForm === false) {

            //
            router.push("/chat/signup");
          }
        }
      }, [completedForm, status, router]);
    

  

return ( 


    <div className = "flex items-center justify-center h-[100vh] w-full">


        <LoadingComponent />



    </div>



)


}



export default Redirect;