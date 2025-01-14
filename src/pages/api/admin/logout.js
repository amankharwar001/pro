export default function handler(req, res) {
    if (req.method === "POST") {
      // res.setHeader("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict;");
      res.setHeader("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict;");
      res.status(200).json({ message: "Logged out successfully" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
  