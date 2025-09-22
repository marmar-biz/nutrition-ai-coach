// pages/index.js
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>مربی تغذیه هوشمند | برنامه غذایی، لیست خرید و تناسب اندام</title>
        <meta
          name="description"
          content="برنامه غذایی شخصی، لیست خرید هفتگی، نکات تناسب اندام و نسخه پرمیوم با امکانات حرفه‌ای."
        />
      </Head>

      <main className="home">
        {/* ========== HERO ========== */}
        <section className="hero">
          <div className="hero__content">
            <h1>مربی تغذیه هوشمند 🥗</h1>
            <p>
              برنامه‌ی غذایی شخصی بر اساس هدف، کالری و سبک زندگی—به‌همراه لیست خرید
              هفتگی و ایده‌های تناسب اندام. رایگان شروع کن؛ هر زمان خواستی پرمیوم شو.
            </p>
            <div className="hero__cta">
              <Link href="/coach" className="btn btn--primary">شروع رایگان</Link>
              <a href="#pricing" className="btn btn--ghost">مشاهده پلن‌ها</a>
            </div>
          </div>
          <div className="hero__card">
            <div className="kpi">
              <span>+1500</span>
              <small>ایدهٔ غذایی</small>
            </div>
            <div className="kpi">
              <span>7 روزه</span>
              <small>پلن آماده</small>
            </div>
            <div className="kpi">
              <span>کم‌کالری</span>
              <small>گزینه‌های سالم</small>
            </div>
          </div>
        </section>

        {/* ========== FEATURES ========== */}
        <section id="features" className="section">
          <h2>چرا این اپ؟</h2>
          <div className="cards">
            <div className="card">
              <h3>برنامهٔ غذایی شخصی</h3>
              <p>خروجی روزبه‌روز بر اساس هدف (کاهش وزن/عضله/حفظ)، کالری و رژیم دلخواه.</p>
            </div>
            <div className="card">
              <h3>لیست خرید هوشمند</h3>
              <p>تجمیع مواد لازم هر روز به یک لیست خرید هفتگی—آماده برای سوپرمارکت.</p>
            </div>
            <div className="card">
              <h3>روتین تناسب اندام</h3>
              <p>پیشنهاد تمرینات خانگی سبک + نکات بازیابی و آب‌رسانی روزانه.</p>
            </div>
          </div>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="section section--muted">
          <h2>چطور کار می‌کند؟</h2>
          <ol className="steps">
            <li><b>فرم Coach</b> را پر کن (هدف، کالری، رژیم…)</li>
            <li>روی <b>دریافت برنامه</b> بزن—خروجی روزبه‌روز نمایش داده می‌شود.</li>
            <li>با یک کلیک، <b>لیست خرید</b> و نکات تمرینی را بگیر.</li>
          </ol>
        </section>

        {/* ========== PRICING ========== */}
        <section id="pricing" className="section">
          <h2>پلن‌ها</h2>
          <div className="pricing">
            <div className="price">
              <h3>رایگان</h3>
              <div className="price__num">0 تومان</div>
              <ul>
                <li>برنامهٔ ۳ روزه</li>
                <li>گزینه‌های کم‌کالری پایه</li>
                <li>لیست خرید ساده</li>
              </ul>
              <Link href="/coach" className="btn btn--secondary">شروع رایگان</Link>
            </div>

            <div className="price price--highlight">
              <div className="badge">پیشنهادی</div>
              <h3>پرمیوم</h3>
              <div className="price__num">ماهانه</div>
              <ul>
                <li>برنامهٔ ۷ روزه قابل شخصی‌سازی</li>
                <li>لیست خرید هوشمند + جایگزین‌ها</li>
                <li>سینک PDF/اشتراک‌گذاری</li>
                <li>کد تخفیف فروشگاه‌های همکار</li>
                <li>پشتیبانی اولویت‌دار</li>
              </ul>
              <Link href="/premium" className="btn btn--primary">ارتقا به پرمیوم</Link>
            </div>
          </div>
        </section>

        {/* ========== PARTNERS ========== */}
        <section className="section section--muted">
          <h2>همکاری‌ها</h2>
          <div className="partners">
            <a className="partner" href="#" aria-label="فروشگاه سلامت A">فروشگاه A</a>
            <a className="partner" href="#" aria-label="سوپرمارکت آنلاین B">سوپرمارکت B</a>
            <a className="partner" href="#" aria-label="تجهیزات ورزشی C">تجهیزات C</a>
            <a className="partner" href="#" aria-label="باشگاه و مربی D">باشگاه D</a>
          </div>
          <p className="muted">می‌خوای همکار ما باشی؟ <a href="#contact">ارتباط بگیر</a></p>
        </section>

        {/* ========== TESTIMONIALS ========== */}
        <section className="section">
          <h2>نظر کاربران</h2>
          <div className="testis">
            <blockquote>
              «ساده و کاربردی—هر روز دقیق می‌دونم چی بخورم.»
              <cite> — ن. الف</cite>
            </blockquote>
            <blockquote>
              «لیست خرید هفتگی عالیه، خرید کردن رو خیلی راحت کرد.»
              <cite> — م. س</cite>
            </blockquote>
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <section className="section section--muted">
          <h2>سؤالات متداول</h2>
          <details className="faq">
            <summary>آیا می‌تونم رژیمم رو تغییر بدم؟</summary>
            <p>بله، هر زمان از Coach فرم رو ویرایش کن و دوباره برنامه بگیر.</p>
          </details>
          <details className="faq">
            <summary>پرمیوم چه فرقی دارد؟</summary>
            <p>روزهای بیشتر، لیست خرید هوشمند، خروجی PDF و کدهای تخفیف همکاران.</p>
          </details>
        </section>

        {/* ========== CTA ========== */}
        <section className="cta">
          <h3>آماده‌ای شروع کنی؟ 🚀</h3>
          <div className="hero__cta">
            <Link href="/coach" className="btn btn--primary">دریافت برنامه</Link>
            <Link href="/premium" className="btn btn--ghost">ارتقا به پرمیوم</Link>
          </div>
        </section>

        {/* ========== FOOTER ========== */}
        <footer id="contact" className="footer">
          <div className="footer__grid">
            <div>
              <b>Nutrition AI Coach</b>
              <p className="muted">نسخه‌ی آزمایشی—برای استفاده‌ی عمومی/تجاری حتماً هشدارها و منابع علمی را بررسی کن.</p>
            </div>
            <ul>
              <li><a href="/coach">Coach</a></li>
              <li><a href="#pricing">قیمت‌ها</a></li>
              <li><a href="#features">امکانات</a></li>
            </ul>
            <ul>
              <li><a href="mailto:hello@example.com">hello@example.com</a></li>
              <li><a href="#">حریم خصوصی</a></li>
              <li><a href="#">قوانین</a></li>
            </ul>
          </div>
          <p className="tiny muted">© {new Date().getFullYear()} Nutrition AI Coach</p>
        </footer>
      </main>

      {/* ====== Styles (CSS-in-JSX) ====== */}
      <style jsx>{`
        :global(body){margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,IRANSansX,Tahoma;}
        .home{background:#f8faf7;color:#0f172a;}
        .hero{display:grid;grid-template-columns:1.4fr 1fr;gap:24px;padding:64px 20px 24px;align-items:center;max-width:1100px;margin:0 auto;}
        .hero__content h1{font-size:42px;margin:0 0 12px;color:#166534}
        .hero__content p{color:#475569;line-height:1.9}
        .hero__cta{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap}
        .hero__card{background:#fff;padding:16px;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.06);display:flex;gap:12px;justify-content:space-between}
        .kpi{background:#f1f5f9;border-radius:12px;padding:14px 12px;text-align:center;flex:1}
        .kpi span{display:block;font-weight:800;color:#0f766e}
        .section{max-width:1100px;margin:0 auto;padding:48px 20px;text-align:center}
        .section h2{margin:0 0 20px;color:#0f766e}
        .section--muted{background:#f1f5f9;padding:48px 20px}
        .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .card{background:#fff;border-radius:14px;padding:18px;text-align:right;box-shadow:0 8px 24px rgba(0,0,0,.05)}
        .steps{max-width:720px;margin:0 auto;text-align:right}
        .steps li{margin:10px 0}
        .pricing{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;align-items:stretch}
        .price{background:#fff;border-radius:16px;padding:22px;box-shadow:0 10px 30px rgba(0,0,0,.06);text-align:right;position:relative}
        .price__num{font-size:22px;font-weight:800;color:#1f2937;margin:6px 0 10px}
        .price ul{list-style:none;padding:0;margin:0 0 12px}
        .price li{margin:8px 0;color:#334155}
        .price--highlight{border:2px solid #10b981}
        .badge{position:absolute;top:-10px;left:16px;background:#10b981;color:#fff;padding:4px 10px;border-radius:999px;font-size:12px}
        .partners{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:12px}
        .partner{background:#fff;padding:14px;border-radius:12px;box-shadow:0 6px 16px rgba(0,0,0,.05);text-align:center;color:#475569;text-decoration:none}
        .testis{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;text-align:right}
        blockquote{background:#f8fafc;border-right:4px solid #10b981;margin:0;border-radius:12px;padding:16px}
        .faq{max-width:800px;margin:10px auto;text-align:right;background:#fff;border-radius:12px;padding:12px;box-shadow:0 6px 16px rgba(0,0,0,.05)}
        .cta{padding:40px 20px;text-align:center;background:#ecfdf5}
        .footer{background:#0f172a;color:#e2e8f0;margin-top:32px;padding:28px 20px}
        .footer__grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr;gap:16px}
        .footer a{color:#a7f3d0;text-decoration:none}
        .muted{color:#94a3b8}
        .tiny{font-size:12px;text-align:center;margin-top:12px}
        .btn{display:inline-block;border-radius:10px;padding:10px 16px;text-decoration:none;font-weight:700}
        .btn--primary{background:#16a34a;color:#fff}
        .btn--secondary{background:#0ea5e9;color:#fff}
        .btn--ghost{border:1.5px solid #16a34a;color:#166534}
        @media (max-width: 900px){
          .hero{grid-template-columns:1fr;padding-top:40px}
          .cards{grid-template-columns:1fr}
          .pricing{grid-template-columns:1fr}
          .partners{grid-template-columns:1fr 1fr}
          .testis{grid-template-columns:1fr}
          .footer__grid{grid-template-columns:1fr}
        }
      `}</style>
    </>
  );
}