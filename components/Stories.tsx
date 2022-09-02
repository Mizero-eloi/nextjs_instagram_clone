import React from "react";
import useAuthStore from "./../store/authStore";

const Stories = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  return (
    <div className="w-[95%] md:w-[60%] md:ml-20 m-auto h-20 mt-2 bg-white flex gap-5">
      Stories
    </div>
  );
};

export default Stories;
