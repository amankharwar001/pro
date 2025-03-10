import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';


const Section2 = sequelize.define('HeroSection2', {
  heading: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensuring the heading field is required
  },
  
}, {
  tableName: 'homepage_section_2',  // Ensure this matches your table name exactly
  timestamps: true,
});

export default Section2;



