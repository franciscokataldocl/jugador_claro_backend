const Sequelize = require('sequelize');
const Regions = require('./Regions');
const Jugadores = require("./Jugadores");

//archivo de conexion a la bbdd
const db = require('../config/db');

const Users = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  rut: {
    type: Sequelize.BIGINT,
    allowNull: false,
    unique: true,
  },
  telefono: {
    type: Sequelize.BIGINT,
    allowNull: false,
    unique: true,
  },
  region: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  voto: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  jugado: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  correcto: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
});



Users.belongsTo(Regions, { foreignKey: "region" });
Users.belongsTo(Jugadores, { foreignKey: "jugador_id" });



module.exports = Users;