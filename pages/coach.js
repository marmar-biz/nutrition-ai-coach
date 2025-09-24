// pages/coach.js
import { useState } from "react";
import Link from "next/link";
// اگر فایل DownloadPDF را داری، این ایمپورت درست است (مسیر نسبی!)
import DownloadPDF from "../components/DownloadPDF";

export default function Coach() {
  const [goal, setGoal] = useState("کاهش وزن");
  const [cal, setCal] = useState(1800);
  const [diet, setDiet] = useState("متعادل");
  const [activity, setActivity] = useState("متوسط");
  const [plan, setPlan] = useState(null);

  const buildPlan = (e) => {
    e.preventDefault();
    // خروجی نمونه‌ی سبک و بدون وابستگی—برای دمو
    const sample = {
      day: 1,
      total: cal,
      water: 2.9,
      meals: [
        {
          name: "صبحانه",
          time: "08:00",
          cal: 410,
          foods: "اُملت سبزیجات",
          tip: "قبل از صبحانه یک لیوان آب ولرم/چای سبز بنوش."
        },
        {
          name: "ناهار",
          time: "13:30",
          cal: 630,
          foods: "مرغ گریل + سیب‌زمینی + سالاد",
          tip: "نمک و روغن را کم کن؛ تا جای ممکن سبزیجات اضافه کن."
        },
        {
          name: "شام",
          time: "19:30",
          cal: 540,
          foods: "تخم‌مرغ آب‌پز + نان سبوس‌دار + سبزیجات",
          tip: "۲–۳ ساعت قبل خواب چیزی نخور."
        },
        {
          name: "میان‌وعده",
          time: "16:30",
          cal: 165,
          foods: "ماست کم‌چرب + خیار",
          tip: "اگر گرسنه نشدی، میان‌وعده را حذف کن."
        }
      ]
    };
    setPlan(sample);
  };

  return (
    <main dir="rtl" style={{ padding: "24px 16px", maxWidth: 880, margin: "0 auto" }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, margin: 0 }}>مربی تغذیهٔ هوشمند</h1>
        <p style={{ color: "#6b7280", marginTop: 8 }}>
          فرم را کامل کن و روی <strong>دریافت برنامه</strong> بزن؛ خروجی هر روز به‌روز می‌شود.
        </p>
      </header>

      {/* فرم تنظیمات */}
      <form
        onSubmit={buildPlan}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,.06)",
          marginBottom: 20
        }}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <label>
            هدف
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              style={field}
            >
              <option>کاهش وزن</option>
              <option>حفظ وزن</option>
              <option>افزایش وزن</option>
            </select>
          </label>

          <label>
            کالری روزانه (تقریبی)
            <input
              type="number"
              value={cal}
              onChange={(e) => setCal(Number(e.target.value))}
              min={1000}
              max={4000}
              step={50}
              style={field}
            />
          </label>

          <label>
            نوع رژیم
            <select value={diet} onChange={(e) => setDiet(e.target.value)} style={field}>
              <option>متعادل</option>
              <option>کم‌کربوهیدرات</option>
              <option>پرفیبر</option>
              <option>پرپروتئین</option>
              <option>سبزی‌خواری</option>
            </select>
          </label>

          <label>
            سطح فعالیت
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              style={field}
            >
              <option>کم</option>
              <option>متوسط</option>
              <option>زیاد</option>
            </select>
          </label>

          <button type="submit" style={primaryBtn}>دریافت برنامهٔ امروز</button>
        </div>
      </form>

      {/* خروجی برنامه */}
      {plan && (
        <section
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,.06)",
            marginBottom: 20
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <span
              style={{
                background: "#e5f3f8",
                color: "#0ea5e9",
                padding: "6px 10px",
                borderRadius: 999
              }}
            >
              روز {plan.day}
            </span>
            <span style={{ color: "#6b7280" }}>کالری کل: {plan.total}</span>
            <span style={{ color: "#6b7280" }}>آب: {plan.water} لیتر</span>
          </div>

          {plan.meals.map((m, idx) => (
            <article
              key={idx}
              style={{
                border: "1px solid #eef1f5",
                borderRadius: 14,
                padding: 14,
                marginBottom: 12
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                <span style={pill}>{m.cal} کالری</span>
                <time style={{ color: "#6b7280" }}>{m.time}</time>
                <strong style={{ marginRight: "auto", fontSize: 16 }}>{m.name}</strong>
              </div>
              <p style={{ margin: "6px 0 10px" }}>
                <b>غذاها:</b> {m.foods}
              </p>
              <p
                style={{
                  background: "#f5fbff",
                  border: "1px dashed #bee3f8",
                  borderRadius: 10,
                  padding: 10,
                  margin: 0
                }}
              >
                <b>نکته:</b> {m.tip}
              </p>
            </article>
          ))}

          {/* اگر کامپوننت PDF را داری، دکمه دانلود نشان داده می‌شود */}
          {DownloadPDF && (
            <div style={{ marginTop: 12 }}>
              <DownloadPDF plan={plan} meta={{ goal, cal, diet, activity }} />
            </div>
          )}
        </section>
      )}

      {/* لینک‌های کمکی */}
      <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link href="/plans" style={linkBtn}>پلن‌ها</Link>
        <Link href="/premium" style={linkBtn}>پرمیوم</Link>
        <Link href="/" style={linkBtn}>خانه</Link>
      </nav>
    </main>
  );
}

const field = {
  width: "100%",
  marginTop: 6,
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#fff",
  outline: "none"
};

const primaryBtn = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "none",
  background: "#6d28d9",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer"
};

const linkBtn = {
  padding: "10px 14px",
  borderRadius: 999,
  background: "#eef1ff",
  color: "#4338ca",
  textDecoration: "none",
  fontWeight: 600
};

const pill = {
  background: "#eef2ff",
  color: "#4338ca",
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700
};
