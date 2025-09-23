import Link from "next/link";

export default function Custom404() {
  return (
    <div className="card" style={{marginTop:24}}>
      <h1 style={{marginBottom:12}}>صفحه پیدا نشد 😕</h1>
      <p style={{marginBottom:16}}>آدرس اشتباه است یا جابه‌جا شده. از لینک‌های زیر استفاده کن.</p>
      <div className="row">
        <Link href="/" className="btn btn-primary">خانه</Link>
        <Link href="/coach" className="btn btn-ghost">Coach</Link>
        <Link href="/plans" className="btn btn-ghost">Plans</Link>
      </div>
    </div>
  );
}
