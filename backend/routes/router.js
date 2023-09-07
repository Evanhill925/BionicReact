const express = require("express")
const router = express.Router()
const schemas = require("../models/schemas")

router.get("/", (req, res) => {})

router.get("/gallery", async (req, res) => {
  const entry = schemas.Entry
  const pulledFromDb = await entry.find({}).exec()
  let fiftyHeldItems = pulledFromDb.slice(-300).reverse()
  if (fiftyHeldItems) {
    res.send(JSON.stringify(fiftyHeldItems))
  }
})

module.exports = router
