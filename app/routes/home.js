const express = require('express')
const router = express.Router()
const front = require("../controllers/controller_frontend");

/*router.get('/', (req, res, next) => {
  res.render('pages/home.html', {home:{
    heading:"mon heading about",
    img: "/img/desert.jpg"
  }})
})*/

router.get('/', front.home)


module.exports = router