// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <main className="page">
      {/* HERO */}
      <section className="hero">
        <div className="bg" aria-hidden />
        <div className="hero__content">
          <div className="brand">
            <div className="appicon" aria-hidden>
              {/* آیکون میوه ساده با SVG (سبک YAZIO) */}
              <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
                <circle cx="26" cy="26" r="18" fill="#FF5A79"/>
                <circle cx="18" cy="20" r="10" fill="#00C2FF"/>
                <path d="M31 9c3 3 3 6-2 7-5 1-8-2-6-6 1.5-3 4-4 8-1z" fill="#8FD36E"/>
                <circle cx="33" cy="33" r="5" fill="#FFD166"/>
              </svg>
            </div>
            <h1 className="title">
              مربی تغذیه <span>هوشمند</span>
            </h1>
            <p className="subtitle">
              ردیابی کالری و برنامه‌ی غذایی شخصی با <strong>هوش مصنوعی</strong>، به‌همراه
              <strong> لیست خرید</strong> و <strong>ایده‌های تناسب اندام</strong>.
            </p>
            <div className="cta">
              <Link href="/coach" className="btn btn--primary">شروع رایگان</Link>
              <Link href="/premium" className="btn btn--ghost">پلن‌های پرمیوم</Link>
            </div>

            {/* چیپ‌های وضعیت/مزایا */}
            <ul className="chips">
              <li>✔ روتین ۷ روزه</li>
              <li>✔ کم‌کالری</li>
              <li>✔ خروجی PDF</li>
            </ul>
          </div>
        </div>
      </section>

      {/* امروزت با ما (کارت‌ها شبیه اپ) */}
      <section className="cards">
        <div className="grid">
          <article className="card">
            <header>
              <span className="pill pill--blue">امروز</span>
              <span className="mini">۲۵ تیر</span>
            </header>
            <div className="ring">
              <div className="ring__circle" />
              <div className="ring__value">
                <b>۷۵۸</b>
                <span>کالری باقی‌مانده</span>
              </div>
            </div>
            <ul className="stats">
              <li><b>کربوهیدرات</b><span>۷۴ / ۱۸۶ g</span></li>
              <li><b>پروتئین</b><span>۴۷ / ۱۰۳ g</span></li>
              <li><b>چربی</b><span>۵۱ / ۵۵ g</span></li>
            </ul>
          </article>

          <article className="card">
            <header>
              <span className="pill pill--violet">وعده بعدی</span>
              <span className="mini">صبحانه</span>
            </header>
            <div className="meal">
              <div className="meal__badge">۴۵۰ / ۵۰۰ کالری</div>
              <h3>اُملت + نان سبوس‌دار + آووکادو</h3>
              <p>نکته: قبل از صبحانه یک لیوان آب یا چای سبز بنوش.</p>
            </div>
            <Link href="/coach" className="btn btn--line">ساخت برنامه امروز</Link>
          </article>
        </div>
      </section>

      {/* مزایا */}
      <section className="features">
        <h2>چرا این سبک را انتخاب کردیم؟</h2>
        <div className="fgrid">
          <div className="fcard">
            <span className="ficon i1" />
            <h3>UI شاد و مینیمال</h3>
            <p>رنگ‌های شاد + گرادیان‌های لطیف = انگیزه‌ی بیشتر برای ادامه.</p>
          </div>
          <div className="fcard">
            <span className="ficon i2" />
            <h3>تمرکز روی عمل‌پذیری</h3>
            <p>کارت‌ها و چیپ‌ها اطلاعات را سریع و قابل لمس نشان می‌دهند.</p>
          </div>
          <div className="fcard">
            <span className="ficon i3" />
            <h3>سریع و سبک</h3>
            <p>بدون تصویر سنگین؛ همه چیز با CSS/ SVG رندر می‌شود.</p>
          </div>
        </div>
      </section>

      {/* تیزر پلن‌ها */}
      <section className="plans">
        <div className="plans__card">
          <div className="plans__text">
            <h3>۳ روز رایگان + ارتقا به پرمیوم هر زمان</h3>
            <p>لیست خرید هفتگی، فیلتر حساسیت‌ها و دانلود PDF.</p>
          </div>
          <Link href="/premium" className="btn btn--primary btn--sm">دیدن پلن‌ها</Link>
        </div>
      </section>

      {/* استایل‌ها */}
      <style jsx>{`
        .page { min-height: 100vh; display: flex; flex-direction: column; gap: 40px; }

        /* ==== HERO ==== */
        .hero { position: relative; overflow: hidden; padding: 56px 16px 24px; }
        .bg {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(1200px 600px at 100% -10%, rgba(56,189,248,.25), transparent 55%),
            radial-gradient(900px 500px at -10% 10%, rgba(167,139,250,.23), transparent 55%),
            linear-gradient(180deg, #F4FBFF 0%, #FFFFFF 70%);
        }
        .hero__content { position: relative; z-index: 1; max-width: 1000px; margin: 0 auto; }
        .brand { text-align: center; }
        .appicon {
          width: 64px; height: 64px; border-radius: 16px;
          margin: 0 auto 8px; display:grid; place-items:center;
          background: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,.06);
        }
        .title { font-size: 40px; line-height: 1.15; margin: 8px 0 8px; color:#0f172a; letter-spacing:-.02em; }
        .title span { color:#0ea5e9; } /* آبی روشن مثل YAZIO */
        .subtitle { max-width: 760px; margin: 0 auto 16px; color:#334155; line-height:1.9; font-size:16px; }
        .cta { display:flex; justify-content:center; gap:12px; margin-bottom: 10px; }

        .btn {
          display:inline-flex; align-items:center; justify-content:center;
          border-radius: 14px; padding: 14px 18px; font-weight:800; text-decoration:none;
          transition: transform .06s ease, box-shadow .2s ease, background .2s ease; border:1px solid transparent;
        }
        .btn--primary { color:#fff; background: linear-gradient(135deg, #6366F1, #06B6D4); box-shadow: 0 12px 24px rgba(99,102,241,.25);}
        .btn--primary:hover { transform: translateY(-1px); }
        .btn--ghost { color:#0ea5e9; background:#fff; border-color:#bae6fd; }
        .btn--ghost:hover { background:#f0f9ff; transform: translateY(-1px); }
        .btn--line { color:#6366F1; background:#fff; border-color:#c7d2fe; }
        .btn--sm { padding: 12px 14px; border-radius: 12px; }

        .chips { display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-top: 6px; }
        .chips li {
          list-style:none; font-size:12px; color:#0f172a;
          background:#fff; border:1px solid #e2e8f0; border-radius:999px; padding:6px 10px;
          box-shadow: 0 6px 16px rgba(2,6,23,.06);
        }

        /* ==== CARDS (Today-like) ==== */
        .cards { padding: 0 16px; }
        .grid { max-width: 1000px; margin: 0 auto; display:grid; gap:14px; grid-template-columns: 1fr; }
        .card {
          background:#fff; border:1px solid #e6f0ff; border-radius: 18px; padding: 16px;
          box-shadow: 0 14px 34px rgba(3, 7, 18, .06);
        }
        .card header { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
        .pill { font-size:12px; padding:6px 10px; border-radius:999px; color:#0f172a; background:#f1f5f9; }
        .pill--blue { background:#e0f2fe; color:#0369a1; }
        .pill--violet { background:#ede9fe; color:#5b21b6; }
        .mini { color:#64748b; font-size:12px; }

        .ring { position: relative; height: 150px; display:grid; place-items:center; margin: 8px 0 12px; }
        .ring__circle {
          width: 150px; height: 150px; border-radius: 999px;
          background:
            conic-gradient(#06b6d4 0 210deg, #e2e8f0 210deg 360deg);
          mask: radial-gradient(circle 58px at 50% 50%, transparent 59px, #000 60px);
        }
        .ring__value { position:absolute; text-align:center; }
        .ring__value b { font-size:28px; color:#0f172a; }
        .ring__value span { display:block; font-size:12px; color:#64748b; margin-top:4px; }

        .stats { display:grid; grid-template-columns: repeat(3,1fr); gap:10px; text-align:center; }
        .stats b { display:block; color:#0f172a; font-size:13px; }
        .stats span { display:block; color:#64748b; font-size:12px; }

        .meal { margin: 6px 0 12px; }
        .meal__badge {
          display:inline-block; font-size:12px; color:#0f172a; background:#e9d5ff; border-radius:10px; padding:6px 8px; margin-bottom:8px;
        }
        .card h3 { margin: 0 0 6px; font-size:16px; color:#0f172a; }
        .card p { margin: 0; color:#475569; font-size:14px; line-height:1.8; }

        /* ==== FEATURES ==== */
        .features { padding: 0 16px; }
        .features h2 { text-align:center; color:#0f172a; font-size:22px; margin-bottom:14px; }
        .fgrid { max-width: 1000px; margin: 0 auto; display:grid; gap:14px; grid-template-columns: 1fr; }
        .fcard { background:#fff; border:1px solid #edf2f7; border-radius:18px; padding:16px; box-shadow: 0 12px 28px rgba(2,6,23,.05); }
        .fcard h3 { margin: 0 0 6px; color:#0f172a; font-size:16px; }
        .fcard p { margin: 0; color:#475569; line-height:1.9; }
        .ficon { display:inline-block; width:28px; height:28px; border-radius:8px; margin-bottom:8px; }
        .i1 { background: linear-gradient(135deg, #22d3ee, #60a5fa); }
        .i2 { background: linear-gradient(135deg, #a78bfa, #f472b6); }
        .i3 { background: linear-gradient(135deg, #34d399, #10b981); }

        /* ==== PLANS TEASER ==== */
        .plans { padding: 0 16px 28px; }
        .plans__card {
          max-width: 1000px; margin: 0 auto;
          background: linear-gradient(135deg, #eef2ff, #e0f2fe);
          border: 1px solid #c7d2fe; border-radius:18px; padding: 16px;
          display:flex; align-items:center; justify-content:space-between; gap:10px;
        }
        .plans__text h3 { margin:0 0 4px; color:#0f172a; font-size:16px; }
        .plans__text p { margin:0; color:#334155; font-size:13px; }
        
        /* Responsive */
        @media (min-width: 768px) {
          .title { font-size: 56px; }
          .subtitle { font-size:18px; }
          .grid { grid-template-columns: 1fr 1fr; }
          .fgrid { grid-template-columns: repeat(3,1fr); }
        }
      `}</style>
    </main>
  );
}
