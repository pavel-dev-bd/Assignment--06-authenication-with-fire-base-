import { useAuth } from "../context/AuthContext";
import UserAvater from '../assets/avatar/user.svg';
export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className=" bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      
      <div className="bg-white shadow-2xl rounded-3xl  w-full">
        
        {/* Top Gradient Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32 relative">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              src={user?.photoURL || UserAvater}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-16 pb-8 px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.displayName || "User"}
          </h2>

          <span className="inline-block mt-2 px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
            Active User
          </span>

          {/* User Info */}
          <div className="mt-6 space-y-3 text-sm text-gray-600 text-left">
            <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
              <p className="font-semibold">📧 Email</p>
              <p>{user?.email}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
              <p className="font-semibold">🆔 UID</p>
              <p className="truncate">{user?.uid}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
              <p className="font-semibold">📅 Account Created</p>
              <p>
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="mt-6 w-full cursor-pointer py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition duration-300 shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}