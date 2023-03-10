require("dotenv").config();
const Redis = require("ioredis");
const sgmail = require("@sendgrid/mail");
sgmail.setApiKey(process.env.SECRET_API_KEY);
const { Worker } = require("bullmq");
const { emailQueue, DefaultTTL } = require("./config/constant");
const { redisConnection } = require("./config/redisConfig");

try {
  // Creating redis connection
  const redis = new Redis(redisConnection);
  redis.on("error", (err) => {
    console.log("Can't connect to redis");
  });

  // Creating Email-worker for sending email
  const worker = new Worker(emailQueue.email, async (job) => {
    const payload = job.data;
    const { requestid, apikey } = job.data;
    console.log(`Consumed data from ${emailQueue.email} queue`);
    console.log(payload);
    const msg = payload.data;
    try {
      //Send data to sendgrid
      await sgmail.send(msg, (error, response) => {
        if (error) {
          console.log("Error", error.response.body);
          response = {
            status: "Rejected",
            errorCode: "MT0400",
            errorMessage: "Bad Request",
          };
          return response;
        } else {
          console.log("Message sent successfully................");
          const message_id = response[0].headers["x-message-id"];
          // Map the returned message id with our request id and apikey
          const mapKey = `REQMAP:email:${message_id}`;
          const value = { requestid, apikey, message_id };
          redis.set(mapKey, JSON.stringify(value), "EX", DefaultTTL);
          if (response[0].statusCode == 202) {
            msg.personalizations.forEach((element) => {
              element.to.forEach(async (object) => {
                const email_id = object.email;
                response = { status: "Accepted" };
                const key = `REQM:${apikey}:${requestid}:${message_id}:${email_id}`;
                await redis.set(
                  key,
                  JSON.stringify(response),
                  "ex",
                  DefaultTTL
                );
                console.log("api set in redis");
              });
            });
          }
          return response;
        }
      });
    } catch (error) {
      console.log(error, error.response.body);
    }
  });
} catch (err) {
  console.log("Error", err);
}
