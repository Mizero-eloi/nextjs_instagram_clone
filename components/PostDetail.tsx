import Image from "next/image";
import React from "react";
import { Iimage } from "../types";

interface IProps {
  post: Iimage;
}

const PostDetail = ({ post }: IProps) => {
  console.log("post", post);
  return (
    <div className="w-[85%] h-[400px] bg-red-400 m-auto  flex gap-0">
      {/* image */}
      <div className="w-[50%] h-[400px] relative bg-green-400">
        <Image
          src={post.image?.asset.url}
          className="cursor-pointer"
          layout="fill"
          objectFit="cover"
          objectPosition=""
          alt={post.caption}
        />
      </div>
      {/* comments */}
      <div className="w-1/2 h-full bg-yellow-400"></div>
    </div>
  );
};

export default PostDetail;
