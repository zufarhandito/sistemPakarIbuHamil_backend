import Sequelize from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Feedback = db.define('feedbacks',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    feedback: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    freezeTableName: true
});

export default Feedback