import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";
import { FaPowerOff } from "react-icons/fa";

export default function Login({ providers }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const enableAutoplay = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().catch(err => console.log("Autoplay blocked:", err));
        setHasInteracted(true);
      }
    };
    const handleInteraction = () => {
      enableAutoplay();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);
    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, [hasInteracted]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const isAuthenticated = status === "authenticated";

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white text-2xl">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Mute Toggle */}
      <button
        onClick={toggleMute}
        className="fixed top-6 left-6 z-50 text-white hover:text-yellow-400 transition duration-200"
        aria-label="Toggle Mute"
      >
        {muted ? <VolumeX size={28} /> : <Volume2 size={28} />}
      </button>

      {/* Logout */}
      {isAuthenticated && (
        <div className="fixed top-6 right-6 z-50">
          <FaPowerOff
            className="text-3xl text-white hover:text-yellow-400 cursor-pointer transition"
            title="Logout"
            onClick={() => router.push("/logoutsurity")}
          />
        </div>
      )}

      {/* Theme Music */}
      <audio
        ref={audioRef}
        src="/audio/got_theme.mp3"
        loop
        autoPlay
        muted={muted}
        preload="auto"
      />

      {/* Main */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-white text-center">
        <h1
          className={`text-yellow-400 font-cinzel_bold text-4xl md:text-6xl mb-10 transition-all duration-[2000ms] ease-out ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          The Raven's Roost
        </h1>

        {!isAuthenticated ? (
          !providers ? (
            <p className="text-white text-lg">Loading sign-in options...</p>
          ) : (
            Object.values(providers).map((provider, index) => (
              <div
                key={provider.id}
                className={`transition-all duration-1000 ease-out ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                <button
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: "/login",
                      prompt: "select_account",
                    })
                  }
                  className="flex items-center bg-yellow-400 text-black px-6 py-3 rounded-full font-rocker text-2xl md:text-4xl shadow hover:scale-105 transition-all duration-300"
                >
                  <img
                    src="/google.png"
                    alt="Google"
                    className="h-10 w-10 mr-4 bg-white p-2 rounded-full"
                  />
                  Join the Roost
                </button>
              </div>
            ))
          )
        ) : (
          <div className="flex flex-col items-center mt-16 gap-5">
            {[
              { href: "/", text: "Realm", hover: "hover:text-blue-400", delay: 800 },
              { href: "/about", text: "Learn More", hover: "hover:text-red-400", delay: 900 },
              { href: "/creator", text: "Creator's Tale", hover: "hover:text-green-400", delay: 1000 },
              { href: "/feedback", text: "Feedback", hover: "hover:text-yellow-400", delay: 1100 },
            ].map((link, i) => (
              <div
                key={link.href}
                className={`transition-all duration-1000 ease-out ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${link.delay}ms` }}
              >
                <Link href={link.href}>
                  <h1 className={`font-rocker text-gray-200 text-xl md:text-3xl transition ${link.hover} cursor-pointer`}>
                    {link.text}
                  </h1>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
