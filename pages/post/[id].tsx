import React from "react";
import PostDetail from "../../components/PostDetail";
import axios from "axios";
import { Iimage } from "../../types";

interface IProps {
  post: Iimage;
}

const Post = ({ post }: IProps) => {
  return (
    <div className="w-5/6 m-auto pt-4">
      <PostDetail postDetail={post} />
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`http://localhost:3000/api/post/${id}`);

  return {
    props: {
      post: data,
    },
  };
};

export default Post;
