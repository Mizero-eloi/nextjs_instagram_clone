import axios from "axios";
import Image from "next/image";
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
  const { user } = data;
  console.log({ data });
  return (
    <div className="flex flex-col gap-6 w-3/4 m-auto mt-3">
      {/* profile information */}
      <div className="w-full  bg-red-400 p-4 flex gap-7 items-center">
        {/* profile */}
        <Image
          src={user.image}
          alt="post"
          className=" rounded-full self-start"
          height={150}
          width={150}
        />

        <div className="w-12 h-[400px] bg-blue-700"></div>
      </div>
      <div className="w-full h-20 bg-green-400">posts</div>
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
