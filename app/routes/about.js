const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('pages/about.njk', {about:{
    heading:"monheadingabout",
    img: "/img/monts.jpg"
  }})
})

module.exports = router