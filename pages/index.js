export default function Home() {
  return (
    <div className="card">
      <h1>صفحه اصلی 🍏</h1>
      <p>
        به مربی هوشمند تغذیه خوش اومدی!  
        اینجا می‌تونی رژیم غذایی، کالری و برنامه‌ی شخصی دریافت کنی.  
        هر روز ایده‌های سالم‌تر برای غذا و سبک زندگی می‌گیری.
      </p>

      <p>
        <a href="/api/ping" className="link">
          👉 بزن بریم تست API
        </a>
      </p>

      <style jsx>{`
        .card {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          text-align: center;
          line-height: 1.8;
        }
        h1 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #222;
        }
        p {
          font-size: 1.1rem;
          color: #444;
        }
        .link {
          font-weight: bold;
          font-size: 1.1rem;
          text-decoration: none;
          color: purple;
        }
        .link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}