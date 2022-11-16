const router = require("express").Router();

require("./model");



router.get("/", (req, res) => {
  res.send("Hello World!");
});


module.exports = router;
