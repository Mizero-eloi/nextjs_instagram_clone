import axios from "axios";
import Modal from "react-modal";
import { useRouter } from "next/router";

import Stories from "../components/Stories";
import { Iimage } from "./../types.d";
import Navbar from "./../components/Navbar";
import PostCard from "./../components/PostCard";
import SuggestedAccounts from "../components/SuggestedAccounts";
import NoResults from "./../components/NoResults";
import PostDetail from "../components/PostDetail";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface IProps {
  photos: Iimage[];
}

const Home = ({ photos }: IProps) => {
  const router = useRouter();
  const [activePost, setActivePost] = useState<Iimage>({});

  console.log({ activePost });

  useEffect(() => {
    if (router.query.id) {
      setActivePost(photos.filter((p) => p._id === router.query.id)[0]);
    }
  }, [photos, router.query.id, router.query.if]);

  return (
    <div className="md:w-[65%] md:m-auto flex flex-col gap-6">
      <Stories />
      {/* feed */}
      <div className="flex flex-col gap-6 relative">
        {/* posts */}
        {photos.length ? (
          photos.map((image) => (
            <PostCard postDetails={image} key={image._id} />
          ))
        ) : (
          <NoResults text="No posts yet" />
        )}
        {/* suggested accounts */}
        <SuggestedAccounts />
      </div>
      <Modal
        isOpen={!!router.query.id}
        onRequestClose={() => router.push("/")}
        className="bg-[rgba(0,0,0,0.7)] h-[100vh] pt-32 z-50"
      >
        <button
          className="absolute right-5 text-2xl text-white top-24"
          onClick={() => router.back()}
        >
          <AiOutlineCloseCircle />
        </button>
        <PostDetail postDetail={activePost} />
      </Modal>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`
  );

  return {
    props: {
      photos: data,
    },
  };
};

export default Home;
