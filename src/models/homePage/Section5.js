// import { DataTypes } from 'sequelize';
// import sequelize from '../../db/dbConnect.js';

// const Section5 = sequelize.define('HeroSection', {
//     heading: {
//         type: DataTypes.STRING,
//         allowNull: false,  // Ensuring the heading field is required
//     },
//     content: {
//         type: DataTypes.STRING,
//         allowNull: false,  // Ensuring the heading field is required
//     },
//     boxHeading1: {
//         type: DataTypes.STRING,
//         allowNull: false,  // Ensuring the heading field is required
//     },
//     boxContent1: {
//         type: DataTypes.STRING,
//         allowNull: false,  // Ensuring the heading field is required
//     },
//     boxHeading2: {
//         type: DataTypes.STRING,
//         allowNull: false,  // Ensuring the heading field is required
//     },
//     boxContent2: {
//         type: DataTypes.STRING,
//         allowNull: false,  // Ensuring the heading field is required
//     },
//     boxHeading3: {
//         type: DataTypes.STRING,
//         allowNull: false,  // Ensuring the heading field is required
//     },
//     boxContent3: {
//         type: DataTypes.STRING,
//         allowNull: false,  // Ensuring the heading field is required
//     },
// }, {
//     tableName: 'homepage_section_5',  // Ensure this matches your table name exactly
//     timestamps: true,
// });
// export default Section5;



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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 500],
        },
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
