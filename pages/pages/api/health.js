// pages/api/health.js
export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  return res.status(200).json({
    ok: true,
    app: "AI Nutrition Coach",
    time: new Date().toISOString(),
    environment: process.env.VERCEL ? "vercel" : "local",
    version: "v1",
  });
}
