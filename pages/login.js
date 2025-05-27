import {getProviders, signIn,useSession} from "next-auth/react";
import {useRouter} from "next/router";

export default function Login({providers}) {
    const{data,status}=useSession();
    const router=useRouter();

    console.log("Login Component - status:", status);
    console.log("Login Component - data:", data); 
    
    if (status==="loading") return <p>Loading...</p>;
    if(data){
        router.push("/");
    }
    
  return (
    <div className="flex flex-col items-center justify-center h-screen text-3xl">
     
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
            <button onClick={async()=>{
              await signIn(provider.id, 
                    { callbackUrl: "/" ,
                      prompt: "select_account"  // This will prompt the user to select an account if multiple accounts are available

            });
 }} className=" flex items-center justify-center bg-white text-black px-5 py-3 rounded-full text-bold ">
               <img src="/google.png" className="h-15 px-4"></img>
                     Sign in with {provider.name}</button>
        </div>))}
        
    </div>
  );}


export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
//