import AdminModel from '@/models/AdminModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body; // Accept both username and password

  try {
    // Check if username is an email
    const isEmail = username.includes('@');
    let admin;

    if (isEmail) {
      // If username is an email, find admin by email
      admin = await AdminModel.findOne({ where: { email: username } });
    } else {
      // If it's a username, find admin by username
      admin = await AdminModel.findOne({ where: { username } });
    }

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid username/email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1w' });

    const isProduction = process.env.NODE_ENV === 'production';
    res.setHeader(
      'Set-Cookie',
      // `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; ${isProduction ? 'Secure;' : ''}`
      `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=lax;`
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error });
  }
}
