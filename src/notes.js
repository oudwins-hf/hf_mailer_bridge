const mailWizz = require("node-mailwizz");
const axios = require("axios");
// const app = require("./app");

const config = {
  publicKey: "cabf1c85521457cc6421d9e69983c54743105498",
  secret: "b6170c60c51a46dc92c49141157508cc851ce512",
  baseUrl: "https://app.heikefreiremail.com/api",
};

const subscribers = new mailWizz.ListSubscribers(config);

// @heikefreire
// var userInfo = {
//   //replace the values with your user info
//   EMAIL: "tristanmayo@heikefreire.com",
//   FNAME: "Tristan",
//   LNAME: "Calval",
//   SEDES: "madrid",
//   PROVINCIA: "Provincia Test",
//   DATECONVERSION: "2022-10-19",
//   NUMERO: "601348190",
//   SEDE: "madrid",
//   INTERES: "infancia",
// };

// @gmail
// var userInfo = {
//   //replace the values with your user info
//   EMAIL: "tantris1998@gmail.com",
//   FNAME: "Tristan",
//   LNAME: "Calval",
//   SEDES: "barcelona, madrid",
//   SEDE_MADRID: "true",
//   PROVINCIA: "Provincia Test",
//   DATECONVERSION: "2022-10-19",
//   NUMERO: "601348190",
//   SEDE: "madrid",
//   INTERES: "msg2",
//   details: {
//     ip_address: "125.125.125.125",
//   },
// };

// SEARCH
// subscribers
//   .emailSearch("xk0614bm67e6d", "tristanmayo@heikefreire.com")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// subscribers
//   .create("xk0614bm67e6d", userInfo)
//   .then(function (result) {
//     console.log(result);
//   })
//   .catch(function (err) {
//     //handle error here
//     console.log(err);
//   });
// xp21259bv531b

const userInfo = { FNAME: "tristan", EMAIL: "tantris1998@gmail.com" };

subscribers
  .update("xk0614bm67e6d", "kg859b9231e21", userInfo)
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    //handle error here
    console.log(err);
  });

// RESPONSES
// CREATED
// SUCCESS -> {"status":"success","data":{"record":{"subscriber_uid":"fo725act9r1f2","email":"tristanmayo@heikefreire.com","ip_address":"","source":"api","date_added":{"expression":"NOW()","params":[]}}}}
// error -> {"status":"error","error":"The subscriber already exists in this list."}

// subscribers.emailSearch("LIST-UNIQUE-ID", "SUBSCRIBER-EMAIL")
// .then(function(result) {
// //TODO: do what you want
// })
// .catch(function(err) {
// //handle error here
// });
