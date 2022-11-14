import Sequelize from "sequelize";
import db from "../config/db.js";
import Gejala from "./Gejala.js";
import Penyakit from "./Penyakit.js";
import User from "./User.js";

const { DataTypes } = Sequelize;

const Rekam = db.define('rekams',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    penyakitId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    gejalaId: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    freezeTableName: true
});

User.hasOne(Rekam);
Rekam.belongsTo(User,{foreignKey: 'userId'})

Penyakit.hasOne(Rekam);
Rekam.belongsTo(Penyakit,{foreignKey: 'penyakitId'})

Gejala.hasOne(Rekam);
Rekam.belongsTo(Gejala,{foreignKey: 'gejalaId'})




export default Rekam;