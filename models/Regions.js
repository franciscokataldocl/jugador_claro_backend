const Sequelize = require("sequelize");

//archivo de conexion a la bbdd
const db = require("../config/db");

const Regions = db.define("regiones", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Regions;
