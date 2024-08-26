const express = require("express");
const { handleRenderHome } = require("../controllers/pagesController");

const router = express.Router();

router.get("/", handleRenderHome);

module.exports = router;
