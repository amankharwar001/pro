import { DataTypes,Sequelize  } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize i nstance


const HeroSectionDocumentTransaction = sequelize.define('HeroSectionDocumentTransaction', {
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
  btn: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensuring the button field is required
  },
  btnLink: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensuring the button link field is required
  },
  
}, {
  tableName: 'hero_section_document_transaction',  // Ensure this matches your table name exactly
  timestamps: true,
});


export default HeroSectionDocumentTransaction;


