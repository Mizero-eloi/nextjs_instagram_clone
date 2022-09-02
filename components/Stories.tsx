import Image from "next/image";
import React, { useEffect } from "react";
import { IUser } from "../types";
import useAuthStore from "./../store/authStore";

const Stories = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="w-[95%] md:w-[60%] md:ml-20 m-auto  mt-2 bg-white flex gap-7 p-4 overflow-x-scroll no-scrollbar">
      {allUsers.map((user: IUser, index) => (
        <div
          className="cursor-pointer transform transition hover:-rotate-6"
          key={index}
        >
          <div className="bg-gradient-to-r from-yellow-200 to-pink-600 w-20 h-20 p-1 rounded-full ">
            <div className="bg-white w-full h-full rounded-full p-1 block">
              <Image
                src={user.image}
                alt="post"
                className="object-cover rounded-full"
                height={65}
                width={65}
              />
            </div>
          </div>
          <p className="text-xs">{user.userName}</p>
        </div>
      ))}
      {allUsers.map((user: IUser, index) => (
        <div
          className="cursor-pointer transform transition hover:-rotate-6"
          key={index}
        >
          <div className="bg-gradient-to-r from-yellow-200 to-pink-600 w-20 h-20 p-1 rounded-full ">
            <div className="bg-white w-full h-full rounded-full p-1 block">
              <Image
                src={user.image}
                alt="post"
                className="object-cover rounded-full"
                height={65}
                width={65}
              />
            </div>
          </div>
          <p className="text-xs">{user.userName}</p>
        </div>
      ))}
    </div>
  );
};

export default Stories;
