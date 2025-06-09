// pages/_app.js
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="icon" href="/raven.png" />
        <title>The Raven's Roost</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add other meta tags if you want */}
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
