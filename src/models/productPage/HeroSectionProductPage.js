
import { DataTypes,Sequelize  } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  


const heroSectionProductPage = sequelize.define('HeroSectionProductPage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,  
    primaryKey: true,  
  },
  nickname:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  heading: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false, 
  },
  btn: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  btnLink: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  
}, {
  tableName: 'hero_section_product_page', 
  timestamps: true,
});


export default heroSectionProductPage;


