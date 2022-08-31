import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { createOrGetUser } from "../utils";
import { navbarIcons } from "../utils/constants";
import useAuthStore from "../store/authStore";

import Logo from "../utils/logo.png";

const Navbar = () => {
  const { userProfile, addUser } = useAuthStore();
  console.log({ userProfile });
  return (
    <div className="bg-white px-4 py-3">
      <div className="flex justify-between md:w-[70%] md:m-auto">
        {/* logo */}
        <Link href="/">
          <div className="w-[100px] md:w-[130px] ">
            <Image
              className="cursor-pointer"
              src={Logo}
              alt="TikTik"
              layout="responsive"
              priority
            />
          </div>
        </Link>

        {/* search */}
        <div className="hidden md:block">search</div>

        {/* icons */}
        <div className="flex gap-7">
          {navbarIcons.map((icon) => (
            <Link key={icon.name} href={`/${icon.name}`}>
              <button className="text-2xl hover:text-gray-600 flex justify-center items-center">
                {icon.icon}
              </button>
            </Link>
          ))}

          {userProfile ? (
            <Link href="/">
              <>
                <Image
                  width={40}
                  height={40}
                  className="rounded-full object-cover cursor-pointer"
                  src={userProfile.image}
                  alt="profile picture"
                />
              </>
            </Link>
          ) : (
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log("Error")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
