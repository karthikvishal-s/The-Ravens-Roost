//This useUserInfo is a custom hook where we get the details of the user... using
// useSession is used..

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useUserInfo() {
  const { data: session, status: sessionStatus } = useSession();
  //data as session and status as sessionstatus....
  const [userInfo, setUserInfo] = useState(null);
  const [status, setStatus] = useState("loading");



  useEffect(() => {
    const fetchUserInfo = async () => {
      setStatus("loading");
  
      if (sessionStatus === "authenticated" && session?.user?._id) {
        try {
          const res = await fetch(`/api/users?id=${session.user._id}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch user info: ${res.statusText}`);
          }
          const data = await res.json();
          setUserInfo(data);
          setStatus("loaded");
        } catch (err) {
          console.error(err);
          setUserInfo(null);
          setStatus("error");
        }
      } else if (sessionStatus === "unauthenticated") {
        setUserInfo(null);
        setStatus("unauthenticated");
      }
    };

    fetchUserInfo();
  }, [sessionStatus, session]);

  return { userInfo, status, session, setUserInfo };
}
