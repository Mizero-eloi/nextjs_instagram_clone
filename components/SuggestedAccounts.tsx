import React, { useEffect } from "react";
import Userprofile from "./Userprofile";
import useAuthStore from "./../store/authStore";
import Image from "next/image";
import { footer } from "../utils/footer";

const SuggestedAccounts = () => {
  const { userProfile, allUsers, fetchAllUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="hidden md:flex  w-[35%] md:flex-col md:gap-4  top-[-140px] absolute   right-[-50px] p-5">
      <div className="flex justify-between">
        <Userprofile user={userProfile} />
        <button>
          <p className="text-blue-500 font-semibold ">Switch</p>
        </button>
      </div>

      {/* suggestions */}

      <h2 className="text-gray-400 font-bold">Suggestions for you</h2>

      {allUsers.slice(0, 5).map((user, index) => (
        <div key={index} className="flex justify-between">
          <div className="flex gap-2">
            <div className="w-12 h-12 rounded-full bg-red-300">
              <Image
                src={user.image}
                alt="post"
                className="object-cover rounded-full"
                height={48}
                width={48}
              />
            </div>

            <div>
              <p className="font-semibold text-black">{user.userName}</p>
              <p className="text-xs text-gray-500">New to Instagram</p>
            </div>
          </div>
          <button>
            <p className="text-blue-500 font-semibold ">Follow</p>
          </button>
        </div>
      ))}

      <div className="text-gray-300 text-sm mt-4">
        {footer.map((f) => (
          <span key={f}>{f + " . "}</span>
        ))}
        <p className="mt-5 text-xs">
          INSTAGRAM CLONE MADE WITH ❣️ BY MIZERO ELOI
        </p>
      </div>
    </div>
  );
};

export default SuggestedAccounts;
