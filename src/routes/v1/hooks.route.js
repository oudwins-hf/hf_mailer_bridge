const express = require("express");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.use(auth());

router.get("/subscriber_action", async (req, res, next) => {
  console.log(req.body);
  res.send();
});
