import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createOrGetUser } from "../utils";
import { navbarIcons } from "../utils/constants";
import useAuthStore from "../store/authStore";
import { FiHome } from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";

import Logo from "../utils/logo.png";
import AddPost from "./AddPost";

const Navbar = () => {
  const { userProfile, addUser } = useAuthStore();
  const [viewModal, setViewModal] = useState(false);

  function closeModal() {
    setViewModal(false);
    document.body.style.overflow = "";
  }

  function openModal() {
    setViewModal(true);
    document.body.style.overflow = "hidden";
  }

  return (
    <>
      {viewModal && <AddPost toggleModal={closeModal} title="Add post" />}
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
            <Link href={`/`}>
              <button className="text-2xl hover:text-gray-600 flex justify-center items-center">
                <FiHome />
              </button>
            </Link>
            <Link href={`/messenger`}>
              <button className="text-2xl hover:text-gray-600 flex justify-center items-center">
                <RiMessengerLine />
              </button>
            </Link>

            <button
              className="text-2xl hover:text-gray-600 flex justify-center items-center"
              onClick={openModal}
            >
              <CgAddR />
            </button>

            <Link href={`/notifications`}>
              <button className="text-2xl hover:text-gray-600 flex justify-center items-center">
                <BiHeart />
              </button>
            </Link>

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
    </>
  );
};

export default Navbar;
