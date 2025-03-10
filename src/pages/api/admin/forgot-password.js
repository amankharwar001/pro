
import nodemailer from "nodemailer";
import crypto from 'crypto'; // For secure token generation
import AdminModel from "@/models/AdminModel";
import LeadFormEmail from "@/models/formEmail/Email";

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  // Check if the provided email exists in the database
  const admin = await AdminModel.findOne({ where: { email } });

  if (!admin) {
    return res.status(404).json({ message: "Admin not found with the provided email" });
  }

  // Generate a secure reset token using crypto
  const resetToken = crypto.randomBytes(20).toString('hex'); // 20-byte random token

  // Set the expiration time for the token (e.g., 1 hour from now)
  const resetExpires = Date.now() + 3600000; // 1 hour expiration

  // Save the token and expiration time in the database
  admin.passwordResetToken = resetToken;
  admin.passwordResetExpires = new Date(resetExpires);
  await admin.save();

  // Fetch the email and password from the LeadFormEmail model (database)
  const leadFormEmailData = await LeadFormEmail.findOne(); // Adjust query if necessary (e.g., filtering based on conditions)

  if (!leadFormEmailData) {
    return res.status(500).json({ error: 'Email configuration not found in database' });
  }

  const { email: emailUser, password } = leadFormEmailData;

  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
      user: emailUser, // Add these to .env file
      pass: password,
    }
  });

  // Construct the reset URL with the token
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}/admin/account/reset-password?token=${resetToken}`;

  try {
    // Send the reset email
    await transporter.sendMail({
      from: emailUser, // Sender email (from .env)
      to: email, // Recipient email (provided in the request body)
      subject: "Password Reset",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    });

    res.status(200).json({ message: "Reset link sent." });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error sending email." });
  }
}
