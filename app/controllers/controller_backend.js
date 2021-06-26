const connect = require('../models/db.js');
let nunjucks = require("nunjucks")
//connect.config.namedPlaceholders = true;
//const promisePool = connect.promise();

/*
const getAll = function (req, res) {
  connect.execute ('SELECT * FROM ms_user ',  
    function(err, results, fields) {
      console.log(err)
      console.log(fields)
      console.log(results)
      res.json(results)
    }
  )
}
*/




const getAll = (req, res) => {
  connect.execute ('SELECT * FROM article ')
  .then(results => {
    console.log(results[0])
    res
      .status(200)
      .json(results[0]);
  })
  .catch(err => {
     res 
      .status(500)
      .json({message: err.message || 'some error occured'})
  })
  
  //connect.release()
}

const getOne = (req, res) => {
  const id = req.params.id;
  connect.execute ('SELECT * FROM ms_user WHERE id =' + id)
  .then(results => {
    console.log(results[0])
    const firstname = results[0].firstname
    const lastname = results[0].lastname
    const birthday = results[0].birthday
    var cont = ''
    nunjucks.render ('pages/parti.njk', {
      firstname: firstname,
      lastname: lastname,
      birthday: birthday
    }, 
    function(err, res2){
      console.log(res2)
      cont = res2
    })
    res
      .status(200)
      //.json(results[0])
      .json({content:cont})
    })
  .catch(err => {
     res 
      .status(500)
      .json({message: err.message || 'some error occured'})
  })
  
  //connect.release()
}


/*
async function getAll(req,res,next){
  try{
      const results = await promisePool.execute ('SELECT * FROM ms_user ');
      //results.release()
      if(results[0]){//results.row
            console.log(results[0]);
            res
              .status(200)
              .json(results[0]);
      }
      else{ console.error('Nobody');}
  }
  catch(err) {
    //results.release()
    res 
      .status(500)
      .json({message: err.message || 'some error occured'})
    }
}
*/

const insert = (req, res) => {
  console.log(req)
  if (!req.body.title || !req.body.content) {
      res
       .status(400)
       .send({ message: req +"---Content can not been empty!" });
      return;
  }
  console.log(req.body.title +'__'+req.body.content)
  connect.execute('INSERT INTO article (title, body) VALUES (?,?)', [req.body.title, req.body.content]) 
  .then(results => {
    console.log(results)
    res
      .status(200)
      .json(results);
  })
  .catch(err => {
     res 
      .status(500)
      .json({message: err.message || 'some error occured'})
  })
  //connect.release()
} 

module.exports = {
  getAll,
  getOne,
  insert
}