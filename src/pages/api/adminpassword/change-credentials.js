import AdminModel from '@/models/AdminModel'; // Adjust import according to your file structure
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { password, newUsername, currentUsername, newPassword, confirmPassword, isUsername } = req.body;

  // Validate input fields
  if (!password && !newUsername) {
    return res.status(400).json({ message: 'Current username or password is required' });
  }

  try {
    // If it's a request to change the username
    if (isUsername) {
      if (!currentUsername || !newUsername) {
        return res.status(400).json({ message: 'Current and new username are required' });
      }

      // Find the admin by username
      const admin = await AdminModel.findOne({ where: { username: currentUsername } });

      if (!admin) {
        return res.status(400).json({ message: 'Admin not found' });
      }

      // Update the admin's username
      await admin.update({
        username: newUsername,
      });

      return res.status(200).json({ message: 'Username changed successfully' });
    }

    // If it's a request to change the password
    if (newPassword && confirmPassword) {
      // Validate password fields
      if (!password || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: 'All password fields are required' });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'New password and confirm password do not match' });
      }

      // Find the admin by current username
      const admin = await AdminModel.findOne();

      if (!admin) {
        return res.status(400).json({ message: 'Admin not found' });
      }

      // Check the old password
      const isPasswordMatch = await bcrypt.compare(password, admin.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the admin's password
      await admin.update({
        password: hashedPassword,
      });

      return res.status(200).json({ message: 'Password changed successfully' });
    }

    return res.status(400).json({ message: 'Invalid request data' });
  } catch (error) {
    console.error('Error during credentials change:', error); // Log the error here
    return res.status(500).json({ message: 'Internal server error', error: error.message || error });
  }
}
