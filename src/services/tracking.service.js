const config = require("../config/config");
const axios = require("axios");
const fs = require("fs/promises");

const getContactByUUID = async function (uuid) {
  const url = `http://api.hubapi.com/contacts/v1/contact/utk/${uuid}/profile?hapikey=${config.hubspot.apiKey}&property=email&property=ip_state`;
  // email
  // ip_state
  try {
    const response = await axios({
      method: "get",
      url,
    });
    if (!response.data.is - contact) return null;

    return {
      EMAIL: response.data.properties.email.value,
      PROVINCIA: response.data.properties.ip_state.value,
      // SHOULD ADD COUNTRY & IP!
    };
  } catch (err) {
    // 404 not found
    console.log(err.response.status);
  }
};

module.exports = {
  getContactByUUID,
};
