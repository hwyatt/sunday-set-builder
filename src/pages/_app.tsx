import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Head } from "next/document";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-N1F9EJ6CY4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-N1F9EJ6CY4');
        `}
      </Script>
      <Head>
        <meta
          property="og:title"
          content="Build an Ableton Set in 60 seconds"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Sunday Set Builder - a tool for Worship Pastors"
          key="ogdesc"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/ySBt1Jm/SSB-Logo.png"
          key="ogimage"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
