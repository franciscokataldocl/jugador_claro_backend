const Sequelize = require("sequelize");

//archivo de conexion a la bbdd
const db = require("../config/db");
//const Questions = require("./Questions");



const Answers = db.define("answers", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  answer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isCorrect: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});


//Answers.belongsTo(Questions, { foreignKey: "question_id" });
//Answers.belongsTo(Questions);


module.exports = Answers;
