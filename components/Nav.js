import Link from "next/link";

export default function Nav() {
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
          background: #f5f5f5;
          padding: 10px 20px;
        }
        ul {
          list-style: none;
          display: flex;
          gap: 20px;
          margin: 0;
          padding: 0;
        }
        li {
          font-weight: bold;
        }
        a {
          text-decoration: none;
          color: #333;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
}