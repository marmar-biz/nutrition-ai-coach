// pages/plans.js
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CouponBox from '@/components/CouponBox'
import { createCheckoutSession } from '@/lib/payments'
import { useEffect, useState } from 'react'

export default function Plans(){
  const [coupon, setCoupon] = useState({ code:'', final:null, discount:0 })
  const [ref, setRef] = useState('')

  useEffect(()=>{
    if(typeof window==='undefined') return
    setRef(localStorage.getItem('ref') || '')
  },[])

  const goPay = async (plan, basePrice)=>{
    const { redirect } = await createCheckoutSession({
      plan,
      basePrice,
      email: '',                 // می‌تونی ایمیل کاربر را هم اینجا ست کنی
      coupon: coupon.code || '',
      ref
    })
    window.location.href = redirect
  }

  return (
    <>
      <Navbar/>
      <main className="container" style={{padding:'24px 0 64px'}}>
        <h1 className="mb-16">پلن‌ها</h1>

        <div className="grid-3">
          <div className="card">
            <div className="muted mb-8">رایگان</div>
            <h2>۰ تومان</h2>
            <ul className="mt-24">
              <li>پلن ۳ روزه</li>
              <li>ایده‌های کم‌کالری</li>
              <li>بدون دانلود PDF</li>
            </ul>
            <button className="btn btn-ghost mt-24" onClick={()=>goPay('free',0)}>شروع</button>
          </div>

          <div className="card" style={{border:'2px solid var(--brand)'}}>
            <div className="muted mb-8">پیشنهادی</div>
            <h2>۹۹,۰۰۰ / ماه</h2>
            <ul className="mt-24">
              <li>پلن ۷ روزه + لیست خرید</li>
              <li>فیلتر آلرژی/ترجیحات</li>
              <li>دانلود PDF برنامه</li>
            </ul>
            <CouponBox basePrice={99000} onChange={setCoupon}/>
            <button className="btn btn-primary mt-24" onClick={()=>goPay('premium-monthly',99000)}>ارتقا</button>
          </div>

          <div className="card">
            <div className="muted mb-8">سالیانه</div>
            <h2>۹۹۰,۰۰۰ / سال</h2>
            <ul className="mt-24">
              <li>تمام امکانات پرمیوم</li>
              <li>۲ ماه رایگان</li>
              <li>اولویت پشتیبانی</li>
            </ul>
            <CouponBox basePrice={990000} onChange={setCoupon}/>
            <button className="btn btn-primary mt-24" onClick={()=>goPay('premium-yearly',990000)}>خرید سالیانه</button>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}
