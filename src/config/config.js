const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    CORSWHITELIST: Joi.string().required(),
    VALID_API_KEY: Joi.string().required(),
    WHOIS_API_KEY: Joi.string().description("api key for whois service"),
    MAILWIZZ_PUBLIC_KEY: Joi.string().required(),
    MAILWIZZ_SECRET: Joi.string().required(),
    MAILWIZZ_BASE_URL: Joi.string().required(),
    SMTP_HOST: Joi.string().description("server that will send the emails"),
    SMTP_PORT: Joi.number().description("port to connect to the email server"),
    SMTP_USERNAME: Joi.string().description("username for email server"),
    SMTP_PASSWORD: Joi.string().description("password for email server"),
    SMTP_EMAIL_FROM: Joi.string().description(
      "the from field in the emails sent by the app"
    ),
    SMTP_EMAIL_REPLY_TO: Joi.string().description(
      "the reply to field in emails sent by the app"
    ),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  apiKey: envVars.VALID_API_KEY,
  corswhitelsit: envVars.CORSWHITELIST,
  whoisApiKey: envVars.WHOIS_API_KEY,
  mailwizz: {
    publicKey: envVars.MAILWIZZ_PUBLIC_KEY,
    secret: envVars.MAILWIZZ_SECRET,
    url: envVars.MAILWIZZ_BASE_URL,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.SMTP_EMAIL_FROM,
    replyTo: envVars.SMTP_EMAIL_REPLY_TO,
  },
};
