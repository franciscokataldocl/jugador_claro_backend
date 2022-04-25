const Jugadores = require("../models/Jugadores");

exports.getPlayers = async (req, res) => {
    const players = await Jugadores.findAll({
      where: {
        active: true,
      },
    });
  res.send(players);
};
