import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
      <style jsx>{`
        nav {
          background: #f0f0f0;
          padding: 10px;
        }
        ul {
          list-style: none;
          display: flex;
          gap: 15px;
        }
        li {
          font-weight: bold;
        }
        a {
          text-decoration: none;
          color: #333;
        }
        a:hover {
          color: #0070f3;
        }
      `}</style>
    </nav>
  );
}