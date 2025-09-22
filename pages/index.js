// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  // --- Theme (Light/Dark) ---
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const initial = saved || (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', initial);
  }, []);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', next);
    if (typeof window !== 'undefined') localStorage.setItem('theme', next);
  };

  return (
    <>
      <Head>
        <title>Nutrition AI Coach — برنامهٔ هفتگی، لیست خرید و الهام غذایی</title>
        <meta name="description" content="اپ پیشنهادی (غیردرمانی): برنامهٔ هفتگی، لیست خرید خودکار، نکات سبک زندگی و همکاری‌ها. سریع و ساده." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph */}
        <meta property="og:title" content="Nutrition AI Coach" />
        <meta property="og:description" content="برنامهٔ هفتگی + لیست خرید + نکات سبک زندگی" />
        <meta property="og:type" content="website" />
      </Head>

      <header className="topbar" dir="rtl" lang="fa">
        <div className="w">
          <div className="brand">🥗 Nutrition AI Coach</div>
          <nav className="nav">
            <a href="#features">امکانات</a>
            <a href="#how">روند کار</a>
            <a href="#pricing">قیمت‌گذاری</a>
            <Link href="/coach" className="btn small">ساخت برنامه</Link>
            <button aria-label="toggle theme" className="toggle" onClick={toggleTheme}>
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </nav>
        </div>
      </header>

      <main className="page" dir="rtl" lang="fa">
        {/* HERO */}
        <section className="hero">
          <div className="heroBg" />
          <div className="w heroInner">
            <h1>
              الهام غذایی و برنامهٔ هفتگی — <span className="highlight">در چند ثانیه</span>
            </h1>
            <p className="sub">
              برنامهٔ پیشنهادی (غیردرمانی) با ایدهٔ وعده‌ها، جمع‌بندی خرید، و نکات سبک زندگی. مناسب همه؛ سریع و ساده.
            </p>
            <div className="cta">
              <Link href="/coach" className="btn primary">🚀 شروع کن</Link>
              <Link href="/partners" className="btn ghost">🤝 همکاری‌ها و تخفیف‌ها</Link>
            </div>
            <div className="stats">
              <Stat k="۷" v="روز برنامه" />
              <Stat k="🛒" v="لیست خرید خودکار" />
              <Stat k="💧" v="یادآور آب و نکات" />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="section w">
          <h2>چرا این اپ جذابه؟</h2>
          <div className="grid3">
            <Feature emoji="🥗" title="برنامهٔ هفتگی الهام‌بخش" text="صبحانه، ناهار، شام و میان‌وعده — برنامهٔ پیشنهادی متنوع و قابل شخصی‌سازی (غیردرمانی)." />
            <Feature emoji="🛒" title="لیست خرید خودکار" text="مواد اولیهٔ هفته یک‌جا جمع می‌شود تا راحت و هدفمند خرید کنی." />
            <Feature emoji="⚡" title="سریع و ساده" text="چند انتخاب ساده بده، و خروجی تمیز و آماده تحویل بگیر." />
          </div>
        </section>

        {/* HOW + PREVIEW */}
        <section id="how" className="section w">
          <h2>چطور کار می‌کند؟</h2>
          <div className="how">
            <Step n="1" t="هدف را انتخاب کن" d="کاهش وزن، عضله‌سازی یا حفظ وزن + نوع رژیم و سطح فعالیت." />
            <Step n="2" t="«دریافت برنامه» را بزن" d="اپ برایت برنامهٔ روز‌به‌روز می‌سازد." />
            <Step n="3" t="لیست خرید آماده است" d="کل مواد اولیهٔ هفته به‌صورت خودکار جمع‌بندی می‌شود." />
          </div>

          <div className="preview">
            <Card title="📅 پیش‌نمایش «روز ۱»" badge="۱۷۹۰ کالری • 💧 ۲.۲ لیتر">
              <ul className="list">
                <li><b>08:00 صبحانه —</b> اُملت سبزیجات + نان سبوس‌دار</li>
                <li><b>13:30 ناهار —</b> مرغ گریل + سیب‌زمینی + سالاد</li>
                <li><b>19:30 شام —</b> ماست یونانی + سبزیجات</li>
                <li><b>16:30 میان‌وعده —</b> میوه + مغزها</li>
              </ul>
            </Card>
            <Card title="🛒 لیست خرید هفتگی" badge="پیشنهادی" ghost>
              <ul className="list">
                <li>تخم‌مرغ (۱۰ عدد)</li>
                <li>سینهٔ مرغ (۱.۵ کیلو)</li>
                <li>نان سبوس‌دار (۱ بسته)</li>
                <li>کاهو، خیار، گوجه</li>
              </ul>
            </Card>
          </div>

          <div className="center">
            <Link href="/coach" className="btn primary lg">✨ ساخت برنامهٔ من</Link>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section w">
          <h2>پلن‌های قیمت‌گذاری</h2>
          <div className="grid3">
            <Price
              title="رایگان"
              price="۰ تومان"
              items={['ساخت برنامهٔ هفتگی', 'پیش‌نمایش لیست خرید', 'ذخیره در مرورگر']}
              cta={{ href: '/coach', label: 'شروع رایگان' }}
            />
            <Price
              title="پرو"
              price="—"
              badge="به‌زودی"
              items={['لیست خرید قابل دانلود', 'برنامه‌های ذخیره‌شده', 'کدهای تخفیف همکاران', 'سینک ابری']}
              disabled
            />
            <Price
              title="تیمی / همکاری"
              price="—"
              items={['لندینگ اختصاصی', 'باندل کالا/تخفیف', 'دیوارهٔ پرو همکار']}
              cta={{ href: '/partners', label: 'درخواست همکاری' }}
            />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section w">
          <h2>کاربرا چی می‌گن؟</h2>
          <div className="grid3">
            <Testimonial text="برای من که سرم شلوغه عالیه؛ برنامه و خرید هفته‌ای یک‌جا حل شد." name="سحر . الف" />
            <Testimonial text="ایده‌های سالم می‌ده و سریع نتیجه می‌گیرم. ظاهرش هم حرفه‌ایه." name="مهسا . ک" />
            <Testimonial text="لیست خرید خودکارش بی‌نظیره. دقیقاً همینی بود که لازم داشتم." name="حمید . ر" />
          </div>
        </section>

        {/* FAQ */}
        <section className="section w">
          <h2>سوالات پرتکرار</h2>
          <div className="faq">
            <Faq q="این سرویس پزشکی است؟" a="خیر. صرفاً برای الهام غذایی و سبک زندگی سالم است و توصیهٔ پزشکی محسوب نمی‌شود." />
            <Faq q="می‌توانم برای خانواده برنامه بگیرم؟" a="بله؛ می‌توانی پارامترها را تغییر دهی و چند نسخه بسازی." />
            <Faq q="لیست خرید دقیقاً چطور ساخته می‌شود؟" a="از مجموع مواد اولیهٔ وعده‌ها یک لیست تمیز هفتگی می‌سازد." />
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="section w">
          <div className="newsletter">
            <div>
              <h3>خبرنامهٔ ایده‌های سالم</h3>
              <p>ماهانه چند ایدهٔ کاربردی و تخفیف همکاران دریافت کن.</p>
            </div>
            <form onSubmit={(e)=>e.preventDefault()} className="nlForm">
              <input type="email" required placeholder="ایمیل شما" />
              <button className="btn primary" type="submit">عضو شو</button>
            </form>
          </div>
        </section>

        {/* DISCLAIMER + PARTNERS */}
        <section className="section w">
          <div className="note">
            این سرویس صرفاً برای <b>الهام غذایی و سبک زندگی سالم</b> است و توصیهٔ پزشکی محسوب نمی‌شود.
            در صورت بیماری یا رژیم خاص با پزشک/متخصص مشورت کن.
          </div>
          <div className="partnersBox">
            <div>
              <h3>تخفیف‌ها و همکاری‌ها</h3>
              <p>از پیشنهادهای ویژهٔ فروشگاه‌های آنلاین، تجهیزات ورزشی و مربی‌ها استفاده کن.</p>
            </div>
            <Link href="/partners" className="btn ghost">دیدن همکاری‌ها →</Link>
          </div>
        </section>
      </main>

      <footer className="footer" dir="rtl" lang="fa">
        <div className="w fgrid">
          <div>
            <div className="brand">🥗 Nutrition AI Coach</div>
            <p className="muted">ایده‌های غذایی، لیست خرید و نکات سبک زندگی — سریع و کاربردی.</p>
          </div>
          <div>
            <div className="ftitle">لینک‌ها</div>
            <ul className="flinks">
              <li><Link href="/coach">ساخت برنامه</Link></li>
              <li><Link href="/partners">همکاری‌ها</Link></li>
              <li><a href="#pricing">قیمت‌گذاری</a></li>
            </ul>
          </div>
          <div>
            <div className="ftitle">اجتماعی</div>
            <ul className="flinks">
              <li><a href="#" onClick={(e)=>e.preventDefault()}>Instagram</a></li>
              <li><a href="#" onClick={(e)=>e.preventDefault()}>Telegram</a></li>
            </ul>
          </div>
        </div>
        <div className="copy">© {new Date().getFullYear()} Nutrition AI Coach</div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        :root{
          --bg:#fafafa; --surface:#ffffff; --text:#111827; --muted:#6b7280; --border:#e5e7eb;
          --primary:#6d28d9; --primary-ink:#ffffff; --pill:#eef2ff; --pill-ink:#3730a3;
          --hero-blur: 80px;
        }
        :root[data-theme="dark"]{
          --bg:#0b0b10; --surface:#11131a; --text:#eceff7; --muted:#a1a6b3; --border:#242735;
          --primary:#8b5cf6; --primary-ink:#0b0b10; --pill:#1f2333; --pill-ink:#c7c9d4;
        }
        *{box-sizing:border-box}
        html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,-apple-system,Segoe UI,Roboto;}
        a{color:inherit;text-decoration:none}
        .w{max-width:1060px;margin:0 auto;padding:0 16px}

        .topbar{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.7);backdrop-filter:saturate(180%) blur(10px);border-bottom:1px solid var(--border)}
        :root[data-theme="dark"] .topbar{background:rgba(17,19,26,.6)}
        .topbar .w{display:flex;align-items:center;justify-content:space-between;height:56px}
        .brand{font-weight:900}
        .nav{display:flex;gap:16px;align-items:center}
        .btn{
          display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:12px;
          border:1px solid var(--border);background:var(--surface);font-weight:800
        }
        .btn.small{padding:8px 12px}
        .btn.primary{background:var(--primary);color:var(--primary-ink);border-color:transparent;box-shadow:0 12px 24px rgba(109,40,217,.25)}
        .btn.ghost{background:var(--surface)}
        .btn.lg{padding:14px 20px;font-size:18px}
        .toggle{border:none;background:transparent;font-size:18px;cursor:pointer}

        .page{background: radial-gradient(2000px 1200px at 100% -20%, #ede9fe 0%, transparent 40%), var(--bg)}
        :root[data-theme="dark"] .page{background: radial-gradient(2000px 1200px at 100% -20%, rgba(139,92,246,.18) 0%, transparent 40%), var(--bg)}

        .hero{position:relative;overflow:hidden;min-height:76vh;display:grid;place-items:center;padding:40px 0 24px}
        .heroBg{position:absolute;inset:-40px -40px auto -40px;height:60%;background:conic-gradient(from 180deg at 50% 40%, #7c3aed, #22d3ee, #a78bfa, #7c3aed);filter:blur(var(--hero-blur)) saturate(1.1);opacity:.22;pointer-events:none}
        .heroInner{text-align:center;background:rgba(255,255,255,.75);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.6);border-radius:28px;padding:26px 18px;box-shadow:0 20px 60px rgba(0,0,0,.08)}
        :root[data-theme="dark"] .heroInner{background:rgba(17,19,26,.55);border-color:rgba(255,255,255,.08)}
        h1{margin:0 0 8px;font-size:clamp(26px,5vw,40px);line-height:1.35}
        .highlight{color:var(--primary)}
        .sub{margin:0 auto 16px;max-width:720px;color:var(--muted);line-height:1.9}
        .cta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:8px}
        .stats{display:flex;gap:14px;justify-content:center;margin-top:14px;flex-wrap:wrap;color:var(--muted)}
        .stat{background:var(--surface);border:1px solid var(--border);border-radius:999px;padding:8px 14px;display:flex;gap:8px;align-items:center}

        .section{padding:30px 0 10px}
        .section>h2{text-align:center;margin:0 0 18px;font-size:24px}
        .grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        @media (max-width:900px){.grid3{grid-template-columns:1fr}}

        .feature{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:18px;box-shadow:0 12px 30px rgba(0,0,0,.05)}
        .feature .icon{font-size:24px}
        .feature h3{margin:6px 0 4px}
        .feature p{margin:0;color:var(--muted);line-height:1.9}

        .how{display:grid;gap:12px;margin:6px 0 12px}
        .step{display:flex;gap:12px;align-items:flex-start}
        .ic{width:36px;height:36px;border-radius:12px;background:#ede9fe;color:#4c1d95;display:grid;place-items:center;font-weight:800}
        :root[data-theme="dark"] .ic{background:#2a2e42;color:#c7c9d4}

        .preview{display:grid;gap:12px;grid-template-columns:repeat(2,minmax(0,1fr));margin-top:12px}
        @media (max-width:900px){.preview{grid-template-columns:1fr}}
        .card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:14px}
        .cardHead{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px}
        .pill{background:var(--pill);color:var(--pill-ink);padding:4px 10px;border-radius:999px;font-size:12px;font-weight:800}
        .pill.ghost{background:#f3f4f6;color:var(--text)}
        :root[data-theme="dark"] .pill.ghost{background:#1f2333;color:#c7c9d4}
        .list{margin:0;padding-inline-start:20px;line-height:2}

        .center{text-align:center;margin:10px 0 0}

        .price{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 12px 30px rgba(0,0,0,.05);display:flex;flex-direction:column;gap:10px}
        .price h3{margin:0}
        .price .amount{font-size:22px;font-weight:900}
        .price ul{margin:0;padding-inline-start:18px;line-height:2}
        .badge{font-size:12px;border:1px dashed var(--border);border-radius:999px;padding:2px 8px;color:var(--muted)}

        .testimonial{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 12px 30px rgba(0,0,0,.05)}
        .ttext{margin:0 0 8px;line-height:1.9}
        .tname{margin:0;color:var(--muted);font-weight:700}

        .faq{display:grid;gap:10px}
        .qa{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:12px}
        .qa h4{margin:0 0 6px}

        .newsletter{display:flex;justify-content:space-between;align-items:center;gap:12px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:14px}
        @media (max-width:720px){.newsletter{flex-direction:column;align-items:stretch}}
        .nlForm{display:flex;gap:8px}
        .nlForm input{flex:1;border:1px solid var(--border);background:var(--bg);color:var(--text);border-radius:10px;padding:10px}

        .note{background:#fffbe6;border:1px solid #fde68a;color:#78350f;border-radius:14px;padding:12px 14px;line-height:1.9}
        :root[data-theme="dark"] .note{background:#2a230d;border-color:#6e5921;color:#e9d8a6}

        .partnersBox{margin-top:12px;display:flex;justify-content:space-between;align-items:center;gap:12px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:14px}
        @media (max-width:720px){.partnersBox{flex-direction:column;align-items:stretch}}

        .footer{margin-top:40px;background:var(--surface);border-top:1px solid var(--border)}
        .fgrid{display:grid;gap:16px;grid-template-columns:repeat(3,minmax(0,1fr));padding:20px 16px}
        @media (max-width:900px){.fgrid{grid-template-columns:1fr}}
        .muted{color:var(--muted)}
        .ftitle{font-weight:900;margin-bottom:8px}
        .flinks{list-style:none;margin:0;padding:0;display:grid;gap:6px}
        .copy{text-align:center;color:var(--muted);padding-bottom:18px}
      `}</style>
    </>
  );
}

/* ---------- small components ---------- */
function Stat({ k, v }) {
  return <div className="stat"><b>{k}</b><span>{v}</span></div>;
}
function Feature({ emoji, title, text }) {
  return (
    <div className="feature">
      <div className="icon">{emoji}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
function Step({ n, t, d }) {
  return (
    <div className="step">
      <div className="ic">{n}</div>
      <div><h3 style={{margin:'0 0 4px'}}>{t}</h3><p style={{margin:0,color:'var(--muted)',lineHeight:1.9}}>{d}</p></div>
    </div>
  );
}
function Card({ title, badge, children, ghost }) {
  return (
    <div className="card">
      <div className="cardHead">
        <span>{title}</span>
        <span className={`pill ${ghost ? 'ghost': ''}`}>{badge}</span>
      </div>
      {children}
    </div>
  );
}
function Price({ title, price, items, badge, cta, disabled }) {
  return (
    <div className="price">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
        <h3>{title}</h3>{badge && <span className="badge">{badge}</span>}
      </div>
      <div className="amount">{price}</div>
      <ul>{items.map((x,i)=><li key={i}>{x}</li>)}</ul>
      {cta && <Link href={cta.href} className={`btn ${disabled?'ghost':'primary'}`} onClick={(e)=>disabled && e.preventDefault()}>{cta.label}</Link>}
    </div>
  );
}
function Testimonial({ text, name }) {
  return (
    <div className="testimonial">
      <p className="ttext">“{text}”</p>
      <p className="tname">— {name}</p>
    </div>
  );
}
function Faq({ q, a }) {
  return (
    <div className="qa">
      <h4>{q}</h4>
      <p style={{margin:0,color:'var(--muted)',lineHeight:1.9}}>{a}</p>
    </div>
  );
}
