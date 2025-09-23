// pages/index.js
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Home(){
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <p className="sub">اپ تغذیه و تناسب اندام</p>
          <h1 className="title">
            مربی تغذیه <span className="accent">هوشمند</span>
          </h1>
          <p className="sub">
            برنامه‌ی غذایی شخصی بر اساس <b>هدف</b>، <b>کالری</b> و <b>سبک زندگی</b> + لیست خرید هفتگی و ایده‌های سالم آماده.
          </p>

          <div style={{display:'flex', gap:12, margin:'18px 0 8px', flexWrap:'wrap'}}>
            <Link href="/coach" className="btn btn-primary">شروع رایگان</Link>
            <Link href="/plans" className="btn btn-ghost">مشاهده پلن‌ها</Link>
          </div>

          <div className="stats">
            <div className="stat">• <b>1500+</b> ایده غذایی</div>
            <div className="stat">• <b>۷ روزه</b> پلن آماده</div>
            <div className="stat">• <b>کم‌کالری</b> و سالم</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2 style={{fontSize:28, fontWeight:900, margin:'12px 0 10px'}}>چرا این اپ؟</h2>
          <div className="grid">

            {/* 1) ردیاب کالری روزانه */}
            <div className="card feature">
              <span className="dot" style={{background:'#4ade80'}}></span>
              <div>
                <h3>ردیاب کالری روزانه</h3>
                <p>مانده کالری، پروتئین، کربوهیدرات و چربی را یکجا ببین؛ ساده و قابل لمس.</p>
                <div style={{marginTop:10}}>
                  <Link className="btn btn-ghost" href="/coach">ساخت برنامه امروز</Link>
                </div>
              </div>
            </div>

            {/* 2) پلن ۷ روزه + لیست خرید */}
            <div className="card feature">
              <span className="dot" style={{background:'#a78bfa'}}></span>
              <div>
                <h3>پلن ۷ روزه + لیست خرید</h3>
                <p>برنامه‌ی کامل هفته با وعده‌ها + خروجی لیست خرید یکپارچه و قابل ذخیره.</p>
                <div style={{marginTop:10, display:'flex', gap:10, flexWrap:'wrap'}}>
                  <Link className="btn btn-ghost" href="/plans">دیدن پلن‌ها</Link>
                  <Link className="btn btn-ghost" href="/premium">دانلود PDF (پرمیوم)</Link>
                </div>
              </div>
            </div>

            {/* 3) کتابخانه ایده‌های غذایی */}
            <div className="card feature">
              <span className="dot" style={{background:'#22c1f1'}}></span>
              <div>
                <h3>کتابخانه 1500+ ایده غذایی</h3>
                <p>پیشنهادهای سریع، کم‌کالری و متنوع برای صبحانه/ناهار/شام؛ سازگار با فیلتر حساسیت‌ها.</p>
                <div style={{marginTop:10}}>
                  <Link className="btn btn-ghost" href="/coach">پیشنهاد امروز</Link>
                </div>
              </div>
            </div>

          </div>

          {/* بنر پرمیوم */}
          <div className="card promo" style={{marginTop:18}}>
            <div>
              <h3 style={{margin:'0 0 6px', fontSize:22, fontWeight:900}}>ارتقا به پرمیوم هر زمان</h3>
              <p style={{margin:0, color:'var(--muted)', fontWeight:700}}>
                لیست خرید هفتگی، فیلتر حساسیت‌ها و دانلود PDF.
              </p>
            </div>
            <div className="pill">۳ روز رایگان</div>
            <Link href="/premium" className="btn btn-primary">پلن‌های پرمیوم</Link>
          </div>

        </div>
      </section>
    </>
  )
}
