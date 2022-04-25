const express = require("express");
const router = express.Router();

//controller usuarios
const userController = require('../controllers/userController');

//controller regiones
const regionController = require("../controllers/regionController");

//controller timer
const timerController = require("../controllers/timerController");

//controller players
const playerController = require("../controllers/playerController");

//controller votos
const voteController = require("../controllers/voteController");

//controller questions
const questionController = require("../controllers/QuestionController");



module.exports = () => {
  // router.get("/", (req, res) => { res.send("funciona, mi rey"); });

  //---RUTAS BASICAS DEL PROYECTO
  //obtener las regiones para el formulario
  router.get("/api/regions", regionController.getRegions);
  //obtener fecha de inicio y termino del partido
  router.get("/api/timer", timerController.getTimer);
  //obtener listado de jugadores
  router.get("/api/players", playerController.getPlayers);

  //---RUTAS DE USUARIO
  //crear usuario
  router.post("/api/user", userController.newUser);
  //registrar voto de usuario a jugador
  router.post("/api/vote", userController.newVote);
  //usuario que termino el quiz correctamente
  router.post("/api/user/endquiz", userController.endQuiz);

  //---RUTAS QUIZ
  router.get("/api/questions", questionController.getQuestions);

  //modificar usuario jugado
  // router.post("/api/user/played", userController.playedUser);

  //obtener usuario que completo el quiz de manera correcta
  // router.post("/api/user/endquiz", userController.quizUser);

  //obtener preguntas y respuestas para el quiz


  //USUARIO QUE TERMINO EL QUIZ CORRECTAMENTE
  // router.post("/api/user/endquiz", userController.userEndQuiz);

  return router;
};
