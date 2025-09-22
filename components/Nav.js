// components/Nav.js
import Link from 'next/link';

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
        <li>
          <Link href="/coach">Coach</Link>
        </li>
      </ul>

      <style jsx>{`
        nav {
          background: #f5f5f5;
          padding: 10px 20px;
          border-bottom: 1px solid #ddd;
        }
        ul {
          list-style: none;
          display: flex;
          gap: 15px;
          margin: 0;
          padding: 0;
        }
        li {
          font-size: 16px;
        }
        a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
        }
        a:hover {
          color: #7c3aed; /* بنفش جذاب */
        }
      `}</style>
    </nav>
  );
}