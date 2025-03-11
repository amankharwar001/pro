import AdminModel from '@/models/AdminModel'; // Adjust import according to your file structure
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, password } = req.body;

  // Validate input fields
  if (!token || !password) {
    return res.status(400).json({ message: 'Token or password missing' });
  }

  try {
    // Find the admin by reset token
    const admin = await AdminModel.findOne({
      where: { passwordResetToken: token },
    });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Validate if the token has expired
    const tokenExpirationTime = admin.passwordResetExpires;
    if (new Date() > new Date(tokenExpirationTime)) {
      return res.status(400).json({ message: 'Token has expired.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the admin's password and clear the reset token and expiration
    await admin.update({
      password: hashedPassword,
      passwordResetToken: null, // Clear the reset token
      passwordResetExpires: null, // Clear the expiration time
    });

    return res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Error during password reset:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
}
