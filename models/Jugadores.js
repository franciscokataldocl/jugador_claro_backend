const Sequelize = require("sequelize");

//archivo de conexion a la bbdd
const db = require("../config/db");

const Jugadores = db.define("jugadores", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  votos: {
    type: Sequelize.BIGINT,
    defaultValue: 0,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Jugadores;
