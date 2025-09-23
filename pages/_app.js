// pages/_app.js
import '@/styles/globals.css'
import Head from 'next/head'
import { Vazirmatn } from 'next/font/google'

const vazir = Vazirmatn({
  subsets: ['arabic'],
  weight: ['400','700','800','900'],
  variable: '--font-farsi'
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>nutrition-ai-coach</title>
      </Head>
      <div dir="rtl" className={vazir.variable}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
