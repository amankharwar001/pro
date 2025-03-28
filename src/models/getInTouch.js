
import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConnect.js';

const GetInTouch = sequelize.define('GetInTouch', {
    heading: {
        type: DataTypes.STRING,
        allowNull: false, // Ensuring the heading field is required
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false, // Ensuring the content field is required
    },
    card: {
        type: DataTypes.JSON, // Store an array of objects with leadName and leadNo
        allowNull: false,
        defaultValue: [], // Default to an empty array
    },
}, {
    tableName: 'get_in_touch', // Ensure this matches your table name exactly
    timestamps: true,
});

export default GetInTouch;