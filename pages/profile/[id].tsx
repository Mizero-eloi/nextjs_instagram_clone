import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Iimage, IUser } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userPosts: Iimage[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userPosts } = data;

  console.log({ data });
  return (
    <div className="flex flex-col gap-6 w-3/4 md:w-1/2 m-auto mt-3 text-black">
      {/* profile information */}
      <div className="w-full  p-4 flex gap-20 items-center">
        {/* profile */}
        <Image
          src={user.image}
          alt="post"
          className=" rounded-full"
          height={200}
          width={200}
        />

        <div className="w-3/4 h-[400px]  flex flex-col gap-10 relative top-5">
          {/* username + follow */}
          <div className="flex gap-10">
            <p className="text-3xl font-light">{user.userName}</p>
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
          <Link href={`/detail/${p._id}`} key={p._id}>
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
