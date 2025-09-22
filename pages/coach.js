// pages/coach.js
import { useEffect, useRef, useState } from 'react';

// یک کمکی کوچک برای محدود کردن اعداد
const clamp = (n, min, max) => Math.max(min, Math.min(max, Number(n || 0)));

export default function Coach() {
  // ورودی‌ها
  const [goal, setGoal] = useState('weight_loss');
  const [calories, setCalories] = useState(1800);
  const [dietType, setDietType] = useState('balanced');
  const [activity, setActivity] = useState('medium');
  const [days, setDays] = useState(3);
  const [notes, setNotes] = useState('');

  // وضعیت‌ها
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');

  // برای اسکرول به نتیجه
  const resultRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setPlan(null);

    // اعتبارسنجی ساده
    const d = clamp(days, 1, 7);
    const c = clamp(calories, 800, 4500);
    if (!c || !d) {
      setError('مقادیر ورودی صحیح نیست.');
      return;
    }

    setLoading(true);
    try {
      const qs = new URLSearchParams({
        goal,
        calories: String(c),
        dietType,
        activity,
        days: String(d),
        notes,
      }).toString();

      const res = await fetch(`/api/diet?${qs}`);
      if (!res.ok) throw new Error('مشکلی در دریافت برنامه از سرور پیش آمد.');
      const data = await res.json();

      // انتظار: data = { days: [...] }
      if (!data || !Array.isArray(data.days)) {
        throw new Error('ساختار خروجی API معتبر نیست.');
      }

      setPlan(data);

      // کمی بعد از رندر، اسکرول به نتیجه
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } catch (err) {
      setError(err.message || 'خطای ناشناخته');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wrap" dir="rtl">
      <div className="card">
        <h1>🥗 مربی تغذیه هوشمند</h1>
        <p className="lead">
          فرم را کامل کن و روی <b>دریافت برنامه</b> بزن؛ خروجی به‌صورت روزبه‌روز نمایش داده می‌شود.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="row">
            <label>هدف</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="weight_loss">کاهش وزن</option>
              <option value="muscle_gain">افزایش عضله</option>
              <option value="maintenance">حفظ وزن</option>
            </select>
          </div>

          <div className="row">
            <label>کالری روزانه (تقریبی)</label>
            <input
              type="number"
              inputMode="numeric"
              min={800}
              max={4500}
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="مثلاً 1800"
            />
          </div>

          <div className="row">
            <label>نوع رژیم</label>
            <select value={dietType} onChange={(e) => setDietType(e.target.value)}>
              <option value="balanced">متعادل</option>
              <option value="low_carb">کم‌کربوهیدرات</option>
              <option value="high_protein">پروتئین بالا</option>
              <option value="vegetarian">گیاه‌خواری</option>
            </select>
          </div>

          <div className="row">
            <label>سطح فعالیت</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)}>
              <option value="low">کم</option>
              <option value="medium">متوسط</option>
              <option value="high">زیاد</option>
            </select>
          </div>

          <div className="row">
            <label>تعداد روزها</label>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={7}
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="۱ تا ۷"
            />
          </div>

          <div className="row">
            <label>توضیحات / حساسیت‌ها / ترجیحات (اختیاری)</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مثلاً: بدون لاکتوز، بدون گلوتن، صبح‌ها وقت ندارم، حساسیت به بادام..."
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'در حال تولید…' : 'دریافت برنامه'}
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      </div>

      {/* نتایج */}
      <div ref={resultRef}>
        {plan && (
          <div className="results">
            <h2>📅 برنامه غذایی پیشنهادی</h2>
            {plan.days.map((day, i) => (
              <div className="day" key={i}>
                <div className="dayHeader">
                  <h3>{day.title}</h3>
                  <div className="meta">
                    <span>کالری کل: {day.totalCalories}</span>
                    <span>— آب: {day.waterLiters} لیتر</span>
                  </div>
                </div>
                <ul className="meals">
                  {day.items.map((m, j) => (
                    <li key={j} className="meal">
                      <div className="mealHead">
                        <b>{m.meal}</b>
                        <span className="time">{m.time}</span>
                        <span className="cals">کالری: {m.calories}</span>
                      </div>
                      {Array.isArray(m.items) && m.items.length > 0 && (
                        <div className="items">غذاها: {m.items.join('، ')}</div>
                      )}
                      {m.tips && <div className="tips">نکته: {m.tips}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .wrap { max-width: 900px; margin: 0 auto; padding: 24px 16px 60px; }
        .card {
          background: #fff; border-radius: 16px; padding: 24px;
          box-shadow: 0 8px 30px rgba(0,0,0,.06); margin-top: 8px;
        }
        h1 { margin: 0 0 8px; font-size: 28px; }
        .lead { color: #555; margin: 0 0 16px; }

        .form { display: grid; gap: 14px; }
        .row { display: grid; gap: 6px; }
        label { font-weight: 600; }
        input, select, textarea {
          appearance: none; border: 1px solid #e5e7eb; border-radius: 10px;
          padding: 12px 14px; font-size: 15px; background: #fff;
        }
        input:focus, select:focus, textarea:focus {
          outline: none; border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139,92,246,.15);
        }

        button {
          margin-top: 8px; border: 0; border-radius: 12px; padding: 12px 18px;
          background: #7c3aed; color: #fff; font-weight: 700; font-size: 16px;
          cursor: pointer; box-shadow: 0 10px 25px rgba(124,58,237,.25);
          transition: transform .05s ease-in-out, filter .2s;
        }
        button:disabled { filter: grayscale(.3); opacity: .75; cursor: not-allowed; }
        button:active { transform: translateY(1px); }

        .error {
          margin-top: 10px; background: #ffe9ea; color: #b00020;
          border: 1px solid #ffcdd2; padding: 10px 12px; border-radius: 10px;
        }

        .results { margin-top: 24px; }
        .day {
          background: #fff; border: 1px solid #eee; border-radius: 14px;
          padding: 16px; margin-bottom: 16px;
        }
        .dayHeader { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .day h3 { margin: 0; font-size: 20px; }
        .meta { color: #666; font-size: 14px; }
        .meals { list-style: none; padding: 0; margin: 12px 0 0; display: grid; gap: 10px; }
        .meal { background: #fafafa; border: 1px solid #eee; border-radius: 12px; padding: 12px; }
        .mealHead { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .time { color: #6b7280; }
        .cals { color: #6b7280; }
        .items { margin-top: 6px; }
        .tips { margin-top: 4px; color: #4b5563; font-style: italic; }
      `}</style>
    </div>
  );
}
