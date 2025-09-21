import Nav from "../components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "20px" }}>
        <h1>🍏 AI Nutrition Coach</h1>
        <p>🥗 به مربی هوشمند تغذیه خوش اومدی!</p>
        <p>اینجا می‌تونی رژیم غذایی، کالری و برنامه شخصی دریافت کنی.</p>
        <a href="/api">👉 بزن بریم API تست</a>
      </main>
    </>
  );
}