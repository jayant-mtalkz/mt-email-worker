require("dotenv").config();
const { Worker } = require("bullmq");
const mongoose = require("mongoose");
const { Event } = require("./Models/Schema");
const { emailQueue } = require("./config/constant");
const url = process.env.DATABASE;
try {
  const worker = new Worker(emailQueue.events, async (job) => {
    console.log(`Consumed data from ${emailQueue.events} queue`);
    const eventData = job.data;
    const query = {
      apikey: eventData.apikey,
      msg_id: eventData.msg_id,
      requestid: eventData.requestid,
      email: eventData.to,
    };
    const chk = await Event.findOne(query);

    //console.log("checking collection", chk);

    if (chk) {
      try {
        //console.log("type", typeof (eventData.status));
        await Event.updateOne(query, {
          $set: {
            eventstatus: eventData.status,
            timestamp: eventData.timestamp,
          },
        });
      } catch (err) {
        console.log("Errorrrr occured****", err);
      }
    } else {
      console.log("data not present");
      const newPayload = {
        apikey: eventData.apikey,
        requestid: eventData.requestid,
        msg_id: eventData.msg_id,
        email: eventData.to,
        eventstatus: eventData.status,
        timestamp: eventData.timestamp,
      };
      Event.create(newPayload);
    }
  });
} catch (err) {
  console.log("Error", err);
}

async function connect() {
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
    console.log("connected to mongodb");
  } catch (error) {
    console.error(error);
  }
}
connect();
