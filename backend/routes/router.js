const express = require("express")
const router = express.Router()
const schemas = require("../models/schemas")
// const discord = require("../models/disclogin")

require("dotenv/config")


const {channel} = require('node:diagnostics_channel')

const { Client , Events} = require('discord.js-selfbot-v13');


const client = new Client({
	// See other options here
	// https://discordjs-self-v13.netlify.app/#/docs/docs/main/typedef/ClientOptions
	// All partials are loaded automatically
	checkUpdate: false,
});
 




























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




router.post("/Prompt",async (req,res)=>{
	// response.render("index.ejs", {image_url:"https://media.discordapp.net/attachments/1103168663617556571/1116864121149849690/lilhelper_fox_man_hunted_webcam_99eba765-c8f8-4270-aee4-0f1dc0519c5e.png?width=559&height=559"})
	// console.log(adasdasdasd)()
  console.log('503')
  // console.log(discord.channel)

	console.log(req.body)
	let a = req.body.userInput.trim() + req.body.model

  // client.login(process.env.token);


  client.on('ready',() => {
    console.log(`${client.user.tag}  logged in`);
    const channel = client.channels.cache.get('1103168663617556571');
    // console.log(channel)
    console.log(a)
    channel.sendSlash('936929561302675456','imagine', a)
    channel.send(a)


    const filter = m => m.content.startsWith(`**${a}`)&&m.attachments.size==1&&m.author.id =='936929561302675456'
// Errors: ['time'] treats ending because of the time limit as an error
 var result = channel.awaitMessages({ filter, max: 1, time: 120_000, errors: ['time'] })
//   .then(collected=> response.render(__dirname + "/index.ejs", {name:collected.first().attachments.first().url,message_id: collected.first().id}))
	.then(collected=>{
		var params = { username: "someuser",
		 				image_url:collected.first().attachments.first().url,
		  				image_message_id: collected.first().id,
		   				prompt:a,
						type:'Original',
						time:collected.first().createdTimestamp,
						// items:storedDBItems
					}

		console.log(params)
    // const entry = schemas.Entry

		Prompt = schemas.Entry(params)
		Prompt.save()
    res.send(JSON.stringify(params))		})





  });

	// const channel = client.channels.cache.get('1103168663617556571');
  // console.log(channel)
  // channel.sendSlash('936929561302675456','imagine', a)

  // discord.channel.sendSlash('936929561302675456','imagine', a)
	
	
	// let storedDBItems = await dbItems()


	// const filter = m => m.content.startsWith('!vote');





// 	const filter = m => m.content.startsWith(`**${a}`)&&m.attachments.size==1&&m.author.id =='936929561302675456'
// // Errors: ['time'] treats ending because of the time limit as an error
//  var result = channel.awaitMessages({ filter, max: 1, time: 120_000, errors: ['time'] })
// //   .then(collected=> response.render(__dirname + "/index.ejs", {name:collected.first().attachments.first().url,message_id: collected.first().id}))
// 	.then(collected=>{
// 		var params = { username: "someuser",
// 		 				image_url:collected.first().attachments.first().url,
// 		  				image_message_id: collected.first().id,
// 		   				prompt:a,
// 						type:'Original',
// 						time:collected.first().createdTimestamp,
// 						items:storedDBItems
// 					}

// 		console.log(params)
// 		Prompt = new Entry(params)
// 		Prompt.save()
// 		response.render("index.ejs", params)
// 		})
//   .catch(collected =>{ console.log(`After a minute, only ${collected.size} ${collected} out of 4 voted.`)
// 						res.redirect('/')																				});
})






module.exports = router
