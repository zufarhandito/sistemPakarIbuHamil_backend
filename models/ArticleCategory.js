import Sequelize from "sequelize";
import db from "../config/db.js";
import Article from "./Article.js";

const { DataTypes } = Sequelize;

const ArticleCategory = db.define('articleCategories',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default ArticleCategory;