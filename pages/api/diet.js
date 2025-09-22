// pages/api/diet.js
// ساده، تمیز و بدون وابستگی بیرونی — آماده‌ی اتصال به Supabase/LLM در آینده

/**
 * ورودی‌های مورد انتظار از Query:
 * goal        : 'weight_loss' | 'muscle_gain' | 'maintain'
 * calories    : number (تقریبی)
 * dietType    : 'balanced' | 'low_carb' | 'keto' | 'vegetarian' | 'vegan'
 * activity    : 'low' | 'medium' | 'high'
 * days        : number (1..7)
 * notes       : string (دلخواه: حساسیت‌ها/ترجیحات/محدودیت زمان و ...)
 *
 * خروجی: { days: [ { title, totalCalories, waterLiters, items: [ { meal, time, items, calories, tips } ] } ] }
 */

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function planForDiet(dietType) {
  const commonVeggies = ['سالاد سبز', 'خیار و گوجه', 'سبزیجات بخارپز', 'بروکلی', 'هویج'];
  const proteins = {
    balanced: ['مرغ گریل', 'ماهی', 'تخم‌مرغ', 'گوشت کم‌چرب', 'ماست یونانی'],
    low_carb: ['مرغ/ماهی', 'تخم‌مرغ', 'پنیر', 'گوشت کم‌چرب', 'ماست یونانی بدون شکر'],
    keto: ['تخم‌مرغ+آووکادو', 'استیک+کره', 'سالمون+روغن زیتون', 'مرغ+پنیر', 'بیکن+تخم‌مرغ'],
    vegetarian: ['توفو', 'تخم‌مرغ', 'حبوبات', 'پنیر کم‌چرب', 'عدس'],
    vegan: ['توفو', 'تمپه', 'عدس', 'نخود', 'لوبیا']
  };

  const carbs = {
    balanced: ['برنج قهوه‌ای', 'نان سبوس‌دار', 'سیب‌زمینی', 'کینوا', 'جو پرک'],
    low_carb: ['کینوا کم', 'برنج گل‌کلم', 'نوشیدنی فیبر', 'نان جو کم'],
    keto: ['زودل کدو', 'برنج گل‌کلم', 'نان بادامی', 'سبزیجات پر فیبر'],
    vegetarian: ['برنج قهوه‌ای', 'نان سبوس‌دار', 'کینوا', 'سیب‌زمینی'],
    vegan: ['برنج قهوه‌ای', 'کینوا', 'جو دوسر', 'سیب‌زمینی']
  };

  return {
    breakfast: [
      'املت سبزیجات', 'اوتمیل با میوه', 'اسموتی پروتئینی', 'پنکیک جو', 'تخم‌مرغ+نان سبوس‌دار'
    ],
    snack: [
      'میوه+آجیل', 'ماست+بذر کتان', 'سبزیجات+حمص', 'پروتئین‌بار کم‌شکر', 'ذرت بوداده کم‌روغن'
    ],
    lunch: [
      `${pick(proteins[dietType])} + ${pick(commonVeggies)} + ${pick(carbs[dietType])}`,
      `${pick(proteins[dietType])} + ${pick(carbs[dietType])} + سالاد`
    ],
    dinner: [
      `${pick(proteins[dietType])} + ${pick(commonVeggies)}`,
      `${pick(proteins[dietType])} + ${pick(carbs[dietType])} (کم)`
    ]
  };
}

export default function handler(req, res) {
  try {
    const {
      goal = 'weight_loss',
      calories = '1800',
      dietType = 'balanced',
      activity = 'medium',
      days = '3',
      notes = ''
    } = req.query;

    // نرمال‌سازی و محدوده‌ها
    const d = clamp(parseInt(days, 10) || 3, 1, 7);
    let targetCalories = clamp(parseInt(calories, 10) || 1800, 1000, 4000);

    // تعدیل کالری بر اساس هدف/فعالیت (خیلی ساده ولی کاربردی)
    if (goal === 'weight_loss') targetCalories -= 150;
    if (goal === 'muscle_gain') targetCalories += 200;
    if (activity === 'low') targetCalories -= 100;
    if (activity === 'high') targetCalories += 150;

    // توزیع تقریبی کالری در وعده‌ها
    const dist = { breakfast: 0.25, lunch: 0.35, dinner: 0.30, snack: 0.10 };

    const menu = planForDiet(dietType);

    // آب پیشنهادی بر اساس کالری/فعالیت (حدوداً)
    const waterBase = 1.5 + (targetCalories - 1500) / 1000; // لیتر
    const waterAdj = activity === 'high' ? 0.5 : activity === 'medium' ? 0.25 : 0;
    const waterLiters = Math.max(1.5, Math.round((waterBase + waterAdj) * 10) / 10);

    const daysArr = Array.from({ length: d }).map((_, idx) => {
      const title = `روز ${idx + 1}`;
      const dayPlan = [
        { key: 'breakfast', title: 'صبحانه', time: '08:00', base: pick(menu.breakfast) },
        { key: 'lunch',     title: 'ناهار',   time: '13:30', base: pick(menu.lunch) },
        { key: 'dinner',    title: 'شام',     time: '19:30', base: pick(menu.dinner) },
        { key: 'snack',     title: 'میان‌وعده', time: '16:30', base: pick(menu.snack) }
      ];

      const items = dayPlan.map(p => ({
        meal: p.title,
        time: p.time,
        items: [p.base],
        calories: Math.round(targetCalories * dist[p.key]),
        tips: p.key === 'dinner'
          ? 'شام را سبک‌تر بگیر و ۲-۳ ساعت قبل خواب چیزی نخور.'
          : p.key === 'breakfast'
          ? 'یک لیوان آب ولرم/چای سبز قبل از صبحانه می‌تواند کمک‌کننده باشد.'
          : 'نمک و روغن را کم کن؛ تا جای ممکن سبزیجات اضافه کن.'
      }));

      return {
        title,
        totalCalories: targetCalories,
        waterLiters,
        items
      };
    });

    // اگر یادداشت/حساسیت‌ها وارد شده بود، یک نکته عمومی به آیتم‌ها اضافه می‌کنیم
    if (notes && daysArr.length) {
      daysArr[0].items.push({
        meal: 'نکته‌ی شخصی‌سازی',
        time: '—',
        items: [notes],
        calories: 0,
        tips: 'طبق یادداشت شما، برنامه تا حد ممکن تطبیق داده شده است.'
      });
    }

    res.status(200).json({ days: daysArr });
  } catch (err) {
    res.status(500).json({ error: 'server_error', message: err?.message || 'Unknown error' });
  }
}