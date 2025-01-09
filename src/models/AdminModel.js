
import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConnect.js';

// Define Admin Model
const AdminModel = sequelize.define('AdminModel', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: process.env.EMAIL_NAME, // Default email from .env
  },
  passwordResetToken: {
    type: DataTypes.STRING,
    allowNull: true, // Nullable for admins who haven't requested a reset
  },
  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: true, // Nullable for admins who haven't requested a reset
  },
}, {
  tableName: 'admin_login_credential', // Ensure this matches your table name exactly
  timestamps: true,
});

// Sync table and create an admin record if the table is empty
const createAdminIfNeeded = async () => {
  try {
    // Sync the table (Create if not exists)
    await AdminModel.sync({ alter: true });

    // Check if there is already an admin record
    const adminCount = await AdminModel.count();
    
    if (adminCount === 0) {
      // If no admin exists, create a default admin record
      await AdminModel.create({
        username: 'admin', // Default username
        password: 'defaultpassword', // Provide a default password (hash it before saving in real scenario)
        email: process.env.EMAIL_NAME, // Use the default email from .env
      });
      console.log('Default admin login created.');
    }
  } catch (error) {
    console.error('Error syncing table or creating admin:', error);
  }
};

createAdminIfNeeded();

export default AdminModel;
