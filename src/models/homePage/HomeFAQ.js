import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const HomeFAQ = sequelize.define('Homefaq', {
    heading: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'FAQ'
    },
    questions: {
        type: DataTypes.JSONB, // This will store an array of questions and answers in a JSON format
        allowNull: false,
        defaultValue: []
    },
    bottomtext: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'FAQ'
    },
}, {
    tableName: 'homepage_faq',  // Ensure this matches your table name exactly
    timestamps: true,
});
export default HomeFAQ;