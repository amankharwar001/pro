export default function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
    if (req.method === "POST") {
      // res.setHeader("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict;");
      res.setHeader("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0; SameSite=lax;");
      res.status(200).json({ message: "Logged out successfully" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
  