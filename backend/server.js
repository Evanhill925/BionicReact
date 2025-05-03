const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require("dotenv/config")


const {channel} = require('node:diagnostics_channel')
const { Client , Events} = require('discord.js-selfbot-v13');

const client = new Client({
	// See other options here
	// https://discordjs-self-v13.netlify.app/#/docs/docs/main/typedef/ClientOptions
	// All partials are loaded automatically
	checkUpdate: false,
});

client.login(process.env.token);
client.once('ready', () => {
  console.log(`${client.user.tag}  logged in`);

});

module.exports.client = client

const router = require("./routes/router")


const app = express()

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
const corsOptions = {
  origin: "*",
  Credentials: true,
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use("/", router)

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
  .connect(process.env.DB_URI, dbOptions)
  .then(console.log("Connected to DB"))
  .catch((err) => console.log(err))

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log("Connected to port " + port)
})
