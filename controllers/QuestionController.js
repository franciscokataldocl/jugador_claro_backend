const Questions = require("../models/Questions");
const Answers = require("../models/Answers");


exports.getQuestions = async (req, res) => {
  const questions = await Questions.findAll({
    include: [{ model: Answers }],
  });
  res.send(questions);
};
