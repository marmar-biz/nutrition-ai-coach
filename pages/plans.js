// pages/plans.js
import Link from 'next/link';

export default function PlansPage() {
  return (
    <main dir="rtl" style={{padding:'32px 16px', maxWidth: 900, margin:'0 auto'}}>
      <h1 style={{fontSize: '28px', marginBottom: 12}}>پلن‌ها</h1>
      <p style={{opacity:.8, marginBottom: 24}}>
        این یک صفحه‌ی تست است تا مطمئن شویم مسیر <code>/plans</code> کار می‌کند.
      </p>

      <div style={{
        display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))'
      }}>
        <div style={{border:'1px solid #eee', borderRadius:12, padding:16, background:'#fff'}}>
          <h3>رایگان</h3>
          <ul>
            <li>تولید برنامه پایه</li>
            <li>۳ روز خروجی</li>
          </ul>
          <Link href="/coach" style={{display:'inline-block', marginTop:12, color:'#6D28D9'}}>
            شروع رایگان →
          </Link>
        </div>

        <div style={{border:'1px solid #eee', borderRadius:12, padding:16, background:'#faf5ff'}}>
          <h3>پرمیوم</h3>
          <ul>
            <li>لیست خرید هفتگی</li>
            <li>فیلتر حساسیت‌ها</li>
            <li>دانلود PDF</li>
          </ul>
          <Link href="/premium" style={{display:'inline-block', marginTop:12, color:'#6D28D9'}}>
            ارتقا به پرمیوم →
          </Link>
        </div>
      </div>
    </main>
  );
}
