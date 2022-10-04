const express = require("express");
const httpStatus = require("http-status");
const auth = require("../../middlewares/auth");
const hookController = require("../../controllers/hookController");
const trackingService = require("../../services/tracking.service");
const reqFormatter = require("../../utils/formatRequestData");

const router = express.Router();

router.use(auth());

router.post("/cnu_subscriber", async (req, res, next) => {
  res.status(httpStatus.OK).send("registered Hook");

  const reqBody = reqFormatter.formatRequestObj(
    Object.keys(req.body).length > 0 ? req.body : req.query
  );

  await hookController.createOrUpdateSubscriber(reqBody, req, res, next);
});

router.post("/track_action", async (req, res, next) => {
  res.status(httpStatus.OK).send("registered Hook");

  // 1. Get Unique User ID (hubspot tracking code)
  const reqBody = reqFormatter.formatRequestObj(
    Object.keys(req.body).length > 0 ? req.body : req.query
  );
  const uuid = reqBody.uuid;
  delete reqBody.uuid;
  const listId = reqBody.listId;
  delete reqBody.listId;
  // we are expecting
  // - uuid
  // - listId (or funnelId)
  // - ??? some fields to update

  // 2. Get the user email by calling CRM API
  const userdata = await trackingService.getContactByUUID(uuid);
  // 3. call our c&update subscriber hook with the content & the email
  if (!userdata) {
    await hookController.createOrUpdateSubscriber(
      { ...reqBody, ...userdata },
      req,
      res,
      next
    );
  }
});

router.post("/logreq", async (req, res, next) => {
  console.log(Object.keys(req.body).length > 0 ? req.body : req.query);
  const reqBody = reqFormatter.formatRequestObj(
    Object.keys(req.body).length > 0 ? req.body : req.query
  );
  res.status(httpStatus.OK).send("registered Hook");
  console.log(reqBody);
  console.log(JSON.stringify(reqBody));
});

module.exports = router;
