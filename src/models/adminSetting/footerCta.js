import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const FooterCTA = sequelize.define('FooterCTA', {
  heading: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  text: {
    type: DataTypes.STRING,
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
  tableName: 'footer_cta',
  timestamps: true,
});

export default FooterCTA;


