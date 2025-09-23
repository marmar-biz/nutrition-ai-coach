// pages/_app.js
import Head from 'next/head'
import '../styles/globals.css'
import { Vazirmatn } from 'next/font/google'

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6d28d9" />
        <meta name="color-scheme" content="light only" />
        <title>Nutrition AI Coach</title>
      </Head>

      {/* فونت سراسری + در دسترس‌پذیری بهتر */}
      <main className={vazirmatn.className}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
