const express = require("express")
const router = express.Router()
const schemas = require("../models/schemas")
// const discord = require("../models/disclogin")
const { client } = require("../server")
require("dotenv/config")

router.get("/", (req, res) => {})

router.get("/userImages/:num", async (req, res) => {
  const entry = schemas.Entry
  const pulledFromDb = await entry.find({}).exec()
  let heldItems = pulledFromDb.slice(-Number(req.params.num)).reverse()

  if (heldItems) {
    res.send(JSON.stringify(heldItems))
  }
})

router.get("/home", async (req, res) => {
  const entry = schemas.Entry
  const pulledFromDb = await entry.find({}).exec()
  let heldItems = pulledFromDb.slice(-6).reverse()
  if (heldItems) {
    res.send(JSON.stringify(heldItems))
  }
})

router.get("/image/:imageID", async (req, res) => {
  const entry = schemas.Entry
  const image_for_display = await entry
    .findOne({ image_message_id: req.params.imageID })
    .exec()
  if (image_for_display) {
    res.send(JSON.stringify(image_for_display))
  }
})

router.post("/Prompt", async (req, res) => {
  // response.render("index.ejs", {image_url:"https://media.discordapp.net/attachments/1103168663617556571/1116864121149849690/lilhelper_fox_man_hunted_webcam_99eba765-c8f8-4270-aee4-0f1dc0519c5e.png?width=559&height=559"})
  // console.log(adasdasdasd)()
  console.log("Prompt route fired")
  // console.log(discord.channel)
  try {
    if (req.body.model === "Dalle 3") {
      console.log("Dalle 3 subroutine")

      DallerequestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.DalleKey,
        },
        body: JSON.stringify({
          prompt: req.body.userInput,
          n: 2,
          size: "1024x1024",
        }),
      }

      const res = await fetch(
        "https://api.openai.com/v1/images/generations",
        DallerequestOptions
      )
      const data = await res.json()
      url = data.data[0].url
      // NEED TO UPDATE THESE VALUES WHEN API RELEASES
      //specifically image_message_id & time
      //possibly also type
      var params = {
        username: "someuser",
        image_url: data.data[0].url,
        image_message_id: null,
        prompt: req.body.userInput,
        type: null,
        //  alternate type name'Dalle 3',
        time: null,
      }

      console.log(params)

      Prompt = schemas.Entry(params)
      Prompt.save()
      res.send(JSON.stringify(params))
    } else {
      console.log("Midjourney subroutine")

      console.log(req.body)
      let a = req.body.userInput.trim() + req.body.quality + req.body.model

      const channel = client.channels.cache.get("1103168663617556571")
      // console.log(channel)
      console.log(a)
      channel.sendSlash("936929561302675456", "imagine", a)
      channel.send(a)

      const filter = (m) =>
        m.content.startsWith(`**${a}`) &&
        m.attachments.size == 1 &&
        m.author.id == "936929561302675456"
      // Errors: ['time'] treats ending because of the time limit as an error
      var result = channel
        .awaitMessages({ filter, max: 1, time: 120_000, errors: ["time"] })
        //   .then(collected=> response.render(__dirname + "/index.ejs", {name:collected.first().attachments.first().url,message_id: collected.first().id}))
        .then((collected) => {
          var params = {
            username: "someuser",
            image_url: collected.first().attachments.first().url,
            image_message_id: collected.first().id,
            prompt: a,
            type: "Original",
            time: collected.first().createdTimestamp,
          }

          console.log(params)

          Prompt = schemas.Entry(params)
          Prompt.save()
          res.send(JSON.stringify(params))
        })
    }
  } catch (error) {
    console.error("Error in discordbot image:", error)
  }
})

router.post("/Button", async (request, res) => {
  const entry = schemas.Entry

  console.log("button pressed")
  console.log(request.body)

  var targetmessage = request.body.message_id
  // const test_channel = '1103168663617556571'

  const channel = client.channels.cache.get("1103168663617556571")
  console.log(targetmessage)
  const message = await channel.messages.fetch(request.body.message_id)

  function determine_type(row, column) {
    if (column === "4") {
      return "Reimagine"
    }
    if (row === "0") {
      return "Upscale"
    } else if (row === "1") {
      return "Variation"
    } else {
      return null
    }
  }

  async function find_premades(row, column, search_type) {
    const existing_image = await entry
      .findOne({
        origin_id: request.body.message_id,
        quadrant: column,
        type: search_type,
      })
      .exec()
    // const existing_image = await Entry.findOne({ origin_id: request.body.message_id}).exec();
    console.log(
      request.body.message_id,
      request.body.columns_,
      determine_type(request.body.row_, request.body.columns_)
    )
    return existing_image
  }

  const premade_image = await find_premades(
    request.body.row_,
    request.body.columns_,
    determine_type(request.body.row_, request.body.columns_)
  )

  if (premade_image != null) {
    console.log("variant already in database.")
    res.send(JSON.stringify(premade_image))
  } else {
    // .then(message=>message.clickButton({ row: button_row, col: button_column}));
    message.clickButton({ row: request.body.row_, col: request.body.columns_ })
    const filter = (m) =>
      m.attachments.size == 1 &&
      m.author.id == "936929561302675456" &&
      m.reference.messageId == request.body.message_id

    var result = channel
      .awaitMessages({ filter, max: 1, time: 120_000, errors: ["time"] })
      .then((collected) => {
        var params = {
          username: "someuser",
          image_url: collected.first().attachments.first().url,
          image_message_id: collected.first().id,
          origin_id: request.body.message_id,
          type: determine_type(request.body.row_, request.body.columns_),
          time: collected.first().createdTimestamp,
          prompt: request.body.prompt,
          quadrant: request.body.columns_,
        }

        console.log(params)

        Prompt = new entry(params)
        Prompt.save()
        res.send(JSON.stringify(params))
      })
      .catch((collected) =>
        console.log(
          `After a minute, only ${collected.size} ${collected} out of 4 voted.`
        )
      )
  }
})

module.exports = router
