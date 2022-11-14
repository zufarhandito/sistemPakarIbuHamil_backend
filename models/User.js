import Sequelize from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const User = db.define('users',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NIK: {
        type: DataTypes.STRING
    },
    RT: {
        type: DataTypes.STRING
    },
    RW: {
        type: DataTypes.STRING
    },
    Kalurahan: {
        type: DataTypes.STRING
    },
    Kapanewon: {
        type: DataTypes.STRING
    },
    Kabupaten: {
        type: DataTypes.STRING
    },
    Provinsi: {
        type: DataTypes.STRING
    }

},{
    freezeTableName: true
});

export default User;