// hooks/useUserInfo.js
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useUserInfo() {
  const { data: session, status: sessionStatus } = useSession();
  const [userInfo, setUserInfo] = useState(null); // Initialize with null or undefined
  const [status, setStatus] = useState("loading");

  console.log("sessionStatus:", sessionStatus);
  console.log("session:", session);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setStatus("loading"); // Set loading before fetching

      if (sessionStatus === "authenticated" && session?.user?.id) {
        try {
          const res = await fetch(`/api/users?id=${session.user.id}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch user info: ${res.statusText}`);
          }
          const data = await res.json();
          setUserInfo(data);
          setStatus("loaded");
        } catch (err) {
          
          setUserInfo(null); // Clear userInfo on error
          setStatus("error");
        }
      } else if (sessionStatus === "unauthenticated") {
        setUserInfo(null); // Clear userInfo if unauthenticated
        setStatus("unauthenticated");
      } else {
        // This 'else' block handles the initial 'loading' state of sessionStatus
        // or cases where session?.user?.id might be missing during authentication.
        // You might not need to do anything specific here, as 'loading' is already the default.
        // setStatus("loading"); // This would be redundant if default is loading
      }
    };

    // This is the primary trigger for fetchUserInfo.
    // It will run whenever sessionStatus or session changes.
    // The internal checks in fetchUserInfo will then decide what to do.
    fetchUserInfo();

  }, [sessionStatus, session]); // Dependencies are correct: rerun when session or its status changes

  return { userInfo, status, session, setUserInfo };
}