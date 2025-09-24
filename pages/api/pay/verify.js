// pages/api/pay/verify.js
import { createClient } from '@supabase/supabase-js'

function supa() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE
  if(!url || !key) return null
  return createClient(url, key, { auth:{ persistSession:false } })
}

export default async function handler(req, res){
  const db = supa()
  try{
    const { Authority, Status, plan='', price='0', ref='' } = req.query
    const merchant = process.env.ZARINPAL_MERCHANT_ID
    const mode = (process.env.ZARINPAL_MODE||'production').toLowerCase()
    const base = mode==='sandbox'
      ? 'https://sandbox.zarinpal.com/pg/rest/WebGate'
      : 'https://www.zarinpal.com/pg/rest/WebGate'
    const site = process.env.SITE_URL || `http://${req.headers.host}`

    if(Status!=='OK'){
      if(db){ await db.from('payments').update({ status:'CANCEL' }).eq('authority', Authority) }
      return res.redirect(307, `${site}/pay/callback?status=CANCEL&plan=${plan}&price=${price}&ref=${ref}`)
    }

    const payload = { MerchantID: merchant, Authority, Amount: Number(price||0) * 10 }
    const v = await fetch(`${base}/PaymentVerification.json`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
    })
    const data = await v.json()

    if(data?.Status===100 || data?.Status===101){
      if(db){ await db.from('payments').update({ status:'OK', refid: String(data.RefID||''), raw:{ verify:data } }).eq('authority', Authority) }
      return res.redirect(307, `${site}/pay/callback?status=OK&plan=${plan}&price=${price}&ref=${ref}&refid=${data.RefID||''}`)
    }else{
      if(db){ await db.from('payments').update({ status:'FAIL', raw:{ verify:data } }).eq('authority', Authority) }
      return res.redirect(307, `${site}/pay/callback?status=FAIL&plan=${plan}&price=${price}&ref=${ref}`)
    }
  }catch(e){
    console.error(e)
    const site = process.env.SITE_URL || `http://${req.headers.host}`
    return res.redirect(307, `${site}/pay/callback?status=ERR`)
  }
}
