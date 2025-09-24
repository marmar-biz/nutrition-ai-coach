// components/CouponBox.js
import { useState } from 'react'
import { validateCoupon, applyCoupon } from '@/lib/coupons'

export default function CouponBox({ basePrice, onChange }){
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState('')
  const [final, setFinal] = useState(basePrice)

  const apply = ()=>{
    const c = validateCoupon(code)
    if(!c){
      setMsg('کوپن معتبر نیست')
      onChange({ code:'', final:basePrice, discount:0 })
      setFinal(basePrice)
      return
    }
    const r = applyCoupon(basePrice, c)
    setFinal(r.final)
    setMsg(`کوپن اعمال شد: ${code} — تخفیف ${r.discount.toLocaleString()} تومان`)
    onChange({ code, final:r.final, discount:r.discount })
  }

  return (
    <div className="card" style={{marginTop:12}}>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
        <input value={code} onChange={e=>setCode(e.target.value)} placeholder="کد تخفیف"
          style={{padding:'10px 12px',border:'1px solid var(--muted)',borderRadius:12}}/>
        <button className="btn btn-ghost" onClick={apply}>اعمال کوپن</button>
        <div className="muted">قیمت جدید: <b>{final.toLocaleString()}</b> تومان</div>
      </div>
      {msg && <div className="muted" style={{marginTop:6}}>{msg}</div>}
    </div>
  )
}
