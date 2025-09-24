// lib/coupons.js
const COUPONS = [
  { code:'WELCOME20', type:'percent', value:20,  expires:'2099-01-01' },
  { code:'NOW5000',   type:'fixed',   value:5000,expires:'2099-01-01' }
]

export function validateCoupon(code){
  if(!code) return null
  const c = COUPONS.find(x=>x.code.toLowerCase()===code.toLowerCase())
  if(!c) return null
  if(new Date(c.expires) < new Date()) return null
  return c
}

export function applyCoupon(amount, coupon){
  if(!coupon) return { final: amount, discount:0 }
  if(coupon.type==='percent'){
    const discount = Math.round((amount * coupon.value) / 100)
    return { final: Math.max(0, amount - discount), discount }
  }else{
    const discount = coupon.value
    return { final: Math.max(0, amount - discount), discount }
  }
}
