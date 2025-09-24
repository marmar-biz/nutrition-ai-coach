// pages/_app.js
import '@/styles/globals.css'
import { Vazirmatn } from 'next/font/google'
import { useEffect } from 'react'

const vazir = Vazirmatn({
  subsets:['arabic'],
  weight:['400','600','700','900'],
  variable:'--font-fa'
})

export default function App({ Component, pageProps }) {
  useEffect(()=>{
    if(typeof window==='undefined') return
    const url = new URL(window.location.href)
    const r = url.searchParams.get('ref') || url.searchParams.get('r')
    if(r) localStorage.setItem('ref', r)
  },[])
  return (
    <div dir="rtl" lang="fa" className={vazir.variable} style={{fontFamily:'var(--font-fa), system-ui, -apple-system'}}>
      <Component {...pageProps} />
    </div>
  )
}
