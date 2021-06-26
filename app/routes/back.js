module.exports = app => {
  const user = require("../controllers/controller_backend");
  const router = require("express").Router();

  // Create a new user
 router.post("/article", user.insert);

  // Retrieve all user
  router.get("/", user.getAll);  

  // Retrieve a single userwith id
  router.get("/:id", user.getOne);

  // Update a user with id
 // router.put("/:id", user.update);

  // Delete a user with id
  //router.delete("/:id", user.delete);

  app.use('/api/user', router);
};