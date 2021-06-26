const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {  
  res.render('pages/home.html', {home:{
    heading:"mon heading about",
    img: "/img/desert.jpg"
  }})
})

module.exports = router