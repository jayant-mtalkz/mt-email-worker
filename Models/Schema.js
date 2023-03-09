const mongoose = require("mongoose");
//Response Schema
const eventSchema = new mongoose.Schema({
  email: String,
  requestid: String,
  apikey: String,
  msg_id: String,
  eventstatus: String,
  timestamp: String,
});
const Event = mongoose.model("event", eventSchema);
module.exports = { Event };
