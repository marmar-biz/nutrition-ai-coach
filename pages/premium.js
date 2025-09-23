// pages/premium.js
import Link from 'next/link';

export default function PremiumPage() {
  return (
    <main dir="rtl" style={{padding:'32px 16px', maxWidth: 880, margin:'0 auto'}}>
      <h1 style={{fontSize:'28px', marginBottom:12}}>پرمیوم</h1>
      <p style={{opacity:.8, marginBottom:24}}>
        این صفحه‌ی تست مسیر <code>/premium</code> است. اگر این را می‌بینی یعنی ۴۰۴ حل شده ✌️
      </p>

      <section style={{border:'1px solid #eee', borderRadius:12, padding:16, background:'#fff'}}>
        <h2 style={{fontSize:'20px'}}>مزایا</h2>
        <ul>
          <li>برنامه‌ی ۷ روزه + لیست خرید</li>
          <li>فیلتر آلرژی‌ها/ترجیحات</li>
          <li>دانلود PDF برنامه</li>
        </ul>
        <div style={{marginTop:16, display:'flex', gap:12}}>
          <Link href="/plans" style={{color:'#6D28D9'}}>مشاهده پلن‌ها</Link>
          <Link href="/coach" style={{color:'#111'}}>بازگشت به Coach</Link>
        </div>
      </section>
    </main>
  );
}
