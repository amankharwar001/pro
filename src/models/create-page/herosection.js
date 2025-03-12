
import { DataTypes,Sequelize  } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  


const heroSectionCreatePage = sequelize.define('HeroSectionCreatePage', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false, 
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
  tableName: 'create_page_hero_section', 
  timestamps: true,
});


export default heroSectionCreatePage;


