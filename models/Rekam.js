// import Sequelize from "sequelize";
// import db from "../config/db.js";
// import Penyakit from "./Penyakit.js";
// import User from "./User.js";

// const { DataTypes } = Sequelize;

// const Rekam = db.define('rekams',{
//     uuid: {
//         type: DataTypes.STRING,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false
//     },
//     userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     penyakitId: {
//         type: DataTypes.INTEGER,
//         allowNull:false
//     },
//     CF: {
//         type: DataTypes.INTEGER,
//         allowNull:false
//     }
// },{
//     freezeTableName: true
// });

// User.belongsToMany(Penyakit,{through: Rekam})
// Penyakit.belongsToMany(User,{through: Rekam})

// User.hasMany(Rekam);
// Rekam.belongsTo(User);

// Penyakit.hasMany(Rekam);
// Rekam.belongsTo(Penyakit);



// export default Rekam;