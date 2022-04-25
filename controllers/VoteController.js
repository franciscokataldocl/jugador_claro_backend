const Users = require("../models/Users");
const Jugadores = require("../models/Jugadores");

exports.newVote = async (req, res) => {
  const { userid, playerId } = req.body;
  console.log(userid, playerId);

  //revisar si usuario y jugador existen
  const User = await Users.findOne({
    where: { id: userid },
  });
  const Player = await Jugadores.findOne({
    where: { id: playerId },
  });

  //si usuario y jugador existen
  if (User && Player) {
    console.log('usuario y jugador existen, proceda mi rey');

    try {
      //actualizar usuario modificando el estado de voto y agregando
      //el jugador por el cual votó
      await User.update({
        voto: true,
        jugador_id: Player.id,
      });
      //actualizamos el jugador, agregandole un voto
      await Player.update({
        votos: Player.votos + 1,
      });
       await res.status(200).json({
         status: 200,
         User,
         Player
       });

      return;

    } catch (error) {
       await res.status(500).json({
         status: 500,
         error
       });
      return;
    }

  } else {
    //si usuario o jugador no existen enviar error al front
     await res.status(500).json({
       status: 500,
       mensaje:"No es posible procesar tu voto, intenta más tarde"
     });
    return;
  }




  //data obtenida desde el request al presion boton votar
  // const data = {
  //   userId: req.body.user.id,
  //   userRut: req.body.user.rut,
  //   userEmail: req.body.user.email,
  //   userTelefono: req.body.user.telefono,
  //   playerId: req.body.player.id,
  //   playerName: req.body.player.nombre,
  // };

  //revisar si usuario que vota existe en bbdd y puede votar

  // const User = await Users.findOne({
  //   where: { email: data.userEmail, rut: data.userRut, voto: 0 },
  // });

  // const Player = await Jugadores.findOne({
  //   where: { id: data.playerId, nombre: data.playerName },
  // });

  //si usuario existe y tiene permiso para votar ademas jugador existe
  // if (User && Player) {
  //   //console.log("usuario existe, puede votar y jugador tambien existe");

  //   try {
  //     //actualizamos el usuario indicando que voto: 1 "ya voto"
  //       await User.update({
  //           voto: 1,
  //           jugador_id: Player.id
  //       });
  //     //actualizamos el jugador, sumandole 1 voto
  //       await Player.update({
  //           votos: Player.votos + 1
  //       })
  //       await res.status(200).json({
  //           mensaje: `Tu voto para ${Player.nombre} ha sido registrado correctamente`,
  //         status: 200,
  //           usuario: User
  //       });
  //     console.log(User)
  //     return;
  //   } catch (error) {
  //     await res.status(500).send({
  //       mensaje: "No hemos podido realizar tu voto, intenta mas tarde",
  //       status: 500,
  //     });
  //     return;
  //   }
  // }
};
