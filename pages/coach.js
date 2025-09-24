// pages/coach.js
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'
import DownloadPDF from '@/components/DownloadPDF'

export default function Coach(){
  const [form, setForm] = useState({ goal:'کاهش وزن', calories:1800, diet:'متعادل', days:3, notes:'' })
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const res = await fetch('/api/plan',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
      const data = await res.json()
      setPlan(data)
    }finally{ setLoading(false) }
  }

  const set = (k)=>(e)=> setForm(v=>({...v,[k]: e.target.value}))

  return (
    <>
      <Navbar/>
      <main className="container" style={{padding:'24px 0 64px'}}>
        <h1 className="mb-16">مربی تغذیه هوشمند 🥗</h1>

        <form onSubmit={submit} className="card" style={{display:'grid',gap:'12px'}}>
          <label>هدف
            <select value={form.goal} onChange={set('goal')} style={{width:'100%',padding:'12px',borderRadius:'12px',border:'1px solid var(--muted)'}}>
              <option>کاهش وزن</option>
              <option>افزایش عضله</option>
              <option>ثبات وزن</option>
            </select>
          </label>

          <label>کالری روزانه (تقریبی)
            <input type="number" value={form.calories} onChange={set('calories')} style={{width:'100%',padding:'12px',borderRadius:'12px',border:'1px solid var(--muted)'}}/>
          </label>

          <label>نوع رژیم
            <select value={form.diet} onChange={set('diet')} style={{width:'100%',padding:'12px',borderRadius:'12px',border:'1px solid var(--muted)'}}>
              <option>متعادل</option>
              <option>پروتئین بالا</option>
              <option>گیاهی</option>
            </select>
          </label>

          <label>تعداد روزها
            <input type="number" min="1" max="7" value={form.days} onChange={set('days')} style={{width:'100%',padding:'12px',borderRadius:'12px',border:'1px solid var(--muted)'}}/>
          </label>

          <label>توضیحات/حساسیت‌ها (اختیاری)
            <textarea value={form.notes} onChange={set('notes')} rows={3} style={{width:'100%',padding:'12px',borderRadius:'12px',border:'1px solid var(--muted)'}}/>
          </label>

          <button className="btn btn-primary" disabled={loading}>{loading?'در حال ساخت…':'دریافت برنامه'}</button>
        </form>

        {plan && (
          <section className="mt-32">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
              <h2 className="mb-16">خروجی برنامه</h2>
              <DownloadPDF plan={plan} meta={form}/>
            </div>

            {plan.days.map((d,idx)=>(
              <div key={idx} className="card mb-16">
                <div className="muted mb-8">روز {idx+1} — کالری کل: {d.total} | آب: {d.water} لیتر</div>
                {d.meals.map((m, i)=>(
                  <div key={i} className="card" style={{margin:'8px 0', background:'#fafbff'}}>
                    <b>{m.time} — {m.title}</b>
                    <div className="muted">کالری {m.kcal}</div>
                    <div>غذاها: {m.foods.join(' + ')}</div>
                    <div className="muted">نکته: {m.tip}</div>
                  </div>
                ))}
              </div>
            ))}
          </section>
        )}
      </main>
      <Footer/>
    </>
  )
}
