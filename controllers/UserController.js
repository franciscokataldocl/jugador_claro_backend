const Users = require("../models/Users");
const Jugadores = require("../models/Jugadores");
const jwt = require("jsonwebtoken");

exports.newUser = async (req, res) => {
  const { nombre, email, rut, telefono, region } = req.body;

  console.log("datos desde el front-end");
  console.log(nombre, email, rut, telefono, region);

  //buscar usuario que esta regitrando en la bbdd
  const user = await Users.findOne({
    where: { email, rut, telefono },
  });
  //---------------CASO 1 - USUARIO NUEVO, NO REGISTRADO
  //si no existe un usuario con el mismo email, rut y telefono
  //procedemos a intentar registrarlo
  if (!user) {
     //

    try {
      await Users.create({
        nombre: nombre,
        email: email,
        rut: rut,
        telefono: telefono,
        region: region,
      });

      //buscamos el mismo usuario que acabamos de crear, para
      //devolver los datos al front end
      const newUser = await Users.findOne({
        where: { email, rut, telefono },
      });
      const token = jwt.sign({ newUser }, "secret_claro_key", {expiresIn:'5m'});


      //enviamos el usuario
      await res.status(200).json({
        status: 200,
        mensaje: "te has registrado correctamente",
        usuario: newUser,
        token,
      });
      console.log("te has registrado correctamente");
      return;
    } catch (error) {
      //si existe un problema enviamos mensaje al front end
      await res.status(500).send({
        mensaje: "Hubo un problema al registrar usuario",
        status: 500,
      });
      return;
    }
  } else {
    //---------------CASO 2 - USUARIO REGISTRADO, NO HA VOTADO
    if (user.voto === false && user.jugado === false) {
            const token = jwt.sign({ user }, "secret_claro_key", {
              expiresIn: "5m",
            });

      const usuario = user;
      await res.status(200).json({
        status: 200,
        mensaje: "¡Ya estas registrado! pero no has votado",
        usuario,
        token
      });
      console.log("¡Ya estas registrado! pero no has votado");
      return;
    }

    //---------------CASO 3 - USUARIO REGISTRADO, VOTO, PERO NO HA JUGADO LA TRIVIA
    if (user.voto === true && user.jugado === false) {
            const token = jwt.sign({ user }, "secret_claro_key", {
              expiresIn: "5m",
            });

      const usuario = user;
      await res.status(200).json({
        status: 200,
        mensaje: "¡Ya has votado por tu jugador favorito!",
        usuario,
        token
      });
      console.log("¡Ya has votado por tu jugador favorito!");
      return;
    }

    //---------------CASO 4 - USUARIO REGISTRADO, VOTO Y JUGO LA TRIVIA

    if (user.voto === true && user.jugado === true) {
            const token = jwt.sign({ user }, "secret_claro_key", {
              expiresIn: "5m",
            });

      const usuario = user;
      await res.status(200).json({
        status: 200,
        mensaje: "¡Ya estas participando!",
        usuario,
        token
      });
      console.log("¡Ya estas participando!");
      return;
    }
  }

  //res.send(req.body);
};

exports.newVote = async (req, res) => {

  const token = req.headers['authorization'];
  jwt.verify(token, "secret_claro_key", async (err, user) => {
    if (err) {
      res.status(403).json({status: 403})
    } else {
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
    console.log("usuario y jugador existen, proceda mi rey");

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
        Player,
      });

      return;
    } catch (error) {
      await res.status(500).json({
        status: 500,
        error,
      });
      return;
    }
  } else {
    //si usuario o jugador no existen enviar error al front
    await res.status(500).json({
      status: 500,
      mensaje: "No es posible procesar tu voto, intenta más tarde",
    });
    return;
  }
    }
  });






};

exports.endQuiz = async (req, res) => {

  const token = req.headers["authorization"];
  jwt.verify(token, "secret_claro_key", async (err, user) => {
    if (err) {
      res.status(403).json({status: 403})
    } else {
        const { id } = req.body;

        //buscar usuario que esta regitrando en la bbdd
        const User = await Users.findOne({
          where: { id },
        });

        //si usuario existe
        if (User) {
          try {
            await User.update({
              jugado: true,
              correcto: true,
            });

            await res.status(200).json({
              status: 200,
              User,
            });
            return;
          } catch (error) {
            await res.status(500).json({
              status: 500,
            });
          }
        } else {
          await res.status(500).json({ status: 500 });
          return;
        }
    }
  })




};

// exports.playedUser = async (req, res) => {
//   const { usuario_id: id } = req.body;

//    const User = await Users.findOne({
//      where: { id},
//    });

//   try {

//      await User.update({
//        jugado: 1,
//      });
//      await res.status(200).json({
//        User
//      });
//      return;

//   } catch (error) {
//     console.log(error);
//   }

// }

//usuario que termina de jugar el quiz y a contestado todas las preguntas correctamentes
// exports.quizUser = async (req, res) => {

//   const { id } = req.body;
//   console.log(id);

// }
