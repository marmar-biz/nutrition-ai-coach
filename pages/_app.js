// pages/_app.js
import "../styles/globals.css";
import Head from "next/head";
import Nav from "../components/Nav";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nutrition AI Coach</title>
      </Head>

      <Nav />
      <main className="page-container">
        <Component {...pageProps} />
      </main>
    </>
  );
}
