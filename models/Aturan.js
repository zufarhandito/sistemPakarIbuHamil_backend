import Sequelize from "sequelize";
import db from "../config/db.js";
import Penyakit from "./Penyakit.js";
import Gejala from "./Gejala.js";

const { DataTypes } = Sequelize;

const Aturan = db.define('aturans',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    penyakitId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    gejalaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    MD: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
    
},{
    freezeTableName: true
});

Penyakit.hasMany(Aturan);
Aturan.belongsTo(Penyakit,{foreignKey:'penyakitId'});

Gejala.hasMany(Aturan);
Aturan.belongsTo(Gejala,{foreignKey:'gejalaId'});

export default Aturan