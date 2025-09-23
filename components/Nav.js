// components/Nav.js
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav() {
  const { pathname } = useRouter();
  const Item = ({ href, children }) => (
    <Link href={href} className={`nav-link ${pathname === href ? 'active' : ''}`}>
      {children}
    </Link>
  );

  return (
    <nav dir="rtl">
      <ul>
        <li><Item href="/">Home</Item></li>
        <li><Item href="/about">About</Item></li>
        <li><Item href="/coach">Coach</Item></li>
        <li><Item href="/plans">Plans</Item></li>
      </ul>

      <style jsx>{`
        nav{ background:#fff; border-bottom:1px solid #e5e7eb; position:sticky; top:0; z-index:40 }
        ul{ max-width:1000px; margin:0 auto; padding:12px 16px; display:flex; gap:16px; justify-content:flex-end }
        .nav-link{ font-weight:700; color:#0f172a; opacity:.75 }
        .nav-link.active{ color:#7c3aed; opacity:1 }
      `}</style>
    </nav>
  );
}