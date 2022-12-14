import Sequelize from "sequelize";
import db from "../config/db.js";
import ArticleCategory from "./ArticleCategory.js";
import User from "./User.js";

const { DataTypes } = Sequelize;

const Article = db.define('articles',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    caption: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    freezeTableName: true
});

ArticleCategory.hasMany(Article);
Article.belongsTo(ArticleCategory);

User.hasMany(Article);
Article.belongsTo(User);

export default Article;