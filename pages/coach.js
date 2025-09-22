// pages/coach.js
import { useState } from 'react';

export default function Coach() {
  const [goal, setGoal] = useState('weight-loss');
  const [calories, setCalories] = useState(1800);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPlan(null);

    try {
      const url = `/api/diet?goal=${encodeURIComponent(goal)}&calories=${encodeURIComponent(
        calories
      )}&notes=${encodeURIComponent(notes)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('خطا در پاسخ سرور');
      const data = await res.json();
      setPlan(data);
    } catch (err) {
      setError(err.message || 'مشکلی پیش آمد');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>مربی تغذیه هوشمند</h1>
        <p>هدفت رو انتخاب کن، کالری تقریبی رو بزن و هر توضیحی داری بنویس؛
        بعد روی دریافت برنامه بزن.</p>

        <form onSubmit={handleSubmit} className="form">
          <label>
            هدف
            <select value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="weight-loss">کاهش وزن</option>
              <option value="muscle-gain">افزایش عضله</option>
              <option value="maintenance">ثبات وزن</option>
            </select>
          </label>

          <label>
            کالری روزانه (تقریبی)
            <input
              type="number"
              min="1000"
              max="4000"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="مثلاً 1800"
            />
          </label>

          <label>
            توضیحات / ترجیحات غذایی (اختیاری)
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مثلاً: گیاه‌خوارم، بدون لاکتوز، صبح‌ها وقت ندارم..."
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'در حال ساخت برنامه...' : 'دریافت برنامه'}
          </button>
        </form>

        {error && <p className="error">❌ {error}</p>}

        {plan && (
          <div className="result">
            <h2>خروجی برنامه</h2>
            <pre>{JSON.stringify(plan, null, 2)}</pre>
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 880px;
          margin: 40px auto;
          padding: 0 16px;
        }
        .card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          padding: 28px;
        }
        h1 { margin: 0 0 8px; font-size: 28px; }
        p { color: #555; line-height: 1.9; }
        .form {
          display: grid;
          gap: 14px;
          margin-top: 16px;
        }
        label {
          display: grid;
          gap: 6px;
          font-weight: 600;
        }
        input, select, textarea {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 16px;
          background: #fafafa;
          outline: none;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #a855f7;
          box-shadow: 0 0 0 3px rgba(168,85,247,0.15);
          background: #fff;
        }
        button {
          justify-self: start;
          background: #7c3aed;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }
        button[disabled] { opacity: .7; cursor: default; }
        .error { color: #b91c1c; font-weight: 700; }
        .result {
          margin-top: 18px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 14px;
        }
        pre {
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
          line-height: 1.8;
        }
      `}</style>
    </div>
  );
}
