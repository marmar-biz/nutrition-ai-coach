export default function handler(req, res) {
  if (req.method === "POST") {
    const { weight, height, goal } = req.body;

    // محاسبه‌ی کالری ساده (به‌صورت نمونه)
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    let calories;

    if (goal === "lose") {
      calories = 1800;
    } else if (goal === "gain") {
      calories = 2500;
    } else {
      calories = 2200;
    }

    res.status(200).json({
      bmi,
      recommendedCalories: calories,
      message: "پیشنهاد رژیم غذایی آماده شد 🍎"
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
