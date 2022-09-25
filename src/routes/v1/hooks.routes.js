const express = require("express");
const httpStatus = require("http-status");
const auth = require("../../middlewares/auth");
const maillingService = require("../../services/mailling.service");
const validationService = require("../../services/validation.service");
const ApiError = require("../../utils/ApiError");

const router = express.Router();

router.use(auth());

router.post("/cnu_subscriber", async (req, res, next) => {
  res.status(httpStatus.OK).send("registered Hook");

  const reqBody = Object.keys(req.body).length > 0 ? req.body : req.query;

  // Extracting data to reorder it.
  // Need to extract the list id & the ip then place it however
  const { userIp, listId, verifyMail } = reqBody;
  delete reqBody.userIp;
  delete reqBody.listId;
  delete reqBody.verifyMail;
  reqBody.details = {
    ip_address: userIp || req.socket.remoteAddress,
    status: "confirmed",
  };

  // ! SEARCH BY EMAIL
  let subscriberExists;
  try {
    subscriberExists = await maillingService.subscribers.searchByEmail(
      listId,
      reqBody.EMAIL
    );
  } catch (err) {
    subscriberExists = err;
  }
  subscriberExists = JSON.parse(subscriberExists);
  // status -> success = subscriber exists
  // status -> error = subscriber does not exist
  if (subscriberExists.status === "success") {
    const updatedSub = await maillingService.subscribers.update(
      listId,
      subscriberExists.data.subscriber_uid,
      reqBody
    );
  } else {
    const isvalid = await validationService.validateMail(reqBody.EMAIL);
    if (!isvalid)
      return next(
        new ApiError(
          httpStatus.BAD_REQUEST,
          `${reqBody.EMAIL} is an invalid email`,
          true
        )
      );
    const createdSub = await maillingService.subscribers.create(
      listId,
      reqBody
    );
  }
});

module.exports = router;
