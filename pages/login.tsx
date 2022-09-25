import React from "react";
import { GoogleLogin } from "@react-oauth/google";

import { createOrGetUser } from "../utils";
import useAuthStore from "./../store/authStore";
import { useRouter } from "next/router";

const Login = () => {
  const { addUser } = useAuthStore();
  const router = useRouter();
  console.log({ router });

  //   console.log("google token", process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN);

  //

  return (
    <div className="w-[100px] relative top-[200px] m-auto ">
      <GoogleLogin
        onSuccess={(response) => {
            router.push("/");
            return createOrGetUser(response, addUser);
        }}
        onError={() => console.log("Error")}
      />
    </div>
  );
};

export default Login;
