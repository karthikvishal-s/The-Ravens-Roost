import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState} from "react"
import Link from "next/link";
import { useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { FaPowerOff } from "react-icons/fa";
import { GiPlagueDoctorProfile } from "react-icons/gi";

export default function Login({ providers }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Handle loaded state with proper timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300); // Increased delay to make transition more visible
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle authentication redirect
  useEffect(() => {
    if (status === "authenticated") {
      // Optional: redirect to homepage after showing the authenticated state
      // const redirectTimer = setTimeout(() => {
      //   router.replace("/");
      // }, 2000); // Give time to see the authenticated state
      // return () => clearTimeout(redirectTimer);
    }
  }, [status]);

  // Handle audio autoplay (fixed version)
  useEffect(() => {
    const enableAutoplay = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
        setHasInteracted(true);
      }
    };

    // Add event listener for user interaction
    const handleInteraction = () => {
      enableAutoplay();
      // Remove listeners after first interaction
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      // Removed the problematic window.location.reload()
    };
  }, [hasInteracted]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };
  
  const statusbool = (status === 'authenticated');
  console.log('Authentication status:', statusbool);
  
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white text-center text-2xl">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="fixed top-8 left-8 z-50 text-white hover:text-yellow-400 transition duration-200"
      >
        {muted ? <VolumeX size={28} /> : <Volume2 size={28} />}
      </button>

      {/* Logout Button - Only show when authenticated */}
      {statusbool && (
        <div className="fixed top-8 right-8 z-50">
          <FaPowerOff
            className="text-3xl text-white hover:text-yellow-400 cursor-pointer transition duration-200"
            title="Logout"
            onClick={() => router.push("/logoutsurity")}
          />
        </div>
      )}

      {/* Background Audio */}
      <audio 
        ref={audioRef} 
        src="/audio/got_theme.mp3" 
        loop 
        autoPlay 
        muted={muted}
        preload="auto"
      />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen text-2xl text-white px-4">
       
        {/* Title - Always visible with animation */}
        <h1 className={`mb-10 font-cinzel_bold text-yellow-400 text-4xl delay-500 md:text-6xl  text-center transition-all duration-[2000ms] ease-out ${
          loaded 
            ? 'transform translate-y-0 opacity-100' 
            : 'transform translate-y-12 opacity-0'
        }`}>
          The Raven's Roost
        </h1>

        {/* Authentication Flow */}
        {!statusbool ? (
          // Show login button when not authenticated
          !providers ? (
            <div className={`transition-all duration-1000 ease-out delay-500 ${
              loaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>
              <p className="text-white">Loading sign-in options...</p>
            </div>
          ) : (
            Object.values(providers).map((provider, index) => (
              <div 
                key={provider.id} 
                className={`mb-4 transition-all duration-1000 ease-out ${
                  loaded 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-8'
                }`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                <button
                  onClick={async () => {
                    await signIn(provider.id, {
                      callbackUrl: "/login",
                      prompt: "select_account",
                    });
                  }}
                  className="flex items-center justify-center bg-yellow-400 text-black px-6 py-3 rounded-full font-rocker text-2xl md:text-4xl shadow hover:scale-105 transition-all duration-300"
                >
                  <img 
                    src="/google.png" 
                    alt="Google icon" 
                    className="h-10 w-10 md:h-13 md:w-13 mr-3 md:mr-6 p-2 rounded-full bg-white" 
                  />
                  Join the Roost
                </button>
              </div>
            ))
          )
        ) : (
          // Show navigation links when authenticated
          <div className="flex flex-col items-center mt-20 space-y-4 ">
            {[
              { href: "/", text: "Realm", hoverColor: "hover:text-blue-400", delay: 800 },
              { href: "/about", text: "Learn More", hoverColor: "hover:text-red-400", delay: 900 },
              { href: "/creator", text: "Creator's Tale", hoverColor: "hover:text-green-400", delay: 900 },
              { href: "/feedback", text: "FeedBack", hoverColor: "hover:text-yellow-400", delay: 1000 }
            ].map((link, index) => (
              <div
                key={index}
                className={` transition-all duration-1000 ease-out ${
                  loaded 
                    ? 'transform translate-y-0 opacity-100' 
                    : 'transform translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${link.delay}ms` }}
              >
                <Link href={link.href}>
                  <h1 className={`font-rocker text-gray-400 text-xl md:text-3xl font-b transition-all duration-300 ${link.hoverColor} cursor-pointer`}>
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