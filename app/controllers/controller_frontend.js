const connect = require('../models/db.js');

const home = (req, res, next) => {
  connect.execute ('SELECT * FROM article ')
  .then(results => {
    //console.log(results[0])
    const mascots = [
      { name: 'Taty', organization: "DigitalOcean", birth_year: 2012},
      { name: 'Tux', organization: "Linux", birth_year: 1996},
      { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ]
    const home = {
      heading: 'My Home Page', 
      img: '/img/desert.jpg', 
      img2: '/img/monts.jpg'
    }
    
    const tagline = "No programming concept is complete without a cute animal mascot.";
    res
    .status(200)
    .render('pages/home.njk', {
      home: home,
      articles: results[0],
      mascots: mascots,
      tagline: tagline,
    });
  })
  .catch(err => {
     res 
      .status(500)
      .json({message: err.message || 'some error occured'})
  })
  
   
}

const about = (req, res, next) => {
  res.render('pages/about.njk', {about:{
    heading:"mon heading about",
    img: "/img/desert.jpg"
  }})
}

module.exports = {
  home,
  about
}