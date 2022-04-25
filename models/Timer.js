const Sequelize = require("sequelize");

//archivo de conexion a la bbdd
const db = require("../config/db");

const Timer = db.define("timer", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  start_timer: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  end_timer: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
});

module.exports = Timer;
