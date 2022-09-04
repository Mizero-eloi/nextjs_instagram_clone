import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Iimage, IUser } from "./../types.d";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { BsBookmark, BsHeart, BsHeartFill } from "react-icons/bs";
import { GrEmoji } from "react-icons/gr";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import useAuthStore from "./../store/authStore";
import axios from "axios";
import { BASE_URL } from "../utils";
import Link from "next/link";

interface IProps {
  postDetails: Iimage;
}

const PostCard = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const filterLikes = post.likes?.filter(
    (item) => item.postedBy?._id === userProfile?._id
  );

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [filterLikes]);

  console.log("post", post);

  const { userProfile }: any = useAuthStore();

  const handleLike = async (isLiked: boolean) => {
    setIsLiked(isLiked);

    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like: isLiked,
      });

      setPost({ ...post, likes: data.likes });
    }
  };

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
    <div className="border border-gray-300 rounded-lg pt-2 w-[95%] md:w-[60%] md:ml-20 m-auto text-gray-600   bg-white">
      <div className="flex justify-between items-center bg-white pb-3 pl-3">
        <div className="flex gap-4">
          <Link
            href={`/profile/${post.postedBy._id}`}
            className="w-12 h-12 rounded-full bg-red-300 cursor-pointer"
          >
            <Image
              src={post.postedBy.image}
              alt="post"
              className=" rounded-full"
              height={48}
              width={48}
            />
          </Link>
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex flex-col justify-center cursor-pointer">
              <h2 className="text-lg font-medium capitalize">
                {post.postedBy.userName}
              </h2>
              <p className="text-xs">{post.postedBy.userName}</p>
            </div>
          </Link>
        </div>
        <p className="text-xl mr-3 ">
          <BiDotsHorizontalRounded />
        </p>
      </div>

      {/* image container */}
      <Image
        src={post.image.asset.url}
        alt="post"
        className=""
        height={700}
        width={700}
      />

      <div className="flex justify-between p-3 text-2xl">
        <div className="flex gap-4">
          <button>
            {isLiked ? (
              <BsHeartFill
                onClick={() => handleLike(false)}
                className="text-[#fb3958]"
              />
            ) : (
              <BsHeart onClick={() => handleLike(true)} />
            )}
          </button>
          <button>
            <FaRegComment />
          </button>
        </div>

        <button>
          <BsBookmark />
        </button>
      </div>
      <p className="pl-3 font-semibold">
        {post.likes ? post.likes.length : 0} likes
      </p>

      <div className="p-3 flex flex-col gap-3">
        <p className="text-lg">{post.caption}</p>
        {post.comments?.length && (
          <div>
            <Link href={`/?id=${post._id}`} as={`/post/${post._id}`}>
              <h2 className="cursor-pointer">
                View all {post.comments.length} comments
              </h2>
            </Link>
            <div className="flex gap-2 ">
              <p className="font-semibold">
                {post.comments[0].postedBy.userName}
              </p>
              <p>{post.comments[0].comment}</p>
            </div>
          </div>
        )}
      </div>

      {/* form input */}
      <form onSubmit={handleComment} className=" border-t border-gray-200">
        <div className="flex gap-5">
          <button className="text-2xl p-2 text-gray-400">
            <GrEmoji />
          </button>
          <input
            type="text"
            className=" w-4/5 outline-none text-gray-400"
            placeholder="Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="p-2 text-gray-400" onClick={handleComment}>
            {isPostingComment ? "Posting" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCard;
