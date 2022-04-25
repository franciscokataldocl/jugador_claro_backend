const Timer = require("../models/Timer");

exports.getTimer = async (req, res) => {
  const timer = await Timer.findAll();
  res.send(timer);
};
