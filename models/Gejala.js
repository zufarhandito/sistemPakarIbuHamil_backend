import Sequelize from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Gejala = db.define('gejalas',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    freezeTableName: true
});

export default Gejala;