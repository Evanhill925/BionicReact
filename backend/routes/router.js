const express = require("express")
const router = express.Router()
const schemas = require("../models/schemas")
// const discord = require("../models/disclogin")
const { client } = require("../server")
require("dotenv/config")





const uploadImageToImgur = async (old_image_url) => {
  // console.log(old_image_url)
  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: process.env.accessToken,
        "Content-Type": "application/json",
        'User-agent': 'your bot 0.2'
      },
      body: JSON.stringify({
        image: old_image_url,
        type: "url"
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading image to Imgur:", error);
    throw error;
  }
};


const { Configuration, OpenAI } = require("openai");

const openai = new OpenAI();

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


      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: req.body.userInput,
        n: 1,
        size: "1024x1024",
        response_format: "url"
      });
      console.log(response)
      // url = response.data[0].b64_json;
      url = response.data[0].url;

      var imageStream = Buffer.from(url, "base64");

      const channel = client.channels.cache.get("1103168663617556571")


      // disc_upload_message = await channel.send({
      //   content: req.body.userInput,
      //   files: [{
      //     attachment: imageStream,
      //     name: 'file.png'
      //   }]
      // })




      // const imgurImageUrl = await uploadImageToImgur(url);

      // console.log(imgurImageUrl)
      // console.log('Uploading to Imgur: ', imgurImageUrl.data.link)

      // disc_upload_message = await channel.send({
      //   content: req.body.userInput +" "+ imgurImageUrl.data.link,

      // })
      console.log('Not Uploading to Imgur: ', url)

      disc_upload_message = await channel.send({
        content: req.body.userInput +" "+ url,

      })





      var params = {
        username: "someuser",
        image_url:  url,
        image_message_id: disc_upload_message.id,
        prompt: req.body.userInput+" Dall-e 3",
        type: "Upscale",
        //  alternate type name'Dalle 3',
        time: response.created,
      }

      console.log(params)

      Prompt = schemas.Entry(params)
      Prompt.save()
      res.send(JSON.stringify(params))
    } else {
      console.log("Midjourney subroutine")

      console.log(req.body)
      let a = req.body.userInput.trim() + req.body.model

      const channel = client.channels.cache.get("1103168663617556571")
      // console.log(channel)
      console.log(a)
      channel.sendSlash("936929561302675456", "imagine", a)
      channel.send(a)
      var midjourneyparams= {}

      const filter = (m) =>
        m.content.startsWith(`**${a}`) &&
        m.attachments.size == 1 &&
        m.author.id == "936929561302675456"
      // Errors: ['time'] treats ending because of the time limit as an error
      var result = channel
        .awaitMessages({ filter, max: 1, time: 120_000, errors: ["time"] })
        //   .then(collected=> response.render(__dirname + "/index.ejs", {name:collected.first().attachments.first().url,message_id: collected.first().id}))
        .then((collected) => {

          midjourneyparams = {
            username: "someuser",
            image_url: collected.first().attachments.first().url,
            image_message_id: collected.first().id,
            prompt: a,
            type: "Original",
            time: collected.first().createdTimestamp,
            
          }
          

        
          return uploadImageToImgur(collected.first().attachments.first().url)
        }).then((image) => {

          midjourneyparams.image_url = image.data.link
          params = midjourneyparams
          console.log(image, "image")
          console.log(image.data.link)

          
          

          console.log(params, "params")

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
  console.log(message.components)

  function determine_type(row, column) {
    if (column === 4) {
      return "Reimagine"
    }
    if (row === 0) {
      return "Upscale"
    } else if (row === 1) {
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
    // message.clickButton({ row: 0, col: 0})
    const filter = (m) =>
      m.attachments.size == 1 &&
      m.author.id == "936929561302675456" &&
      m.reference.messageId == request.body.message_id

    var result = channel
      .awaitMessages({ filter, max: 1, time: 120_000, errors: ["time"] })
      .then((collected) => {
        
        
        old_params = {
          username: "someuser",
          image_url: imgur_url,
          image_message_id: collected.first().id,
          origin_id: request.body.message_id,
          type: determine_type(request.body.row_, request.body.columns_),
          time: collected.first().createdTimestamp,
          prompt: request.body.prompt,
          quadrant: request.body.columns_,
        }
        
        return uploadImageToImgur(collected.first().attachments.first().url)

      }).then((image) => {
        params = old_params

        params.image_url = image.data.link

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
