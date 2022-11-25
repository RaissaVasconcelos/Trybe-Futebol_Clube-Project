import * as Joi from 'joi';

const filedsInvalids = 'All fields must be filled';

const schemaUsers = Joi.object({
  email: Joi.string().email().min(3).required()
    .messages({
      'string.empty': filedsInvalids,
      'any.required': filedsInvalids,
    }),
  password: Joi.string().min(6).required()
    .messages({
      'string.empty': filedsInvalids,
      'any.required': filedsInvalids,
    }),
});

export default schemaUsers;
