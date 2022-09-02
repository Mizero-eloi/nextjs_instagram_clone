import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "./../components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

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
