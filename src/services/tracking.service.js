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
    console.log(response.data);
    // is-contact (boolean) -> data.is-contact
    //data.properties.email.value
    // data.properties.ip_state.value

    // {
    //   vid: 1769051,
    //   'canonical-vid': 1769051,
    //   'merged-vids': [],
    //   'portal-id': 6603113,
    //   'is-contact': false,
    //   properties: { hs_is_contact: { value: 'false', versions: [Array] } },
    //   'form-submissions': [],
    //   'list-memberships': [],
    //   'identity-profiles': [
    //     {
    //       vid: 1769051,
    //       'saved-at-timestamp': 1662546732706,
    //       'deleted-changed-timestamp': 0,
    //       identities: []
    //     }
    //   ],
    //   'merge-audits': []
    // }
  } catch (err) {
    // 404 not found
    console.log(err.response.status);
  }
};

module.exports = {
  getContactByUUID,
};
