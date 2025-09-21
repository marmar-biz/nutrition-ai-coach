import "../styles/globals.css";
import Nav from "../components/Nav";

export default function MyApp({ Component, pageProps }) {
  // پشتیبانی از SEO سفارشی در هر صفحه
  const Page = Component;
  return (
    <>
      <Nav />
      <div className="container">
        <Page {...pageProps} />
      </div>
    </>
  );
}
