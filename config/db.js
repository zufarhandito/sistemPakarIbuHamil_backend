import Sequelize from "sequelize";

const db = new Sequelize('puskesmas_ngemplak','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;