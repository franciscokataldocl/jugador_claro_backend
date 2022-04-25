const express = require("express");
const router = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

require("dotenv").config("./.env");

//importar modelos para crearlos en la bbdd al iniciar el proyecto
require('./models/Users');
require("./models/Jugadores");
require("./models/Regions");
require("./models/Votos");
require("./models/Timer");
require("./models/Questions");
require("./models/Answers");




//crear conexion a la bbdd
const db = require('./config/db');
db.sync()
  .then(() => console.log("conectado al servidor"))
  .catch((error) => console.log(error));






const app = express();



app.use(cors());

//body parser para leer formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//disponibilizar carpeta public al front end
//img ejemplo: http://localhost:3001/img/jugadores/gary-medel.jpg
app.use(express.static(path.join(__dirname, "public")));








app.use("/", router());

app.listen(process.env.PORT || 5000);
