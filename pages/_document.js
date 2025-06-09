// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* You can add favicon here too, but no need if added in _app.js */}
        
        <meta charSet="UTF-8" />
        <meta name="description" content="Your app description here" />
        <meta name="author" content="Karthik Vishal" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
