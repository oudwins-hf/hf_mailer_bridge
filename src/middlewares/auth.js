const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      validateApiKey(req, resolve, reject, requiredRights);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

function validateApiKey(req, resolve, reject, requiredRights) {
  resolve();
}

module.exports = auth;
