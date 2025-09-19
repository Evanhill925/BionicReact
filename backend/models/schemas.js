const mongoose = require("mongoose")
const Schema = mongoose.Schema

const midSchema = new mongoose.Schema({
  username: { type: String },
  prompt: { type: String },
  image_url: { type: String },
  image_message_id: { type: String },
  type: { type: String },
  origin_id: { type: String },
  time: { type: String },
  quadrant: { type: String },
  midjourneywebsiteurl: { type: String },
})
const Entry = mongoose.model("userInstruction", midSchema)
const mySchemas = { Entry: Entry }

module.exports = mySchemas
