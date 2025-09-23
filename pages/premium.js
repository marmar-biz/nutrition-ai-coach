// pages/premium.js
import Link from 'next/link';

export default function Premium() {
  return (
    <main dir="rtl" className="wrap">
      <h1>پرمیوم</h1>
      <p className="muted">
        این صفحه‌ی تست مسیر <code>premium/</code> است. وقتی این را می‌بینی یعنی ۴۰۴ حل شده ✌️
      </p>

      <section className="box">
        <h2>مزایا</h2>
        <ul>
          <li>برنامه‌ی ۷ روزه + لیست خرید</li>
          <li>فیلتر آلرژی‌ها/ترجیحات</li>
          <li>دانلود PDF برنامه</li>
        </ul>
        <div className="links">
          <Link href="/plans">مشاهده پلن‌ها</Link>
          <span>·</span>
          <Link href="/coach">بازگشت به Coach</Link>
        </div>
      </section>

      <style jsx>{`
        .wrap{ max-width:900px; margin:24px auto; padding:0 16px }
        .muted{ color:#64748b }
        .box{ background:#fff; border:1px solid #e5e7eb; border-radius:18px; padding:18px; margin-top:14px }
        ul{ margin:10px 0 8px; color:#334155 }
        li{ margin:8px 0 }
        .links{ margin-top:8px; display:flex; gap:8px; align-items:center }
        a{ color:#7c3aed; font-weight:600 }
        code{ background:#f1f5f9; border-radius:8px; padding:2px 6px }
      `}</style>
    </main>
  );
}
