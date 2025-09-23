// components/Navbar.js
import Link from 'next/link'

export default function Navbar(){
  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <nav>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/plans">Plans</Link></li>
            <li><Link href="/coach">Coach</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>
        <div className="brand">
          <span className="brand-badge" />
          nutrition-ai-coach 🥗
        </div>
        <div className="nav-cta">
          <Link href="/premium" className="btn btn-ghost">پرمیوم</Link>
        </div>
      </div>
    </header>
  )
}
