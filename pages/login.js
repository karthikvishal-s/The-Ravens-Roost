import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState} from "react"
import Link from "next/link";
import { useRef } from "react";
import { Volume2, VolumeX } from "lucide-react"; // optional: lucide-react icons
import { FaPowerOff } from "react-icons/fa";

export default function Login({ providers }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loaded,setLoaded] = useState(false);

  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  
  
  
  
  
  
  // Redirect to homepage if already logged in
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100); // slight delay to trigger transition
  
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (status === "authenticated") {
      //router.replace("/"); // replace to avoid back button issues
    }
  }, [status]);
  useEffect(() => {
    const enableAutoplay = () => {
      if (!hasInteracted) {
        audioRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
        setHasInteracted(true);
      }
    };

    window.addEventListener("click", enableAutoplay, { once: true });

    return () => {
      window.removeEventListener("click", enableAutoplay);
    };
  }, [hasInteracted]);


  // Show loading state while checking session
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };
  
  
  
  const statusbool=(status === 'authenticated')
  console.log(statusbool)
  
  if (status === "loading") return <p className="text-white text-center">Loading session...</p>;

  return (
    <div>
    
      
    <button
        onClick={toggleMute}
        className="mt-8 text-white hover:text-yellow-400 transition duration-200 ml-8"
      >
        {muted ? <VolumeX size={28} /> : <Volume2 size={28} />}
      </button>
          {statusbool && (
            <div className="text-white right-0 fixed top-0 pr-6 z-50 mt-10 mr-5">
            <FaPowerOff

              className="text-3xl hover:text-yellow-400 cursor-pointer"
              title="Logout"
              onClick={() => router.push("/logoutsurity")}
            />
          
          </div>
          )}


      



    <div className="flex flex-col items-center justify-center h-screen text-2xl text-white">
      
      <audio ref={audioRef} src="/audio/got_theme.mp3"  loop autoPlay muted={muted} />


      
      <h1 className={`mb-10 font-cinzel_bold text-yellow-400 text-6xl font-bold transition-all duration-[3000ms] ease-out ${loaded?'transform translate-y-0 opacity-100':'transform translate-y-full opacity-0'}`}>The Raven's Roost </h1>
      {statusbool}
      

      {!providers ? (
        <p>Loading sign-in options...</p>
      ) : (statusbool?
        
        (""):
      
      Object.values(providers).map((provider) => (
          <div key={provider.id} className="mb-4">
            <button
              onClick={async () => {
                await signIn(provider.id, {
                  callbackUrl: "/login",
                  prompt: "select_account", // Prompt account selection if multiple
                });
              }}
              className="flex items-center justify-center bg-yellow-400 text-black px-6 py-3 rounded-full font-rocker text-4xl shadow hover:scale-105 transition-all mt-10"
            >
              <img src="/google.png" alt="Google icon" className="h-13 w-13 mr-3  p-2 rounded-full bg-white mr-6" />
              Join the Roost
            </button>
          </div>
        ))
      )

      
        }
      {statusbool && (
        <div className="flex flex-col items-center mt-20">
        <div>
          <Link href="/" className="text-blue-500 hover:text-red-600">
          <h1 className={`mb-5 font-rocker text-gray-400 text-2xl font-bold transition-all duration-[1000ms] hover:text-blue-400 delay-[600ms] ease-out ${loaded?'transform translate-y-0 opacity-100':'transform translate-y-full opacity-0'}`}>Realm</h1>
          </Link>
        </div>
        <div>
          <Link href="/about" className="text-blue-500 hover:text-red-600">
          <h1 className={`mb-5 font-rocker text-gray-400 text-2xl font-bold transition-all duration-[1000ms] hover:text-red-400 delay-[650ms] ease-out ${loaded?'transform translate-y-0 opacity-100':'transform translate-y-full opacity-0'}`}>Learn More</h1>
          </Link>
        </div>
        <div>
          <Link href="/about" className="text-yellow-500 hover:text-red-600">
          <h1 className={`mb-5 font-rocker text-gray-400 text-2xl font-bold transition-all duration-[1000ms] hover:text-green-400 delay-[700ms] ease-out ${loaded?'transform translate-y-0 opacity-100':'transform translate-y-full opacity-0'}`}>Creator's Tale</h1>
          </Link>
        </div>
        <div>
          <Link href="/about" className="text-blue-500 hover:text-red-600">
          <h1 className={`mb-10 font-rocker text-gray-400 text-2xl font-bold transition-all duration-[1000ms] hover:text-yellow-400 delay-[750ms] ease-out ${loaded?'transform translate-y-0 opacity-100':'transform translate-y-full opacity-0'}`}>Raven's cry</h1>
          </Link>
        </div>
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
