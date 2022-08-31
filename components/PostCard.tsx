import Image from "next/image";
import React from "react";
import { Iimage } from "./../types.d";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";

interface IProps {
  post: Iimage;
}

const PostCard = ({ post }: IProps) => {
  console.log(post.postedBy.image);
  return (
    <div className="border-2 border-gray-200 rounded-lg pt-2 w-[95%] md:w-[60%] md:ml-20 m-auto   bg-white">
      <div className="flex gap-4 bg-white pb-2 pl-3">
        <div className="w-12 h-12 rounded-full bg-red-300">
          <Image
            src={post.postedBy.image}
            alt="post"
            className="object-cover rounded-full"
            height={48}
            width={48}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-medium capitalize">
            {post.postedBy.userName}
          </h2>
          <p className="text-xs">{post.postedBy.userName}</p>
        </div>
      </div>

      {/* image container */}
      <Image
        src={post.image.asset.url}
        alt="post"
        className=""
        height={1000}
        width={700}
      />

      <div className="flex justify-between p-3 text-2xl">
        <div className="flex gap-4">
          <button>
            <FaRegHeart />
          </button>
          <button>
            <FaRegComment />
          </button>
        </div>

        <button>
          <BsBookmark />
        </button>
      </div>

      <div className="p-3 flex flex-col gap-3">
        <p className="text-lg">{post.caption}</p>
        {post.comments?.length && (
          <div className="flex gap-5">
            <h2>View all {post.comments.length} comments</h2>
            <p>{post.comments[0].postedBy._ref}</p>
            <p>{post.comments[0].comment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
