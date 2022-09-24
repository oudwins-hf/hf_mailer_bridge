const express = require("express");
const config = require("../../config/config");
// routes
const hooksRoute = require("./hooks.routes");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/hooks",
    route: hooksRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// /* istanbul ignore next */
// if (config.env === "development") {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
