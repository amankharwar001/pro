
import AdminModel from '@/models/AdminModel';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { username, password } = req.body; // Changed from `email` to `username`
  

  try {
    // Check if an admin already exists in the database
    const adminCount = await AdminModel.count();
    if (adminCount > 0) {
      return res.status(403).json({ message: 'Signup not allowed: Admin already exists.' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
    const admin = await AdminModel.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(400).json({ message: 'Error creating admin', error });
  }
}
