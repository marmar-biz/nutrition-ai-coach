// components/Nav.js
import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const { pathname } = useRouter();
  const item = (href, label) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={
          "px-3 py-2 rounded-lg transition " +
          (active
            ? "bg-[#6d28d9] text-white shadow"
            : "text-[#0f172a] hover:bg-[#ede9fe]")
        }
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="nav-wrapper" role="navigation" aria-label="main">
      <nav className="nav">
        <div className="brand">
          <Link href="/">🥗 nutrition-ai-coach</Link>
        </div>
        <div className="links">
          {item("/", "Home")}
          <span className="dot">•</span>
          {item("/coach", "Coach")}
          <span className="dot">•</span>
          {item("/plans", "Plans")}
          <span className="dot">•</span>
          {item("/about", "About")}
        </div>
      </nav>
    </header>
  );
}
