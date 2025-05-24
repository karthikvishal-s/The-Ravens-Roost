
import useUserInfo from "@/hooks/useUserInfo";


export default function Postform(){
    const { userInfo, status} = useUserInfo();
    console.log("Postform userInfo", userInfo);
    return (
        <form>
          <div className="flex">
            <div>
              
              <img src={userInfo?.user.image}  alt="profilepic" className=" rounded-full mt-2 ml-2 h-15 w-15 overflow-hiiden"  />
            </div>
            <div className="justify-center items-center flex-1">
              <textarea className="w-100 h-10 
               ml-4 mb-3 mt-6 rounded-lg mt-2 rounded-lg text-xl" placeholder="Share your thoughts?"></textarea>
            </div>
          </div>
          <div className="ml-8 border-t border-gray-500 w-110">
            <button className="bg-blue-500  text-white p-2 rounded-full font-bold w-20 mt-4 ml-90">
              Zing
            </button>
          </div>
      </form>
    );
}