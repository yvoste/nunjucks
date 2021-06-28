const express = require('express')
const router = express.Router()
const front = require("../controllers/controller_frontend");

/*router.get('/', (req, res, next) => {
  res.render('pages/about.njk', {about:{
    heading:"monheadingabout",
    img: "/img/monts.jpg"
  }})
})*/
router.get('/', front.about)

module.exports = router