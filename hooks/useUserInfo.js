// hooks/useUserInfo.js
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useUserInfo() {
  const { data: session, status: sessionStatus } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (sessionStatus === "authenticated" && session?.user?.id) {
        try {
          const res = await fetch(`/api/users?id=${session.user.id}`);
          if (!res.ok) throw new Error("Failed to fetch");
          const data = await res.json();
          setUserInfo(data);
          setStatus("loaded");
        } catch (err) {
          console.error("Error fetching user info:", err);
          setStatus("error");
        }
      }
    };

    if (sessionStatus === "authenticated") {
      fetchUserInfo();
    }
  }, [sessionStatus, session]);

  return { userInfo, status, session };
}
