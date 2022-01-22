const joi = require('joi');
const logger = require('../utils/logger');

const validateCreateUser = async (req, res, next) => {
  const schema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().optional(),
    country: joi.string(),
    state: joi.string(),
    zip_code: joi.string(),
  });

  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    logger.error('An error occurred creating user');
    return next(error);
  }
};

module.exports = {
  validateCreateUser,
};
