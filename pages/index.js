import SEO from "../components/SEO";

export default function Home() {
  return (
    <div>
      <SEO 
        title="صفحه اصلی" 
        description="به مربی هوشمند تغذیه خوش اومدی 🍏 اینجا می‌تونی رژیم غذایی، کالری و برنامه‌ی شخصی دریافت کنی." 
      />
      <div className="card">
        <h1>صفحه اصلی</h1>
        <p>به مربی هوشمند تغذیه خوش اومدی 🍏</p>
        <p>
          اینجا می‌تونی رژیم غذایی، کالری و برنامه‌ی شخصی دریافت کنی. هر روز ایده‌های سالم‌تر برای غذا و سبک زندگی می‌گیری.
        </p>
        <a href="/api/test">👉 بزن بریم تست API</a>
      </div>

      <style jsx>{`
        .card {
          background: #fff;
          padding: 20px;
          margin: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
1