
import { DataTypes,Sequelize  } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize i nstance


const AboutSection2 = sequelize.define('AboutSection2', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensuring the heading field is required
  },
  heading: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensuring the heading field is required
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,  // Ensuring the text field is required
  },
}, {
  tableName: 'about_section_2',  // Ensure this matches your table name exactly
  timestamps: true,
});


export default AboutSection2;


