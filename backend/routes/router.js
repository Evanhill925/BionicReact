const express = require("express")
const router = express.Router()
const schemas = require("../models/schemas")
// const discord = require("../models/disclogin")
const { client } = require("../server")
require("dotenv/config")
const fs = require('fs');
const axios = require('axios');

const AWS = require('aws-sdk');

// Set the AWS region
AWS.config.update({ region: 'us-east-1' });

// Create an S3 service object
const s3 = new AWS.S3();


// Function to upload an image from URL to S3
async function uploadImageFromUrlToS3(imageUrl, objectName) {
  try {
    console.log('Uploading image from URL to S3:')
      // Fetch the image content from the URL using axios
      const response = await axios({
          method: 'get',
          url: imageUrl,
          responseType: 'arraybuffer'  // Important: Get the image as binary data
      });


      // Set up the S3 upload parameters
      const params = {
          Bucket: 'bioniccrayonbucket',       // S3 Bucket name
          Key: objectName,          // Name of the file in the bucket
          Body: response.data,      // Image content (binary data)
          ContentType: response.headers['content-type'] // Dynamically set the content type from the response headers
      };

      // Upload the image to S3
      const uploadResult = await s3.upload(params).promise();

        // Return the location (URL) of the uploaded image
        return uploadResult.Location;

  } catch (error) {
      console.error('Error downloading or uploading the image:', error);
  }
}


async function uploadImageFromB64ToS3(b64, objectName) {
  try {
    

    const base64Data = b64.replace(/^data:image\/\w+;base64,/, '');

    // Convert base64 string to a Buffer
    const buffer = Buffer.from(base64Data, 'base64');

      // Set up the S3 upload parameters
      const params = {
          Bucket: 'bioniccrayonbucket',       // S3 Bucket name
          Key: objectName,          // Name of the file in the bucket
          Body: buffer,      // Image content (binary data)
          ContentType: 'image/png' // Dynamically set the content type from the response headers
      };

      // Upload the image to S3
      const uploadResult = await s3.upload(params).promise();

        // Return the location (URL) of the uploaded image
        return uploadResult.Location;

  } catch (error) {
      console.error('Error downloading or uploading the image:', error);
  }
}




const { Configuration, OpenAI } = require("openai");

const openai = new OpenAI();

router.get("/", (req, res) => {})

router.get("/userImages/:num", async (req, res) => {
  const entry = schemas.Entry;
  
  const num = Number(req.params.num);  // Get the number from the request parameter

  // Query to fetch the last `num` entries, sorted by creation date (descending order)
  const heldItems = await entry
    .find({})
    .sort({ _id: -1 })  // Sort by _id in descending order, which reflects the creation time
    .limit(num)          // Limit to the number of items requested
    .exec();

  if (heldItems) {
    res.send(JSON.stringify(heldItems));  // Send the results as JSON
  }
});

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

router.delete("/image/:imageId", async (req, res) => {
  console.log("Delete route fired")
  console.log(req.params.imageId)
  try {
    const entry = schemas.Entry;
    
    // Delete the image document from MongoDB
    const deletedImage = await entry.findOneAndDelete({ 
        _id: req.params.imageId 
    }).exec();
    
    if (!deletedImage) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});






router.post("/Prompt", async (req, res) => {
  // response.render("index.ejs", {image_url:"https://media.discordapp.net/attachments/1103168663617556571/1116864121149849690/lilhelper_fox_man_hunted_webcam_99eba765-c8f8-4270-aee4-0f1dc0519c5e.png?width=559&height=559"})
  // console.log(adasdasdasd)()
  console.log("Prompt route fired")
  console.log(req.body)
  // console.log(discord.channel)
  try {
    let response;
    let channel;
    let disc_upload_message;
    let s3_url;




    if (req.body.model === "Dalle 3") {
      console.log("Dalle 3 subroutine")
      channel = client.channels.cache.get("1103168663617556571")

      // await channel.send({
      //   content: req.body.userInput})



      response = await openai.images.generate({
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

      console.log('Not Uploading to Imgur: ', url)

      disc_upload_message = await channel.send({
        content: req.body.userInput +" "+ url,

      })


      

    

      s3_url = await uploadImageFromUrlToS3(url, disc_upload_message.id);

      console.log(s3_url)






      var params = {
        username: "someuser",
        image_url:  s3_url,
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
    }
    else if (req.body.model === "gpt-image-1")  {
        if (req.body.imageData){

          function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]), 
                n = bstr.length, 
                u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }



          console.log("gpt-image-1 subroutine with image")

          response = await openai.images.edit({
            model: "gpt-image-1",
            prompt: req.body.userInput,
            size: "1024x1024",
            output_format:'png',

            quality: req.body.quality || 'medium',
            moderation:'low',
            image: dataURLtoFile(req.body.imageData,'dog')
            // background:'transparent'
          });

        }
        else {
          console.log("gpt-image-1 subroutine without image")
       
  
  
  
        response = await openai.images.generate({
          model: "gpt-image-1",
          prompt: req.body.userInput,
          n: 1,
          size: "1024x1024",
          output_format:'png',
          quality: req.body.quality || 'medium',
          moderation:'low',
          // background:'transparent'
        });
      }


        console.log(response)
        rawdata = response.data[0].b64_json;
        // url = response.data[0].url;
        
        // imageStream = response.data[0]
  
        // var imageStream = Buffer.from(url, "base64");
        channel = client.channels.cache.get("1103168663617556571")
  


  
        disc_upload_message = await channel.send({
          content: req.body.userInput +" ",
  
        })
  
        s3_url = await uploadImageFromB64ToS3(rawdata, disc_upload_message.id);
        
        disc_upload_message = await channel.send({
          content: req.body.userInput +" "+ s3_url,
  
        })

        
  
      
  
  
        console.log(s3_url)
  
  
  
  
  
  
        var params = {
          username: "someuser",
          image_url:  s3_url,
          image_message_id: disc_upload_message.id,
          prompt: req.body.userInput+" gpt-image-1",
          type: "Upscale",
          //  alternate type name'Dalle 3',
          time: response.created,
        }
  
        console.log(params)
  
        Prompt = schemas.Entry(params)
        Prompt.save()
        res.send(JSON.stringify(params))
      





    }
    else {
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

          let imageUrl = collected.first().attachments.first().url;
          const imageMessageId = collected.first().id;
          // function that checks if process.env.env is production or development

          function isProduction() {
            return process.env.env === 'production';
          }

          if (isProduction()) {
            localFilePath = `../images/${imageMessageId}.png`;
            imageUrl = `https://bionic-crayons.com/images/${imageMessageId}.png`;
          }
          else {
            localFilePath = `../images/${imageMessageId}.png`;

          }


          if (!fs.existsSync('../images')) {
            fs.mkdirSync('../images', { recursive: true });
          }

          midjourneyparams = {
            username: "someuser",
            image_url: imageUrl,
            image_message_id: collected.first().id,
            prompt: a,
            type: "Original",
            time: collected.first().createdTimestamp,
            local_file_path: localFilePath


            
          }

          uploadImageFromUrlToS3(imageUrl, imageMessageId).then((s3_url) => {
            midjourneyparams.image_url = s3_url
            console.log(s3_url)
            params = midjourneyparams
          // console.log(image, "image")
          // console.log(image.data.link)
          console.log(params, "params")

          Prompt = schemas.Entry(params)
          Prompt.save()
          res.send(JSON.stringify(params))
          }
          )  
        })

          

        

    }
  // } catch (error) {
  //   console.log("Error in /prompt endpoint image: WOWOWOWOOWOWO")
  //   console.log(error.code)
  //   if (error.code ==='moderation_blocked') {
  //     console.log("Moderation blocked the request")
  //   params = {
  //     error_code: 400,
  //     error_message: "Your request was rejected as a result of OpenAi's safety system. Your request may contain content that is not allowed.",
  //     // error: error,
  //   }}

  //   res.send(JSON.stringify(params))
  //   console.error("Error in /prompt endpoint image:", error)
  // }
} catch (error) {
  console.log("Error in /prompt endpoint image: WOWOWOWOOWOWO")
  console.log(error.code)

  let params = {} // <-- always define this

  if (error.code === 'moderation_blocked') {
    console.log("Moderation blocked the request")
    params = {
      error_code: 400,
      error_message: "blocked_request",
    }
  } else if (error.code === 'billing_hard_limit_reached') {
    console.log("Billing hard limit reached")
    params = {
      error_code: 402,
      error_message: "no_tokens",
    }
  } else {
    params = {
      error_code: 500,
      error_message: "An unexpected error occurred",
    }
  }

  console.error("Error in /prompt endpoint image:", error)
  res.status(params.error_code).json({
    message: params.error_message,
    code: params.error_code
  })
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
  console.log(message.components, "button that i clicked")

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
    message.clickButton({ Y: request.body.row_, X: request.body.columns_ })
    // message.clickButton({ Y: 1, X: 2})
    const filter = (m) =>
      m.attachments.size == 1 &&
      m.author.id == "936929561302675456" &&
      m.reference.messageId == request.body.message_id

    var result = channel
      .awaitMessages({ filter, max: 1, time: 120_000, errors: ["time"] })
      .then((collected) => {
        
        
        old_params = {
          username: "someuser",
          image_url: collected.first().attachments.first().url,
          image_message_id: collected.first().id,
          origin_id: request.body.message_id,
          type: determine_type(request.body.row_, request.body.columns_),
          time: collected.first().createdTimestamp,
          prompt: request.body.prompt,
          quadrant: request.body.columns_,
        }

        
        
        // return uploadImageToImgur(collected.first().attachments.first().url)

      }).then((image) => {

        uploadImageFromUrlToS3(old_params.image_url, old_params.image_message_id).then((s3_url) => {
          old_params.image_url = s3_url
          console.log(s3_url)
          params = old_params

        // params.image_url = image.data.link

        console.log(params)

        Prompt = new entry(params)
        Prompt.save()
        res.send(JSON.stringify(params))
        }
        )
        
      })
      .catch((collected) =>
        console.log(
          `After a minute, only ${collected.size} ${collected} out of 4 voted.`
        )
      )
  }
})

module.exports = router
