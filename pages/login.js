import {getProviders, signIn,useSession} from "next-auth/react";

export default function Login({providers}) {
    
  return (
    <div className="flex flex-col items-center justify-center h-screen text-3xl">
     
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
            <button onClick={async()=>{await signIn(provider.id, { callbackUrl: "/" });
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