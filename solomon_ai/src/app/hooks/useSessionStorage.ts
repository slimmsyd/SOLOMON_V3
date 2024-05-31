import { useEffect, useState } from 'react';

import { isClient } from '../../utilis/isClient';



export const useSessionStorage = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [splitUserName, setSplitUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (isClient()) {
      const storedUserName = sessionStorage.getItem("userName");
      const storedSplitUserName = sessionStorage.getItem("splitUserName");
      const storedEmail = sessionStorage.getItem("email");

      console.log("logging the email");

      if (storedUserName) {
        setUserName(storedUserName);
      }
      if (storedEmail) {
        setEmail(storedEmail);
      }

      if (storedSplitUserName) {
        setSplitUserName(storedSplitUserName);
      }
      if(userName){
        setUserName(userName)
      }
    }
  }, []);

  return { userName, splitUserName, email, setUserName, setSplitUserName, setEmail };
};
