import axios from "axios";
import type { NextPage } from "next";
import Stories from "../components/Stories";
import { Iimage } from "./../types.d";
import Navbar from "./../components/Navbar";
import PostCard from "./../components/PostCard";
import SuggestedAccounts from "../components/SuggestedAccounts";
import NoResults from "./../components/NoResults";

interface IProps {
  photos: Iimage[];
}

const Home = ({ photos }: IProps) => {
  return (
    <div className="md:w-[65%] md:m-auto flex flex-col gap-6">
      <Stories />
      {/* feed */}
      <div className="md:flex md:gap-6 relative">
        {/* posts */}
        {photos.length ? (
          photos.map((image) => <PostCard post={image} key={image._id} />)
        ) : (
          <NoResults text="No posts yet" />
        )}
        {/* suggested accounts */}
        <SuggestedAccounts />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);

  return {
    props: {
      photos: data,
    },
  };
};

export default Home;
