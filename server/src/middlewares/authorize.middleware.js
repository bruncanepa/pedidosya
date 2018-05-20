const validateSession = require('../services/validateSession.service');
const {AUTHORIZATION_HEADER, USER_ID_HEADER} = require('../config');
const {ResponseData} = require('../models');
const {httpCustom, headers} = require('../utils');

const {statusCodes} = httpCustom;

module.exports = async(req, res, next) => {
  const token = headers.get({req, key: AUTHORIZATION_HEADER});
  const userId = headers.get({req, key: USER_ID_HEADER});
  const authorized = await validateSession({userId, token});
  if (authorized.success) {
    next();
  } else {
    res.status(statusCodes.UNAUTHORIZED).send(authorized);
  }
};