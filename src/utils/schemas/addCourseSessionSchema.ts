const Joi = require("joi");

const schema = Joi.object().keys({
  sessionId: Joi.string().guid({ version: "uuidv4" }).required(),
  totalModulesStudied: Joi.number().strict().required(),
  averageScore: Joi.number().strict().required(),
  timeStudied: Joi.number().strict().required(),
});

export default schema;
