import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "./../components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import useAuthStore from "./../store/authStore";

import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);
  const { userProfile } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setIsSSR(false);
  }, []);

  useEffect(() => {
    if (!userProfile) {
      router.push("/login");
    }
  }, [userProfile, router]);

  if (isSSR) return null;
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <Navbar />
      <div className="text-gray-500">
        <Component {...pageProps} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
