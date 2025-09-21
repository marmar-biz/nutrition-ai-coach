export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    message: "pong 🏓",
    timestamp: new Date().toISOString(),
  });
}
