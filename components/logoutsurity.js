// Remove this line completely
// const {userInfo, UserInfoStatus, setUserInfo} = useUserInfo()

// Just clear session
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function LogoutSurity() {
  const router = useRouter();

  async function logout() {
    await signOut();
    router.push("/"); // Or login page
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Are you sure you want to log out?</h2>
        <p className="mb-6">You will need to log in again to access your account.</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
          onClick={logout}
        >
          Log Out
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
