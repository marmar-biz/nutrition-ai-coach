// pages/plans.js
import Link from 'next/link';

export default function Plans() {
  const plans = [
    {
      id: 'free',
      title: 'رایگان',
      price: '۰ تومان',
      features: ['پلن ۳ روزه', 'ایده‌های کم‌کالری', 'بدون دانلود PDF'],
      cta: { href: '/coach', label: 'شروع' },
    },
    {
      id: 'pro',
      title: 'پرمیوم',
      price: '۹۹،۰۰۰ / ماه',
      features: ['پلن ۷ روزه + لیست خرید', 'فیلتر حساسیت/ترجیحات', 'دانلود PDF'],
      cta: { href: '/premium', label: 'جزئیات پرمیوم' },
      highlight: true,
    },
  ];

  return (
    <main dir="rtl" className="wrap">
      <h1>پلن‌ها</h1>
      <p className="hint">پلن مناسب خودت رو انتخاب کن؛ می‌تونی هر زمان ارتقا بدی.</p>

      <div className="grid">
        {plans.map(p => (
          <article key={p.id} className={`card ${p.highlight ? 'hl' : ''}`}>
            {p.highlight && <span className="badge">پیشنهادی</span>}
            <h3>{p.title}</h3>
            <div className="price">{p.price}</div>
            <ul className="feat">
              {p.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <Link href={p.cta.href} className={`btn ${p.highlight ? 'primary' : 'ghost'}`}>
              {p.cta.label}
            </Link>
          </article>
        ))}
      </div>

      <style jsx>{`
        .wrap{ max-width:1000px; margin:24px auto; padding:0 16px }
        h1{ margin:8px 0 6px }
        .hint{ color:#64748b; margin-bottom:14px }
        .grid{ display:grid; gap:14px; grid-template-columns:1fr; }
        .card{ position:relative; background:#fff; border:1px solid #e5e7eb; border-radius:18px; padding:18px }
        .hl{ box-shadow:0 10px 30px rgba(124,58,237,.18) }
        .badge{ position:absolute; left:16px; top:16px; background:#22c55e; color:#fff; padding:4px 8px; border-radius:10px; font-size:.8rem }
        .price{ font-weight:800; font-size:1.3rem; margin:6px 0 10px }
        .feat{ margin:0 0 14px; color:#334155 }
        .feat li{ margin:6px 0 }
        .btn{ padding:10px 14px; border-radius:12px; font-weight:600; display:inline-block }
        .primary{ background:#7c3aed; color:#fff }
        .ghost{ border:1px solid #cbd5e1; color:#0f172a; background:#fff }
        @media(min-width:680px){ .grid{ grid-template-columns:repeat(2,1fr) } }
      `}</style>
    </main>
  );
}
