import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const Section5 = sequelize.define('HomeSection5', {
    heading: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255],
        },
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        
    },
    boxes: {
        type: DataTypes.JSON, // JSON field to store boxHeading and boxContent as an array
        allowNull: false,
        defaultValue: [], // Default to an empty array
    },
}, {
    tableName: 'homepage_section_5',
    timestamps: true,
});

export default Section5;
