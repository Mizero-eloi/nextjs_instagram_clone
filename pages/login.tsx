import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

import { createOrGetUser } from "../utils";
import useAuthStore from "./../store/authStore";

const Login = () => {
  const { addUser } = useAuthStore();

  const theGoogleLogin = useGoogleLogin({
    onSuccess: (response) => createOrGetUser(response, addUser),
    onError: () => console.log("Error"),
  });

  return (
    <button
      onClick={() => theGoogleLogin()}
      className="px-[31px] relative left-1/2 top-[300px]  py-[15px] rounded text-white bg-blue-400"
    >
      Log in with google
    </button>
  );
};

export default Login;
