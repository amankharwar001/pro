import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize i nstance
import SingleImage from './ImagesData.js';


// Define the HeroSection model
const HomeHeroSection = sequelize.define('HeroSection', {
  heading: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensuring the heading field is required
  },
  text: {
    type: DataTypes.STRING,
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

// HomeHeroSection.hasOne(SingleImage, { foreignKey: 'referenceId' });
// SingleImage.belongsTo(HomeHeroSection, { foreignKey: 'referenceId' });

HomeHeroSection.hasMany(SingleImage, { 
  foreignKey: 'referenceId', 
  constraints: false, // Disable foreign key constraints since we're using polymorphic relations
  scope: {
    referenceType: 'hero_section', // This specifies that the referenceType is HeroSection
  }
});

export default HomeHeroSection;


