const express = require("express");
const router = express.Router();

// route - Get api/auth
// description -
// access - Public

router.get("/test", (req, res) => {
  res.send("test");
});

module.exports = router;
