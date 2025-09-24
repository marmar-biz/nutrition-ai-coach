// pages/api/pay/create.js
import { validateCoupon, applyCoupon } from '@/lib/coupons'
import { createClient } from '@supabase/supabase-js'

const PRICES = { 'free':0, 'premium-monthly':99000, 'premium-yearly':990000 }

function supa() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE
  if(!url || !key) return null
  return createClient(url, key, { auth:{ persistSession:false } })
}

export default async function handler(req, res){
  if(req.method!=='POST') return res.status(405).json({error:'method not allowed'})
  try{
    const { plan='premium-monthly', basePrice, email='', coupon='', ref='' } = req.body || {}
    let price = PRICES[plan] ?? Number(basePrice ?? 0)

    const c = validateCoupon(coupon)
    if(c){ const r = applyCoupon(price, c); price = r.final }

    const db = supa()

    if(price<=0){
      if(db){
        await db.from('payments').insert({
          plan, price, coupon, referrer:ref, email, status:'OK', raw:{ kind:'free' }
        })
      }
      const url = `/pay/callback?status=OK&plan=${encodeURIComponent(plan)}&price=0&ref=${encodeURIComponent(ref||'')}`
      return res.status(200).json({ redirect:url })
    }

    const merchant = process.env.ZARINPAL_MERCHANT_ID
    if(!merchant) return res.status(500).json({error:'merchant id missing'})
    const mode = (process.env.ZARINPAL_MODE||'production').toLowerCase()
    const base = mode==='sandbox'
      ? 'https://sandbox.zarinpal.com/pg/rest/WebGate'
      : 'https://www.zarinpal.com/pg/rest/WebGate'
    const startPay = mode==='sandbox'
      ? 'https://sandbox.zarinpal.com/pg/StartPay'
      : 'https://www.zarinpal.com/pg/StartPay'

    const site = process.env.SITE_URL || `http://${req.headers.host}`
    const CallbackURL = `${site}/api/pay/verify?plan=${encodeURIComponent(plan)}&price=${price}&ref=${encodeURIComponent(ref||'')}`
    const amountRial = price * 10

    const payload = {
      MerchantID: merchant,
      Amount: amountRial,
      Description: `خرید ${plan} در nutrition-ai-coach`,
      CallbackURL,
      Email: email
    }

    const resp = await fetch(`${base}/PaymentRequest.json`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
    })
    const data = await resp.json()

    if(data?.Status===100 && data?.Authority){
      if(db){
        await db.from('payments').insert({
          plan, price, coupon, referrer:ref, email,
          authority: data.Authority,
          status: 'PENDING',
          raw: { request: payload, response: data }
        })
      }
      const redirect = `${startPay}/${data.Authority}`
      return res.status(200).json({ redirect })
    }

    if(db){
      await db.from('payments').insert({
        plan, price, coupon, referrer:ref, email,
        status:'ERROR', raw: { request: payload, response: data }
      })
    }
    return res.status(400).json({ error:'zarinpal request failed', info:data })
  }catch(e){
    console.error(e)
    return res.status(500).json({error:'server error'})
  }
}
