import Image from "next/image";
import Link from "next/link";
import React from "react";

const Userprofile = ({ user }: any) => {
  return (
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
        <p className="font-medium">{user.userName}</p>
        <p className="text-xs">{user.userName}</p>
      </div>
    </div>
  );
};

export default Userprofile;
