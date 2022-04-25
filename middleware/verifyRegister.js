const User = require("../models/Users");

checkDuplicateEmailRutTelefono = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Este email ya está participando",
      });
      return;
    }
  });
  User.findOne({
    where: {
      rut: req.body.rut,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Este RUT ya está participando",
      });
      return;
    }
  });
  User.findOne({
    where: {
      telefono: req.body.telefono,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Este teléfono ya está participando",
      });
      return;
    }
  });
};

const verifyRegister = {
  checkDuplicateEmailRutTelefono: checkDuplicateEmailRutTelefono
};
module.exports = verifyRegister;
