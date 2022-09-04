import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";

import { Iimage } from "../types";
import { BASE_URL } from "../utils";
import useAuthStore from "./../store/authStore";

interface IProps {
  postDetail: Iimage;
}

const PostDetail = ({ postDetail }: IProps) => {
  const [post, setPost] = useState(postDetail);
  const { userProfile }: any = useAuthStore();
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  const handleComment = async (e: any) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  return (
    <div className="w-4/5 h-[500px] bg-white m-auto  flex gap-0">
      {/* image */}
      <div className="w-[55%] h-[500px] relative bg-green-400">
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
      <div className="w-[45%] h-full">
        <div className="p-3 flex justify-between border-b border-gray-200">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 relative rounded-full bg-red-300">
              <Image
                src={post.postedBy?.image}
                alt="post"
                className="object-cover rounded-full"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p>{post.postedBy?.userName}</p>
          </div>

          <button className="mr-3 text-gray-600">
            <BiDotsHorizontalRounded />
          </button>
        </div>

        {/* all comments */}
        <div className="p-3 h-[300px] overflow-y-scroll no-scrollbar">
          {post.comments?.map((comment) => (
            <div className="flex gap-4 items-center" key={comment.comment}>
              <div className="w-8 h-8 relative rounded-full bg-red-300">
                <Image
                  src={post.postedBy.image}
                  alt="post"
                  className="object-cover rounded-full"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex gap-2">
                <p>{post.postedBy.userName}</p>
                <p className="text-gray-700">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>

        {/* add new comment section */}

        <div className="px-3 py-2 border-t border-gray-200">
          <div className="flex justify-between text-xl">
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
          <p className="mt-2 font-semibold">
            {post.likes ? post.likes.length : 0} likes
          </p>
        </div>
        {/* form input */}
        <form
          onSubmit={handleComment}
          className="border-t border-gray-200 mt-4"
        >
          <div className="flex gap-5">
            <button className="text-2xl p-2 text-gray-400">
              <GrEmoji />
            </button>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className=" w-4/5 outline-none text-gray-400"
              placeholder="Comment..."
            />
            <button className="p-2 text-gray-400" onClick={handleComment}>
              {isPostingComment ? "Posting" : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
