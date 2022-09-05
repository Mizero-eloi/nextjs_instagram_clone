import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import { Iimage, IUser } from "../../types";
import { BASE_URL } from "../../utils";
import { AiOutlineCloseCircle } from "react-icons/ai";
import PostDetail from "./../../components/PostDetail";
import { useRouter } from "next/router";

interface IProps {
  data: {
    user: IUser;
    userPosts: Iimage[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userPosts } = data;
  const router = useRouter();

  const [activePost, setActivePost] = useState<Iimage>({});

  console.log({ activePost });

  useEffect(() => {
    if (router.query.postId) {
      setActivePost(userPosts.filter((p) => p._id === router.query.postId)[0]);
    }
  }, [router.query.postId, userPosts]);
  console.log({ userPosts });
  console.log("router.query.id", router.query.id);

  return (
    <div className="flex flex-col gap-6 w-3/4 md:w-1/2 m-auto mt-3 text-black">
      {/* profile information */}
      <div className="w-full  p-4 flex gap-20 items-center">
        {/* profile */}
        <Image
          src={user?.image}
          alt="post"
          className=" rounded-full"
          height={200}
          width={200}
        />

        <div className="w-3/4 h-[400px]  flex flex-col gap-10 relative top-5">
          {/* username + follow */}
          <div className="flex gap-10">
            <p className="text-3xl font-light">{user?.userName}</p>
            <button className="bg-blue-400 text-white px-4 py-2 rounded">
              Follow
            </button>
          </div>
          <div className="flex  gap-6 md:gap-10 ">
            <p>
              <span className="font-semibold">{userPosts.length}</span> posts
            </p>
            <p>
              <span className="font-semibold">1,000</span> followers
            </p>
            <p>
              <span className="font-semibold">500</span> following
            </p>
          </div>
          {/* bio */}
          <div className="">
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed
              lectus mauris. Praesent a libero at elit varius feugiat. Sed
              venenatis volutpat elit, ac cursus diam luctus at. Integer ac
              turpis magna. Morbi vitae auctor odio
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-6 flew flex-wrap h-20 border-t border-gray-500 pt-3">
        {userPosts.map((p) => (
          <Link
            href={`/profile/${router.query.id}?postId=${p._id}`}
            // as={`/post/${p._id}`}
            key={p._id}
          >
            <Image
              src={p.image.asset.url}
              alt={p.caption}
              width={200}
              height={200}
              className="cursor-pointer"
            />
          </Link>
        ))}
      </div>
      <Modal
        isOpen={!!router.query.postId}
        onRequestClose={() => router.push(`/profile/${router.query.id}`)}
        className="bg-[rgba(0,0,0,0.7)] h-[100vh] pt-32 z-50"
      >
        <button
          className="absolute right-5 text-2xl text-white top-24"
          onClick={() => router.push(`/profile/${router.query.id}`)}
        >
          <AiOutlineCloseCircle />
        </button>
        <PostDetail postDetail={activePost} />
      </Modal>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
