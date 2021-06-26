const express = require("express");
var path = require("path")
let nunjucks = require("nunjucks")
const homeRoute = require('./app/routes/home')
const aboutRoute = require('./app/routes/about')
const cors = require("cors");
const app = express();


const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: "http://localhost:8080"
};
// Then pass them to cors:
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.set("view engine", "njk")
nunjucks.configure(['views'],  { // setting default views folder
  autoescape: true,
  express: app,
  web: {async:true}
})
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', homeRoute)
app.use('/about', aboutRoute)
require("./app/routes/back")(app)

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});