import { useState } from "react";
import Spinner from "./spinner";

export default function Avatar({ src }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 

  return (
    <div className="relative mt-2 ml-2 h-12 w-12">
      {loading && (
         <div className="absolute inset-0 flex items-center justify-center">
         <div
           className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full"
           style={{ animation: "tilt-spin 0.6s infinite ease-in-out" }}
         />
         <style jsx>{`
           @keyframes tilt-spin {
             0%, 100% { transform: rotate(-10deg); }
             50% { transform: rotate(10deg); }
           }
         `}</style>
       </div>
      )}

      <img
        src={src}
        alt="avatar"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        className={`rounded-full h-12 w-12 object-cover transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
