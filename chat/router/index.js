const router = require("express").Router();

router.all("/chat", (req, res) => {
  res.header("Content-Type", "text/html");
  res.render("chat/index");
});

module.exports = router;
