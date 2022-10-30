const express = require("express");
const router = express.Router();

const { uploadImageLocal } = require("../controller/source-controller");

router.post("/upload", uploadImageLocal);

module.exports = router;
