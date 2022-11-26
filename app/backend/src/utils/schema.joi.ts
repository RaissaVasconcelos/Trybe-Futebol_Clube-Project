import * as Joi from 'joi';

const filedsInvalids = 'All fields must be filled';

const schemaId = Joi.number().integer().required();

const schemaUsers = Joi.object({
  email: Joi.string().email().min(3).required()
    .messages({
      'string.empty': filedsInvalids,
      'any.required': filedsInvalids,
      'string.email': 'Incorrect email or password',
    }),
  password: Joi.string().min(6).required()
    .messages({
      'string.empty': filedsInvalids,
      'any.required': filedsInvalids,
    }),
});

export {
  schemaUsers,
  schemaId,
};
