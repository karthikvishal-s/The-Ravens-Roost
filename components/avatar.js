import { useState } from "react";

export default function Avatar({ src, profile = false }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const size = profile ? "w-40 h-40" : "w-12 h-12";

  return (
    <div className={`relative mt-2 ml-2 ${size}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`border-2 border-yellow-500 border-t-transparent rounded-full ${size}`}
            style={{ animation: "tilt-spin 0.6s infinite ease-in-out" }}
          />
          <style jsx>{`
            @keyframes tilt-spin {
              0%, 100% {
                transform: rotate(-10deg);
              }
              50% {
                transform: rotate(10deg);
              }
            }
          `}</style>
        </div>
      )}

      <img


        src={error ? "/stark.jpg" : src} // Fallback image
        alt="avatar"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        className={`rounded-full object-cover transition-opacity duration-500 ${profile?"border-10":""} ${size} ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
