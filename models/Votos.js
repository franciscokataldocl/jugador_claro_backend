const Sequelize = require("sequelize");

//archivo de conexion a la bbdd
const db = require("../config/db");

const Jugadores = require("./Jugadores");
const Users = require("./Users");

const Vote = db.define("votos", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  jugador: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});


Vote.belongsTo(Users, { foreignKey: "user_id" });
Vote.belongsTo(Jugadores, { foreignKey: "jugador" });


module.exports = Vote;
