const Redis = require("ioredis");
const fastify = require("fastify")({ logger: true });
const { Queue } = require("bullmq");
const { emailQueue, DefaultTTL } = require("./config/constant");
const { redisConnection } = require("./config/redisConfig");

try {
  //Event Queue for storing event status
  const myQueue = new Queue(emailQueue.events, {
    connection: redisConnection,
  });
  //API FOR storing event webhooks response
  const redis = new Redis(redisConnection);
  redis.on("error", (err) => {
    console.log("Can't connect to redis");
  });

  //Callback from sendgrid
  fastify.post("/webhooks", async (req, res) => {
    const body = req.body;
    //console.log("::::::::::::::::Body:::::::::::::", body);

    body.forEach(async (object) => {
      var requestid;
      let apikey;
      const eventReceived = object.event;
      //Extracting message id from sendgrid message id
      let message_id = object.sg_message_id;
      const index = message_id.indexOf(".");
      message_id = message_id.substring(0, index);
      const email = object.email;
      const response = { status: eventReceived };
      console.log(response);
      await redis.get(`REQMAP:email:${message_id}`, function (err, value) {
        (requestid = JSON.parse(value).requestid),
          console.log(requestid, "*************");
        apikey = JSON.parse(value).apikey;
      });
      const key = `REQM:${apikey}:${requestid}:${message_id}:${email}`;
      await redis.set(key, JSON.stringify(response), "ex", DefaultTTL);
      console.log("Redis key set", key);
      //Adding response to the queue
      const eventresponse = {
        status: eventReceived,
        requestid: requestid,
        apikey: apikey,
        timestamp: object.timestamp,
        msg_id: message_id,
        to: email,
      };
      await myQueue.add("Response", eventresponse);
    });

    return res.status(200).send();
  });
} catch (err) {
  console.log("Erorrrr", err);
}

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
