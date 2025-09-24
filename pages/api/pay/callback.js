// pages/pay/callback.js
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function PayCallback({ status, plan, price, refid }) {
  const ok = status==='OK'
  const fail = status==='FAIL'
  const cancel = status==='CANCEL'

  return (
    <>
      <Navbar/>
      <main className="container" style={{padding:'32px 0 64px'}}>
        <h1>نتیجهٔ پرداخت</h1>
        <div className="card" style={{marginTop:16}}>
          {ok && (
            <>
              <h3>پرداخت موفق ✅</h3>
              <div className="muted">پلن: {plan} — مبلغ: {Number(price||0).toLocaleString()} تومان</div>
              {refid && <div className="muted">کد رهگیری: {refid}</div>}
              <div style={{marginTop:12}}>
                <Link className="btn btn-primary" href="/coach">برو به Coach</Link>
              </div>
            </>
          )}
          {fail && (
            <>
              <h3>پرداخت ناموفق ❌</h3>
              <div className="muted">لطفاً دوباره تلاش کن.</div>
              <div style={{marginTop:12}}>
                <Link className="btn btn-ghost" href="/plans">بازگشت به پلن‌ها</Link>
              </div>
            </>
          )}
          {cancel && (
            <>
              <h3>پرداخت لغو شد ⚠️</h3>
              <div className="muted">هر زمان خواستی می‌تونی ادامه بدی.</div>
              <div style={{marginTop:12}}>
                <Link className="btn btn-ghost" href="/plans">بازگشت به پلن‌ها</Link>
              </div>
            </>
          )}
          {!ok && !fail && !cancel && (
            <>
              <h3>مشکلی پیش آمد</h3>
              <Link className="btn btn-ghost" href="/plans">بازگشت</Link>
            </>
          )}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({ query }){
  const { status='', plan='', price='', refid='' } = query
  return { props:{ status, plan, price, refid } }
}
