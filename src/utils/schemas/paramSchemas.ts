const Joi = require("joi");

const schema = Joi.object().keys({
  courseId: Joi.string().guid({ version: "uuidv4" }).required(),
  sessionId: Joi.string().guid({ version: "uuidv4" }).optional(),
});

export default schema;
