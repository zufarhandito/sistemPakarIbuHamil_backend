import Sequelize from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Penyakit = db.define('penyakits',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    keterangan: {
        type: DataTypes.TEXT,
    },
    solusi: {
        type: DataTypes.TEXT
    }
},{
    freezeTableName: true
})

export default Penyakit;