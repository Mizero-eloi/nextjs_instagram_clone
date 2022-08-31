import Image from "next/image";
import Link from "next/link";
import React from "react";
import { navbarIcons } from "../utils/constants";

import Logo from "../utils/logo.png";

const Navbar = () => {
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
