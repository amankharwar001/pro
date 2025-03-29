
import { DataTypes,Sequelize  } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  

const ProductArrangement = sequelize.define("ProductArrangement", {
    info: {
        type: DataTypes.JSON,
        allowNull: false,
      },
  }, {
  tableName: 'product_arrangement', 
  timestamps: true,
});

export default ProductArrangement;



