import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize i nstance

// Define the HeroSection model
const HomeHeroSection = sequelize.define('HeroSection', {
  heading: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensuring the heading field is required
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,  // Ensuring the text field is required
  },
  btn: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensuring the button field is required
  },
  btnLink: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensuring the button link field is required
  },
  
}, {
  tableName: 'hero_sections',  // Ensure this matches your table name exactly
  timestamps: true,
});

export default HomeHeroSection;


