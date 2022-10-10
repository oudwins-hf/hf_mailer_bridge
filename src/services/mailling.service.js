const mailwizz = require("node-mailwizz");
const config = require("../config/config");

const mwConfig = {
  publicKey: config.mailwizz.publicKey,
  secret: config.mailwizz.secret,
  baseUrl: config.mailwizz.url,
};

const searchByEmail = async function (listId, email) {
  const subscribers = new mailwizz.ListSubscribers(mwConfig);
  return new Promise((resolve, reject) => {
    subscribers
      .emailSearch(listId, email)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const update = async function (listId, userId, userInfo) {
  const subscribers = new mailwizz.ListSubscribers(mwConfig);
  return new Promise((resolve, reject) => {
    subscribers
      .update(listId, userId, userInfo)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

const create = async function (listId, userInfo) {
  const subscribers = new mailwizz.ListSubscribers(mwConfig);
  return new Promise((resolve, reject) => {
    subscribers
      .create(listId, userInfo)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

module.exports = {
  subscribers: {
    searchByEmail,
    update,
    create,
  },
};
