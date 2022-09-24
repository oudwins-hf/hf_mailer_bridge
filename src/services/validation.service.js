const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const axios = require("axios");
const config = require("../config/config");

const validateMail = async function (email) {
  const url = `https://emailverification.whoisxmlapi.com/api/v1?apiKey=${config.whoisApiKey}&emailAddress=${email}`;
};
