// lib/payments.js
export async function createCheckoutSession({ plan, basePrice, email, coupon, ref }) {
  const res = await fetch('/api/pay/create', {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ plan, basePrice, email, coupon, ref })
  })
  if(!res.ok) throw new Error('payment create failed')
  return res.json() // { redirect }
}
