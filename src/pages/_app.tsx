import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { initGA, logPageView } from "../../analytics"; // Import the utility you created

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  return <Component {...pageProps} />;
}
