import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login({ providers }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to homepage if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Show loading state while checking session
  if (status === "loading") return <p className="text-white text-center">Loading session...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-2xl text-white">
      <h1 className="mb-10 text-4xl font-bold">Welcome to Nexus</h1>

      {!providers ? (
        <p>Loading sign-in options...</p>
      ) : (
        Object.values(providers).map((provider) => (
          <div key={provider.id} className="mb-4">
            <button
              onClick={async () => {
                await signIn(provider.id, {
                  callbackUrl: "/",
                  prompt: "select_account", // Prompt account selection if multiple
                });
              }}
              className="flex items-center justify-center bg-white text-black px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition-all"
            >
              <img src="/google.png" alt="Google icon" className="h-6 w-6 mr-3" />
              Sign in withe {provider.name}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
