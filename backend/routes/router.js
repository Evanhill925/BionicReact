const express = require("express")
const router = express.Router()
const schemas = require("../models/schemas")

router.get("/", (req, res) => {})

router.get("/gallery", async (req, res) => {
  const entry = schemas.Entry
  const pulledFromDb = await entry.find({}).exec()
  let fiftyHeldItems = pulledFromDb.slice(-51).reverse()
  if (fiftyHeldItems) {
    res.send(JSON.stringify(fiftyHeldItems))
  }
})

// app.get('/gallery',async(request,response)=>{
// 	const pulledFromDb = await Entry.find();
// 	let fiftyHeldItems = pulledFromDb.slice(-51).reverse()
// 	response.render("gallery.ejs", {items:fiftyHeldItems})
// })

module.exports = router
