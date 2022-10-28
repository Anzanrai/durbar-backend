const db = require('../models');
const {
  errorResponse,
  successResponse,
} = require('../middleware/responseFormat');
const { QueryTypes } = require('sequelize');

const Role = db.role;
const User = db.user;
const sequelize = db.sequelize;

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};

exports.getUsers = (req, res) => {
  if (req.query && req.query.user_type) {
    Role.findOne({
      where: {
        name: req.query.user_type,
      },
    })
      .then(async (role) => {
        try {
          let queryString = `SELECT username, email FROM users WHERE id IN (SELECT userId from user_roles WHERE roleId=${role.id})`;
          const [users, metadata] = await sequelize.query(queryString);
          return res
            .status(200)
            .json(successResponse('OK', users, res.statusCode));
        } catch (error) {
          return res.status(400).json(errorResponse(error, res.statusCode));
        }
      })
      .catch((error) => {
        return res
          .status(400)
          .json(errorResponse(error.message, res.statusCode));
      });
  } else {
    User.findAll({
      attributes: ['username', 'email'],
    })
      .then((users) => {
        return res
          .status(200)
          .json(successResponse('OK', users, res.statusCode));
      })
      .catch((error) => {
        return res
          .status(400)
          .json(errorResponse(error.message, res.statusCode));
      });
  }
};
