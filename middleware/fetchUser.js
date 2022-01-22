const joi = require('joi');
const logger = require('../utils/logger');

const validateFetchUser = async (req, res, next) => {
  const schema = joi.object({
    id: joi.string(),
  });

  try {
    await schema.validateAsync( req.params );
    return next();
  } catch (error) {
    logger.error('An error occurred fetching user');
    return next(error);
  }
};

module.exports = {
  validateFetchUser,
};
