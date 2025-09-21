// pages/_app.js
import '../styles/globals.css';
import Nav from '../components/Nav';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
}