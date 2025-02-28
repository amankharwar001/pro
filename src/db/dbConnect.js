



import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


// Load environment variables from .env
dotenv.config();

// Set up the Sequelize instance
const sequelize = new Sequelize({
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false,  // Disable logging of SQL queries
});

// Log the configuration excluding sensitive data
console.log("Database Config:", {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Function to establish a connection
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);  // Optionally exit the process if the connection fails
  }
};

// Calling connection function to verify if the database connection works
connection();

// Export the Sequelize instance to use it in models
export default sequelize;
