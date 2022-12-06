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
    MB: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    MD: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
    
},{
    freezeTableName: true
});

Penyakit.belongsToMany(Gejala,{through: Aturan});
Gejala.belongsToMany(Penyakit,{through: Aturan});

Penyakit.hasMany(Aturan);
Aturan.belongsTo(Penyakit);

Gejala.hasMany(Aturan);
Aturan.belongsTo(Gejala);

export default Aturan