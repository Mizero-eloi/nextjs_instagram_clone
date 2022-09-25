import Image from "next/image";
import Link from "next/link";
import React from "react";

const Userprofile = ({ user }: any) => {
  console.log({ user });
  return (
    <div className="flex gap-5 items-center">
      <div className="w-16 h-16 rounded-full bg-red-300">
        <Image
          src={user?.image}
          alt="post"
          className="object-cover rounded-full"
          height={65}
          width={65}
        />
      </div>

      <div>
        <p className="font-medium text-black">{user?.userName}</p>
        <p className="text-xs">{user?.userName}</p>
      </div>
    </div>
  );
};

export default Userprofile;
