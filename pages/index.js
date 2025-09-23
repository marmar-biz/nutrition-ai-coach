// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <main dir="rtl">
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-inner">
          <span className="eyebrow">اپ تغذیه و تناسب اندام</span>
          <h1>
            مربی تغذیه <span className="accent">هوشمند</span>
          </h1>
          <p className="sub">
            برنامه‌ی غذایی شخصی بر اساس <b>هدف، کالری و سبک زندگی</b> +
            <br className="br" />
            لیست خرید هفتگی و ایده‌های سالمِ آماده.
          </p>

          <div className="cta">
            <Link href="/coach" className="btn primary">شروع رایگان</Link>
            <Link href="/plans" className="btn ghost">مشاهده پلن‌ها</Link>
          </div>

          <ul className="highlights">
            <li><strong>+1500</strong> ایده غذایی</li>
            <li><strong>۷ روزه</strong> پلن آماده</li>
            <li><strong>کم‌کالری</strong> و سالم</li>
          </ul>
        </div>
      </section>

      <section className="why">
        <h2>چرا این اپ؟</h2>
        <div className="cards">
          <article className="card">
            <div className="dot purple" />
            <h3>UI شاد و مینیمال</h3>
            <p>رنگ‌های شاد + گرادیان‌های لطیف = انگیزه‌ی بیشتر برای ادامه.</p>
          </article>
          <article className="card">
            <div className="dot pink" />
            <h3>تمرکز روی عمل‌پذیری</h3>
            <p>کارت‌ها و چیپ‌ها اطلاعات را سریع و قابل لمس نشان می‌دهند.</p>
          </article>
          <article className="card">
            <div className="dot green" />
            <h3>سریع و سبک</h3>
            <p>بدون تصویر سنگین؛ همه چیز با CSS/SVG رِندر می‌شود.</p>
          </article>
        </div>
      </section>

      <section className="promo">
        <div className="promo-badge">۳ روز رایگان</div>
        <div>
          <h3>ارتقا به پرمیوم هر زمان</h3>
          <p>لیست خرید هفتگی، فیلتر حساسیت‌ها و دانلود PDF.</p>
        </div>
        <Link href="/premium" className="pill">
          دیدن پلن‌ها
        </Link>
      </section>

      <style jsx>{`
        .hero { position:relative; overflow:hidden; padding:64px 16px 24px; }
        .hero-bg{
          position:absolute; inset:-10% -10% auto -10%;
          height:360px; z-index:-1; filter: blur(40px) saturate(120%);
          background:
            radial-gradient(60% 60% at 75% 20%, #8b5cf6 0%, transparent 60%),
            radial-gradient(60% 60% at 25% 10%, #22c55e 0%, transparent 60%),
            radial-gradient(80% 60% at 50% 80%, #06b6d4 0%, transparent 70%);
          opacity: .35;
        }
        .hero-inner{ max-width:960px; margin:0 auto; text-align:center; }
        .eyebrow{ font-size:.9rem; color:#64748b; }
        h1{ font-size:2.4rem; margin:10px 0 8px; line-height:1.2 }
        .accent{ color:#0ea5e9 }
        .sub{ color:#475569; margin:0 auto 18px; max-width:36ch }
        .br{ display:none }
        .cta{ display:flex; gap:12px; justify-content:center; margin:16px 0 12px }
        .btn{ padding:12px 18px; border-radius:12px; font-weight:600; display:inline-block }
        .primary{ background:#7c3aed; color:#fff; box-shadow:0 10px 22px rgba(124,58,237,.25) }
        .ghost{ border:1px solid #cbd5e1; color:#0f172a; background:#fff }
        .highlights{ display:flex; gap:10px; justify-content:center; color:#334155; margin-top:8px }
        .highlights li{ background:#f1f5f9; border-radius:10px; padding:8px 12px }
        .why{ padding:32px 16px }
        .why h2{ text-align:center; margin-bottom:18px }
        .cards{ display:grid; gap:14px; grid-template-columns:1fr; max-width:960px; margin:0 auto }
        .card{ background:#ffffff; border:1px solid #eef2f7; border-radius:18px; padding:18px 16px; box-shadow:0 8px 26px rgba(2,6,23,.05) }
        .dot{ width:18px; height:18px; border-radius:6px; margin-inline-start:auto; margin-bottom:8px }
        .purple{ background:linear-gradient(135deg,#7c3aed,#9333ea) }
        .pink{ background:linear-gradient(135deg,#fb7185,#f43f5e) }
        .green{ background:linear-gradient(135deg,#22c55e,#10b981) }
        .promo{ display:grid; grid-template-columns:auto 1fr auto; align-items:center;
                gap:14px; max-width:960px; margin:8px auto 42px; background:linear-gradient(90deg,#eef2ff,#ecfeff);
                border:1px solid #e5e7eb; padding:16px; border-radius:18px }
        .promo-badge{ background:#4f46e5; color:#fff; padding:18px 8px; border-radius:16px; width:72px; text-align:center; font-weight:700 }
        .pill{ background:#7c3aed; color:#fff; padding:10px 16px; border-radius:999px; font-weight:600 }
        @media (min-width:680px){
          h1{ font-size:3rem }
          .sub{ font-size:1.05rem }
          .cards{ grid-template-columns:repeat(3,1fr) }
          .br{ display:inline }
        }
      `}</style>
    </main>
  );
}
