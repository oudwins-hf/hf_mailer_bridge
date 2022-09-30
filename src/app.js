const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const httpStatus = require("http-status");
//
const morgan = require("./config/morgan");
const logger = require("./config/logger");
const routes = require("./routes/v1");
const config = require("./config/config");
// errors
const ApiError = require("./utils/ApiError");
const { errorConverter, errorHandler } = require("./middlewares/error");

const app = express();

// Loading morgan logger?
if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Set Security HTTP headers
app.use(helmet());

// Parse JSON
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// Cors
// const corsWhitelist = config.CORSWHITELIST.split(",");
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (corsWhitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(cors());
app.options("*", cors());

// health route
app.use("/status", async (req, res, next) => {
  res.status(200).send({
    status: "active",
  });
});

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
