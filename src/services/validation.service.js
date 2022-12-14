const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const axios = require("axios");
const config = require("../config/config");
const logger = require("../config/logger");

const validateMail = async function (email) {
  const url = `https://emailverification.whoisxmlapi.com/api/v1?apiKey=${config.whois.apiKey}&emailAddress=${email}`;
  const { data } = await axios({
    method: "get",
    url,
  });
  logger.info(`Validation for ${email}; ${JSON.stringify(data)}`);

  // Is email good
  if (
    data.formatCheck === "true" &&
    data.smtpCheck === "true" &&
    data.dnsCheck === "true" &&
    data.disposableCheck !== "true"
  )
    return true;

  return false;
};

module.exports = {
  validateMail,
};
