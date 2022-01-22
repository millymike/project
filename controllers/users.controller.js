const { User } = require('../models');
const logger = require('../utils/logger');

const create = async (req, res) => {
  const { body } = req;
  try {
    const user = await User.create(body);
    return res.status(200).json({ user });
  } catch (error) {
    logger.error('An error occurred creating user.');
    logger.error(error);
    return res.status(500).json(error);
  }
};

const update = async (req, res, next) => {
  try {
      const {params, body} = req;
      const {id} = params;
      const user = await User.findByIdAndUpdate( id, body );
      return res.status(200).json({user});

  } catch (error) {
    logger.error('An error occurred updating user.');
    logger.error(error);
    return res.status(500).json(error);
  }
}

const fetchUser = async (req, res, next) => {
  try {
      const {params} = req;
      const {id} = params;
      const user = await User.findById( id );
      return res.status(200).json({user});

  } catch (error) {
    logger.error('An error occurred fetching user.');
    logger.error(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  create,
  update,
  fetchUser,
};
