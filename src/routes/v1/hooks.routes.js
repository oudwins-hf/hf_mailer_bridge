const express = require("express");
const httpStatus = require("http-status");
const auth = require("../../middlewares/auth");
const hookController = require("../../controllers/hookController");
const trackingService = require("../../services/tracking.service");

const router = express.Router();

router.use(auth());

router.post("/cnu_subscriber", async (req, res, next) => {
  res.status(httpStatus.OK).send("registered Hook");

  const reqBody = Object.keys(req.body).length > 0 ? req.body : req.query;

  await hookController.createOrUpdateSubscriber(reqBody, req, res, next);
});

router.post("/track_action", async (req, res, next) => {
  res.status(httpStatus.OK).send("registered Hook");

  // 1. Get Unique User ID (hubspot tracking code)
  const reqBody = Object.keys(req.body).length > 0 ? req.body : req.query;
  const uuid = reqBody.uuid;
  delete reqBody.uuid;
  // we are expecting
  // - uuid
  // - listId (or funnelId)
  // - ??? some fields to update

  // 2. Get the user email by calling CRM API
  const userdata = await trackingService.getContactByUUID(uuid);
  // 3. call our c&update subscriber hook with the content & the email

  // HOW AM I GOING TO DO THIS?
  // I need a list of funnels then their steps link to the url? Maybe I can store that info inside every page. Load the script with the function then make a script file that calls the function telling it the funnel & the step (i.e what it is called)
});
module.exports = router;
