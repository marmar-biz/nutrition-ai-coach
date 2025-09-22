// pages/api/diet.js
// تولید برنامه‌ی پیشنهادی + لیست خرید + جایگاه تبلیغات (غیردرمانی و امن برای استفاده عمومی)

const MEAL_DB = {
  balanced: {
    breakfast: [
      { name: 'اُملت سبزیجات', calories: 410, ingredients: { 'تخم‌مرغ': 2, 'فلفل دلمه‌ای': 0.5, 'گوجه‌فرنگی': 1, 'قارچ': 3, 'نان سبوس‌دار (برش)': 1 } },
      { name: 'اسموتی پروتئینی', calories: 450, ingredients: { 'شیر یا شیر بادام (لیوان)': 1, 'پروتئین وی (اسکوپ)': 1, 'موز': 1, 'یخ': 3 } },
    ],
    lunch: [
      { name: 'مرغ گریل + سیب‌زمینی + سالاد', calories: 630, ingredients: { 'سینه مرغ (گرم)': 200, 'سیب‌زمینی (عدد)': 1, 'کاهو': 4, 'خیار': 1, 'گوجه‌فرنگی': 1 } },
      { name: 'ماهی کبابی + برنج قهوه‌ای', calories: 640, ingredients: { 'فیله ماهی (گرم)': 180, 'برنج قهوه‌ای (پخته، پیمانه)': 1, 'لیموترش': 1 } },
    ],
    dinner: [
      { name: 'تخم‌مرغ آب‌پز + نان سبوس‌دار + سبزیجات', calories: 540, ingredients: { 'تخم‌مرغ': 2, 'نان سبوس‌دار (برش)': 1, 'خیار': 1, 'گوجه‌فرنگی': 1 } },
      { name: 'ماست یونانی + نان سبوس‌دار + سالاد', calories: 520, ingredients: { 'ماست یونانی (گرم)': 200, 'نان سبوس‌دار (برش)': 1, 'خیار': 1, 'گوجه‌فرنگی': 1 } },
    ],
    snack: [
      { name: 'سیب + بادام', calories: 165, ingredients: { 'سیب': 1, 'بادام (عدد)': 10 } },
      { name: 'ماست کم‌چرب + خیار', calories: 160, ingredients: { 'ماست کم‌چرب (گرم)': 150, 'خیار': 1 } },
    ],
  },

  high_protein: {
    breakfast: [
      { name: 'فرِنج‌تُوست پروتئینی', calories: 480, ingredients: { 'نان سبوس‌دار (برش)': 2, 'تخم‌مرغ': 2, 'شیر کم‌چرب (قاشق غذاخوری)': 2, 'پروتئین وی (اسکوپ)': 1 } },
    ],
    lunch: [
      { name: 'استیک گریل + سبزیجات', calories: 690, ingredients: { 'گوشت قرمز کم‌چرب (گرم)': 180, 'بروکلی (ساقه)': 1, 'هویج': 1, 'روغن زیتون (قاشق چای‌خوری)': 1 } },
    ],
    dinner: [
      { name: 'کته عدس + سفیده تخم‌مرغ', calories: 550, ingredients: { 'عدس (پیمانه)': 0.5, 'برنج (پیمانه)': 0.5, 'سفیده تخم‌مرغ': 3 } },
    ],
    snack: [
      { name: 'پنیر کاتیج + آجیل', calories: 220, ingredients: { 'پنیر کاتیج (گرم)': 150, 'گردو (نیمه)': 4 } },
    ],
  },

  low_carb: {
    breakfast: [
      { name: 'اُملت اسفناج', calories: 380, ingredients: { 'تخم‌مرغ': 3, 'اسفناج (مشت)': 2, 'قارچ': 3 } },
    ],
    lunch: [
      { name: 'سالاد مرغ سزار سبُک', calories: 520, ingredients: { 'سینه مرغ (گرم)': 150, 'کاهو': 6, 'پنیر پارمزان (قاشق غذاخوری)': 1 } },
    ],
    dinner: [
      { name: 'کاسه پروتئینی (مرغ + سبزیجات)', calories: 510, ingredients: { 'سینه مرغ (گرم)': 150, 'بروکلی (ساقه)': 1, 'فلفل دلمه‌ای': 0.5 } },
    ],
    snack: [
      { name: 'خیار + پنیر سفید', calories: 140, ingredients: { 'خیار': 1, 'پنیر سفید (گرم)': 40 } },
    ],
  },
};

const TIPS = {
  breakfast: 'یک لیوان آب ولرم/چای سبز قبل از صبحانه می‌تواند کمک‌کننده باشد.',
  lunch: 'نمک و روغن را کم کن؛ تا جای ممکن سبزیجات اضافه کن.',
  dinner: '۲–۳ ساعت قبل خواب چیزی نخور.',
  snack: 'میان‌وعده سبک انتخاب کن.',
};

// جایگاه تبلیغات/همکاری — فعلاً استاتیک
const PROMOS = [
  { title: '۲۰٪ تخفیف کفش ورزشی', tag: 'کد: FIT20', href: 'https://example.com/shoes' },
  { title: 'خرید پروتئین وی با ارسال رایگان', tag: 'کد: PROSHIP', href: 'https://example.com/protein' },
  { title: 'همکاری با مربی‌های تاییدشده', tag: 'رزرو آنلاین', href: '/partners' },
];

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function pick(arr, i) { return arr[i % arr.length]; }
function addIngredients(bag, ing) {
  Object.entries(ing).forEach(([k, v]) => { bag[k] = (bag[k] || 0) + v; });
  return bag;
}

export default function handler(req, res) {
  try {
    const {
      goal = 'weight_loss',          // 'weight_loss' | 'muscle_gain' | 'maintain'
      calories = '1800',
      dietType = 'balanced',         // 'balanced' | 'high_protein' | 'low_carb'
      activity = 'medium',           // کم/متوسط/زیاد → فقط جهت تیون کالری
      days = '3',
      notes = '',
    } = req.query;

    const dType = ['balanced', 'high_protein', 'low_carb'].includes(dietType) ? dietType : 'balanced';
    const dayCount = clamp(parseInt(days, 10) || 3, 1, 7);

    // تیون ساده کالری بر اساس فعالیت
    const actMul = activity === 'high' ? 1.1 : activity === 'low' ? 0.9 : 1.0;
    const target = Math.round((parseInt(calories, 10) || 1800) * actMul);

    const plan = [];
    let bag = {};
    for (let d = 0; d < dayCount; d++) {
      const bf = pick(MEAL_DB[dType].breakfast, d);
      const lu = pick(MEAL_DB[dType].lunch, d);
      const di = pick(MEAL_DB[dType].dinner, d);
      const sk = pick(MEAL_DB[dType].snack, d);

      bag = addIngredients(bag, bf.ingredients);
      bag = addIngredients(bag, lu.ingredients);
      bag = addIngredients(bag, di.ingredients);
      bag = addIngredients(bag, sk.ingredients);

      const items = [
        { meal: 'صبحانه',   time: '08:00', items: [bf.name], calories: bf.calories, tips: TIPS.breakfast },
        { meal: 'ناهار',    time: '13:30', items: [lu.name], calories: lu.calories, tips: TIPS.lunch },
        { meal: 'شام',      time: '19:30', items: [di.name], calories: di.calories, tips: TIPS.dinner },
        { meal: 'میان‌وعده', time: '16:30', items: [sk.name], calories: sk.calories, tips: TIPS.snack },
      ];

      const total = items.reduce((s, m) => s + m.calories, 0);
      plan.push({
        title: `روز ${d + 1}`,
        totalCalories: total,
        waterLiters: Math.round((total / 1000 + 1.2) * 10) / 10,
        items,
      });
    }

    const shoppingList = Object.entries(bag)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => a.name.localeCompare(b.name, 'fa'));

    return res.status(200).json({
      meta: {
        safe: true,
        goal,
        calories: target,
        dietType: dType,
        note: 'این فقط پیشنهاد سبک زندگی و الهام غذایی است؛ توصیه‌ی پزشکی نیست.',
      },
      days: plan,
      shoppingList,
      promos: PROMOS,
      receivedNotes: String(notes || '').slice(0, 280),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error' });
  }
}
