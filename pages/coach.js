// pages/coach.js
import { useMemo, useState } from 'react';

export default function Coach() {
  // --- فرم ---
  const [goal, setGoal] = useState('کاهش وزن');
  const [calories, setCalories] = useState('1800');
  const [diet, setDiet] = useState('متعادل'); // نوع رژیم
  const [activity, setActivity] = useState('متوسط');
  const [days, setDays] = useState(3);
  const [notes, setNotes] = useState('');

  // --- وضعیت ---
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPlan(null);

    try {
      const params = new URLSearchParams({
        goal,
        calories,
        diet,
        activity,
        days: String(days),
        notes,
      });
      const res = await fetch(`/api/diet?${params.toString()}`);
      if (!res.ok) throw new Error('خطا در پاسخ سرور');
      const data = await res.json();
      setPlan(data);
    } catch (err) {
      setError(err?.message || 'مشکلی پیش آمد.');
    } finally {
      setLoading(false);
    }
  }

  // ---- نرمال‌سازی خروجی‌های مختلف API به ساختار روز/آیتم ----
  function parseToDaysBlocks(payload) {
    // هدف: برگرداندن آرایه‌ای از { title: 'روز ۱', items: ['…','…'] }
    if (!payload) return [];

    // حالت 1: { days:[{title, items:[]}, ...] }
    if (Array.isArray(payload.days)) {
      return payload.days
        .map(d => ({
          title: d.title || '',
          items: (d.items || [])
            .map(x => (typeof x === 'string' ? x.trim() : ''))
            .filter(Boolean),
        }))
        .filter(d => d.items.length);
    }

    // حالت 2: { plan: { days:[...] } }
    if (payload.plan && Array.isArray(payload.plan.days)) {
      return parseToDaysBlocks(payload.plan);
    }

    // حالت 3: { plan: [...] } یا [...]
    const arr =
      Array.isArray(payload.plan) ? payload.plan :
      Array.isArray(payload) ? payload : null;

    if (arr) {
      // تلاش برای تقسیم به روزها از روی الگوی «روز …:» یا «Day …:»
      const chunks = [];
      let current = { title: 'روز ۱', items: [] };
      let dayIndex = 1;

      const lines = arr
        .map(x => (typeof x === 'string' ? x : ''))
        .join('\n')
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      for (const line of lines) {
        const isDayHeader = /^روز\s*\d+|^Day\s*\d+/i.test(line.replace(/:$/, ''));
        if (isDayHeader) {
          // push قبلی
          if (current.items.length) chunks.push(current);
          dayIndex += current.items.length ? 1 : 0;
          current = {
            title: line.replace(/:$/, '') || `روز ${dayIndex}`,
            items: [],
          };
        } else {
          current.items.push(line);
        }
      }
      if (current.items.length) chunks.push(current);

      // اگر هیچ هدر روز نبود، یک روز بساز
      if (!chunks.length && lines.length) {
        chunks.push({ title: 'برنامه پیشنهادی', items: lines });
      }
      return chunks;
    }

    // حالت 4: { plan: '…' } یا '…'
    const str = typeof payload.plan === 'string' ? payload.plan :
                typeof payload === 'string' ? payload : '';
    if (str) {
      const items = str.split('\n').map(s => s.trim()).filter(Boolean);
      return [{ title: 'برنامه پیشنهادی', items }];
    }

    return [];
  }

  const dayBlocks = useMemo(() => parseToDaysBlocks(plan), [plan]);

  // متن کامل برای کپی/دانلود
  const fullText = useMemo(() => {
    if (!dayBlocks.length) return '';
    const header = `🎯 هدف: ${goal} | کالری: ${calories} | رژیم: ${diet} | فعالیت: ${activity} | روزها: ${days}`;
    const lines = [header, ''];
    dayBlocks.forEach(d => {
      lines.push(`== ${d.title} ==`);
      d.items.forEach(it => lines.push(`- ${it}`));
      lines.push('');
    });
    return lines.join('\n');
  }, [dayBlocks, goal, calories, diet, activity, days]);

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(fullText || '');
      alert('کل برنامه کپی شد ✅');
    } catch {
      alert('کپی ممکن نشد.');
    }
  }

  function downloadTxt() {
    const blob = new Blob([fullText || ''], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diet-plan.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function shareNative() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'برنامه غذایی', text: fullText });
      } catch { /* cancelled */ }
    } else {
      copyAll();
    }
  }

  return (
    <div className="wrap" dir="rtl" lang="fa">
      <div className="card">
        <h1>مربی تغذیه هوشمند</h1>
        <p className="lead">
          فرم را کامل کن و <strong>دریافت برنامه</strong> را بزن؛
          خروجی به صورت روزبه‌روز نمایش داده می‌شود.
        </p>

        <form onSubmit={handleSubmit} className="grid">
          <label>
            هدف
            <select value={goal} onChange={e => setGoal(e.target.value)}>
              <option>کاهش وزن</option>
              <option>افزایش وزن</option>
              <option>حفظ وزن</option>
            </select>
          </label>

          <label>
            کالری روزانه (تقریبی)
            <input
              type="number"
              inputMode="numeric"
              min="800" max="5000" step="50"
              value={calories}
              onChange={e => setCalories(e.target.value)}
              placeholder="مثلاً 1800"
              required
            />
          </label>

          <label>
            نوع رژیم
            <select value={diet} onChange={e => setDiet(e.target.value)}>
              <option>متعادل</option>
              <option>کم‌کربوهیدرات</option>
              <option>پرفیبر</option>
              <option>کِتو</option>
              <option>مدیترانه‌ای</option>
              <option>گیاه‌خواری</option>
              <option>وِگان</option>
            </select>
          </label>

          <label>
            سطح فعالیت
            <select value={activity} onChange={e => setActivity(e.target.value)}>
              <option>کم</option>
              <option>متوسط</option>
              <option>زیاد</option>
            </select>
          </label>

          <label>
            تعداد روزها
            <input
              type="number"
              min="1" max="7"
              value={days}
              onChange={e => setDays(Number(e.target.value))}
            />
          </label>

          <label className="col-span">
            توضیحات / حساسیت‌ها / ترجیحات (اختیاری)
            <textarea
              rows={4}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="مثلاً: بدون لاکتوز، بدون گلوتن، صبح‌ها وقت ندارم، حساسیت به بادام ..."
            />
          </label>

          <div className="actions">
            <button type="submit" disabled={loading}>
              {loading ? 'در حال تولید…' : 'دریافت برنامه'}
            </button>
          </div>
        </form>

        {error && <div className="error">⚠️ {error}</div>}

        {dayBlocks.length > 0 && (
          <div className="result">
            <div className="resultHead">
              <h2>برنامه پیشنهادی</h2>
              <div className="btns">
                <button type="button" className="ghost" onClick={copyAll}>کپی همه</button>
                <button type="button" className="ghost" onClick={downloadTxt}>دانلود txt</button>
                <button type="button" className="ghost" onClick={shareNative}>اشتراک</button>
                <button type="button" className="ghost danger" onClick={() => setPlan(null)}>پاکسازی</button>
              </div>
            </div>

            <div className="days">
              {dayBlocks.map((d, idx) => (
                <details key={idx} open>
                  <summary>{d.title || `روز ${idx + 1}`}</summary>
                  <ul>
                    {d.items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .wrap {
          padding: 32px 16px 64px;
          display: flex;
          justify-content: center;
        }
        .card {
          width: 100%;
          max-width: 980px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
          padding: 28px;
        }
        h1 { margin: 0 0 6px; font-size: 28px; }
        .lead { margin: 0 0 22px; color: #555; line-height: 1.9; }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 12px;
        }
        @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
        .col-span { grid-column: 1 / -1; }

        label { display: grid; gap: 8px; font-weight: 600; }
        select, input, textarea {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 16px;
          outline: none;
          transition: box-shadow .2s, border-color .2s;
          background: #fff;
        }
        select:focus, input:focus, textarea:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124,58,237,.15);
        }

        .actions { grid-column: 1 / -1; display: flex; justify-content: flex-start; }
        button {
          border: 0; border-radius: 12px; background: #7c3aed;
          color: #fff; padding: 12px 18px; font-size: 16px; font-weight: 700;
          cursor: pointer; box-shadow: 0 6px 18px rgba(124,58,237,.25);
        }
        button[disabled] { opacity: .7; cursor: default; box-shadow: none; }

        .ghost {
          background: transparent; color: #7c3aed;
          border: 1px solid rgba(124,58,237,.35); box-shadow: none;
        }
        .ghost.danger { color: #b91c1c; border-color: rgba(185,28,28,.35); }

        .error {
          margin-top: 16px; background: #fff3f3; color: #b91c1c;
          border: 1px solid #fca5a5; padding: 12px 14px; border-radius: 10px;
          line-height: 1.9;
        }

        .result { margin-top: 22px; border: 1px solid #eef; background: #fafaff; border-radius: 14px; padding: 16px; }
        .resultHead { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
        .btns { display: flex; gap: 8px; flex-wrap: wrap; }

        .days { display: grid; gap: 10px; }
        details {
          border: 1px solid #e6e6ff; background: #fff; border-radius: 10px; padding: 10px 12px;
        }
        summary {
          cursor: pointer; font-weight: 800; margin: 4px 0 8px;
          list-style: none;
        }
        summary::-webkit-details-marker { display: none; }
        ul { margin: 0; padding: 0 18px 8px; line-height: 2; }
        li { margin: 4px 0; }
      `}</style>
    </div>
  );
}