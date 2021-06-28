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
    const data = results[0][0]
    console.log(data)
    console.log(data.firstname)
    const fs = require('fs');
    const path = require('path');
    const template = fs.readFileSync(path.join(__dirname, '../../','views/pages/parti.html'), 'utf8');
    // Another way to write the same thing using object destruction in ES6. We use  directly the name of property to use fonctionnality
    /*
    const { readFileSync}  = require('fs');
    const { join } = require('path');
    const template = readFileSync(join(__dirname, '../../','views/pages/parti.html'), 'utf8');
    */
    console.log(template)
    //Mon Oct 22 2001 00:00:00 GMT+0200 (GMT+02:00)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric' };
    const dato = data.birthday.toLocaleDateString('fr-FR', options)
    const output = nunjucks.renderString(template.toString(), {
      firstname: data.firstname,
      lastname: data.lastname,
      birthday: dato
    })
    console.log(output)
    res
      .status(200)
      .json({content:output})
      //.send({content: cont})
    })
  .catch(err => {
     res 
      .status(500)
      .json({messageQQ: err.message || 'some error occured'})
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