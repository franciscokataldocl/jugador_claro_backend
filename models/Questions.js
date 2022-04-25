const Sequelize = require("sequelize");

//archivo de conexion a la bbdd
const db = require("../config/db");
const Answers = require("./Answers");

const Questions = db.define("questions", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});






Questions.hasMany(Answers, {foreignKey: "id_answer" });




module.exports = Questions;
