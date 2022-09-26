const maillingService = require("../services/mailling.service");
const validationService = require("../services/validation.service");
const ApiError = require("../utils/ApiError");

const createOrUpdateSubscriber = async function (reqBody, req, res, next) {
  // Extracting data to reorder it.
  // Need to extract the list id & the ip then place it however
  const { userIp, listId } = reqBody;
  delete reqBody.userIp;
  delete reqBody.listId;
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
};

module.exports = {
  createOrUpdateSubscriber,
};
