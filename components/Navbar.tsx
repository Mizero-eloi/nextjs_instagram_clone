import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createOrGetUser } from "../utils";
import { navbarIcons } from "../utils/constants";
import useAuthStore from "../store/authStore";
import { FiHome } from "react-icons/fi";
import { RiMessengerFill, RiMessengerLine } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";
import { MdExplore, MdExploreOff, MdOutlineExplore } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

import Logo from "../utils/logo.png";
import AddPost from "./AddPost";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const Navbar = () => {
  const { userProfile, addUser } = useAuthStore();
  const [viewModal, setViewModal] = useState(false);
  const router = useRouter();

  const { page } = router.query;

  function closeModal() {
    setViewModal(false);
    document.body.style.overflow = "";
  }

  function openModal() {
    setViewModal(true);
    document.body.style.overflow = "hidden";
  }

  const navigationRoutes = {
    home: {
      normalIcon: <AiOutlineHome />,
      activeLink: <AiFillHome />,
    },
    messenger: {
      normalIcon: <RiMessengerLine />,
      activeLink: <RiMessengerFill />,
    },
    explore: {
      normalIcon: <MdOutlineExplore />,
      activeLink: <MdExplore />,
    },
    notifications: {
      normalIcon: <BsHeart />,
      activeLink: <BsHeartFill />,
    },
  };

  return (
    <>
      {viewModal && <AddPost toggleModal={closeModal} title="Add post" />}
      <div className="bg-white px-4 py-3 sticky top-0 z-50 border-b border-gray-300">
        <div className="flex justify-between md:w-[70%] md:m-auto">
          {/* logo */}
          <Link href="/">
            <div className="w-[100px] md:w-[130px] ">
              <Image
                className="cursor-pointer"
                src={Logo}
                alt="Instagram"
                layout="responsive"
                priority
              />
            </div>
          </Link>

          {/* search */}
          <form className="hidden md:block md:w-[27%]">
            <div className="flex bg-gray-200 pl-2 rounded-lg items-center text-gray-400">
              <button className="text-xl">
                <IoIosSearch />
              </button>

              <input
                type="text"
                placeholder="Search"
                className="outline-none bg-gray-200 p-2 rounded-lg"
              />
            </div>
          </form>

          {/* icons */}
          <div className="flex gap-7">
            <Link href={{ pathname: "/", query: { page: "home" } }} as="/">
              <button className="text-2xl hover:text-gray-600 flex justify-center items-center">
                {page === "home" ? <AiFillHome /> : <AiOutlineHome />}
              </button>
            </Link>

            <Link
              href={{ pathname: "/messenger", query: { page: "messenger" } }}
              as="/messenger"
            >
              <button className="text-2xl hover:text-gray-600 flex justify-center items-center">
                {page === "messenger" ? (
                  <RiMessengerFill />
                ) : (
                  <RiMessengerLine />
                )}
              </button>
            </Link>

            <button
              className="text-2xl hover:text-gray-600 flex justify-center items-center"
              onClick={openModal}
            >
              <CgAddR />
            </button>

            <Link
              href={{ pathname: "/explore", query: { page: "explore" } }}
              as="/explore"
            >
              <button className="text-2xl hover:text-gray-600 flex justify-center items-center">
                {page === "explore" ? <MdExplore /> : <MdOutlineExplore />}
              </button>
            </Link>

            <Link
              href={{
                pathname: "/notifications",
                query: { page: "notifications" },
              }}
            >
              <button className="text-2xl hover:text-gray-600 flex justify-center items-center">
                {page === "notifications" ? <BsHeartFill /> : <BsHeart />}
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
