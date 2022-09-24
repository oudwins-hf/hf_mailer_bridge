const express = require("express");
const mailwizz = require("node-mailwizz");
const auth = require("../../middlewares/auth");
const config = require("../../config/config");

const router = express.Router();

const subscriberService = new mailwizz.ListSubscribers({
  publicKey: config.mailwizz.publicKey,
  secret: config.mailwizz.secret,
  baseUrl: config.mailwizz.url,
});

router.use(auth());

router.get("/subscriber_action", async (req, res, next) => {
  //
  const reqBody = Object.keys(req.body).length > 0 ? req.body : req.query;

  // Need to extract the list id & the ip then place it however
  //
  console.log(req.query);
  if (req.body) console.log("body true");
  res.send();
});

module.exports = router;
