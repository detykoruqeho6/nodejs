const router = require("express").Router();

require("./model");
 

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/admin", require("./router/user"));



module.exports = router;
