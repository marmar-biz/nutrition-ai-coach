import SEO from "../components/SEO";

export default function About() {
  return (
    <div>
      <SEO 
        title="درباره ما" 
        description="این پروژه با Next.js ساخته شده و هدفش مدیریت رژیم غذایی با هوش مصنوعی است." 
      />
      <div className="card">
        <h1>درباره ما</h1>
        <p>
          این پروژه با Next.js ساخته شده و هدفش کمک به مدیریت رژیم غذایی با استفاده از هوش مصنوعی است.
        </p>
        <p>
          با تحلیل داده‌ها و عادت‌های غذایی، پیشنهادهای شخصی‌سازی‌شده ارائه می‌دهیم تا مسیرت به سمت زندگی سالم‌تر ساده‌تر بشه.
        </p>
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