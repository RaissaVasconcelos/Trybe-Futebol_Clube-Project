import * as Joi from 'joi';

const schemaUsers = Joi.object({
  email: Joi.string().email().min(3).required(),
  password: Joi.string().min(6).required(),
});

export default schemaUsers;
