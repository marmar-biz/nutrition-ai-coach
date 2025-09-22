// pages/coach.js
import { useState, useRef } from 'react';

const GOAL_OPTS = [
  { value: 'weight_loss', label: 'کاهش وزن' },
  { value: 'muscle_gain', label: 'افزایش عضله' },
  { value: 'maintenance', label: 'حفظ وزن' },
];

const DIET_OPTS = [
  { value: 'balanced', label: 'متعادِل' },
  { value: 'low_carb', label: 'کم‌کربوهیدرات' },
  { value: 'high_protein', label: 'پروتئین بالا' },
  { value: 'vegetarian', label: 'گیاه‌خواری' },
];

const ACTIVITY_OPTS = [
  { value: 'low', label: 'کم' },
  { value: 'medium', label: 'متوسط' },
  { value: 'high', label: 'زیاد' },
];

export default function Coach() {
  const [goal, setGoal] = useState('weight_loss');
  const [calories, setCalories] = useState(1800);
  const [dietType, setDietType] = useState('balanced');
  const [activity, setActivity] = useState('medium');
  const [days, setDays] = useState(3);
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState(null);

  const resultRef = useRef(null);

  function validate() {
    if (!calories || isNaN(calories)) return 'کالری روزانه را درست وارد کن.';
    if (calories < 900 || calories > 4500) return 'کالری باید بین ۹۰۰ تا ۴۵۰۰ باشد.';
    if (!days || isNaN(days)) return 'تعداد روزها را درست وارد کن.';
    if (days < 1 || days > 7) return 'تعداد روزها باید بین ۱ تا ۷ باشد.';
    return '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }

    setLoading(true);
    setError('');
    setPlan(null);

    try {
      const qs = new URLSearchParams({
        goal,
        calories: String(calories),
        dietType,
        activity,
        days: String(days),
        notes: notes || '',
      });
      const res = await fetch(`/api/diet?${qs.toString()}`);
      if (!res.ok) throw new Error('خطای سرور؛ لطفاً دوباره تلاش کن.');
      const data = await res.json();
      setPlan(data);
      // اسکرول نرم به نتیجه
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } catch (err) {
      setError(err.message || 'مشکلی پیش آمد.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>🥗 مربی تغذیه هوشمند</h1>
        <p className="lead">
          فرم را کامل کن و روی <b>دریافت برنامه</b> بزن؛ خروجی به‌صورت روزبه‌روز نمایش داده می‌شود.
        </p>

        <form onSubmit={handleSubmit} className="form">
          {/* هدف */}
          <label className="label">هدف</label>
          <div className="selectWrap">
            <select
              className="select"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              {GOAL_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* کالری */}
          <label className="label">کالری روزانه (تقریبی)</label>
          <input
            className="input"
            type="number"
            inputMode="numeric"
            min={900}
            max={4500}
            step={10}
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
            placeholder="مثلاً ۱۸۰۰"
          />

          {/* نوع رژیم */}
          <label className="label">نوع رژیم</label>
          <div className="selectWrap">
            <select
              className="select"
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
            >
              {DIET_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* سطح فعالیت */}
          <label className="label">سطح فعالیت</label>
          <div className="selectWrap">
            <select
              className="select"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            >
              {ACTIVITY_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* تعداد روزها */}
          <label className="label">تعداد روزها</label>
          <input
            className="input"
            type="number"
            inputMode="numeric"
            min={1}
            max={7}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            placeholder="۳"
          />

          {/* نوت‌ها */}
          <label className="label">توضیحات / حساسیت‌ها / ترجیحات (اختیاری)</label>
          <textarea
            className="textarea"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="مثلاً: بدون لاکتوز، بدون گلوتن، صبح‌ها وقت ندارم، حساسیت به بادام ..."
          />

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'در حال تولید…' : 'دریافت برنامه'}
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      </div>

      {/* نتایج */}
      <div ref={resultRef} />

      {plan?.days && Array.isArray(plan.days) && (
        <div className="results">
          <h2>📅 برنامه غذایی پیشنهادی</h2>

          {plan.days.map((d, idx) => (
            <div key={idx} className="dayCard">
              <div className="dayHead">
                <div className="dayTitle">
                  <span className="badge">{idx + 1}</span>
                  <span>{d.title || `روز ${idx + 1}`}</span>
                </div>
                <div className="dayMeta">
                  {typeof d.totalCalories === 'number' && (
                    <span>کالری کل: {d.totalCalories}</span>
                  )}
                  {typeof d.waterLiters === 'number' && (
                    <span>آب: {d.waterLiters} لیتر</span>
                  )}
                </div>
              </div>

              <div className="meals">
                {Array.isArray(d.items) && d.items.map((m, i) => (
                  <div key={i} className="meal">
                    <div className="mealRow">
                      <div className="mealLeft">
                        <span className="mealTitle">{m.meal || 'وعده'}</span>
                        {m.time && <span className="time"> {m.time}</span>}
                        {typeof m.calories === 'number' && (
                          <span className="kcal">{m.calories} کالری</span>
                        )}
                      </div>
                    </div>
                    {Array.isArray(m.items) && m.items.length > 0 && (
                      <div className="foods">
                        <span className="foodsLabel">غذاها:</span>{' '}
                        <span className="foodsText">{m.items.join(' + ')}</span>
                      </div>
                    )}
                    {m.tips && <div className="tips">نکته: {m.tips}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .page {
          padding: 28px 16px 64px;
          direction: rtl;
          color: #111827;
          background: #fafafa;
        }
        .card {
          max-width: 760px;
          margin: 0 auto 28px;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 24px rgba(0,0,0,.04);
        }
        h1 {
          font-size: 28px;
          margin: 0 0 8px;
          line-height: 1.4;
        }
        .lead { margin: 0 0 18px; color: #4b5563; }

        .form {
          display: grid;
          gap: 14px;
        }
        .label { font-weight: 600; }

        .input, .textarea, .select {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 18px;
          line-height: 28px;
          background: #fff;
          color: #111827;
          box-shadow: 0 1px 2px rgba(0,0,0,.04);
        }
        .textarea { resize: vertical; }

        /* استایل حرفه‌ای برای منوهای انتخابی + فلش سفارشی (iOS friendly) */
        .selectWrap { position: relative; display: block; }
        .select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          padding-right: 44px; /* جا برای فلش */
        }
        .selectWrap::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 14px;
          width: 10px;
          height: 10px;
          transform: translateY(-50%) rotate(45deg);
          border-right: 2px solid #6b7280;
          border-bottom: 2px solid #6b7280;
          pointer-events: none;
        }
        select::-ms-expand { display: none; }

        .input:focus, .textarea:focus, .select:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 4px rgba(139,92,246,.15);
        }

        .btn {
          margin-top: 8px;
          background: #7c3aed;
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 14px 18px;
          font-size: 18px;
          box-shadow: 0 8px 18px rgba(124,58,237,.25);
        }
        .btn[disabled] { opacity: .6; }

        .error {
          margin-top: 10px;
          background: #fff1f2;
          border: 1px solid #fecdd3;
          color: #9f1239;
          padding: 12px 14px;
          border-radius: 12px;
          font-weight: 500;
        }

        .results {
          max-width: 760px;
          margin: 0 auto;
        }
        .results h2 {
          font-size: 22px;
          margin: 6px 2px 12px;
        }

        .dayCard {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 14px;
          box-shadow: 0 2px 16px rgba(0,0,0,.04);
        }
        .dayHead {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .dayTitle { display: flex; align-items: center; gap: 8px; font-weight: 700; }
        .badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 999px;
          background: #ede9fe; color: #5b21b6; font-weight: 800;
        }
        .dayMeta { display: flex; gap: 10px; color: #6b7280; font-size: 14px; }

        .meal {
          border: 1px dashed #e5e7eb;
          border-radius: 12px;
          padding: 12px;
          margin-top: 10px;
          background: #fcfcff;
        }
        .mealRow { display: flex; align-items: baseline; justify-content: space-between; gap: 6px; }
        .mealLeft { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
        .mealTitle { font-weight: 800; }
        .time { color: #6b7280; }
        .kcal {
          background: #eef2ff;
          color: #3730a3;
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
        }
        .foods { margin-top: 6px; }
        .foodsLabel { font-weight: 700; color: #111827; }
        .foodsText { color: #374151; }
        .tips {
          margin-top: 6px;
          padding: 10px 12px;
          background: #f8fafc;
          border: 1px solid #eef2f7;
          border-radius: 10px;
          color: #334155;
        }

        @media (max-width: 480px) {
          .input, .textarea, .select { font-size: 16px; }
        }
      `}</style>
    </div>
  );
}
