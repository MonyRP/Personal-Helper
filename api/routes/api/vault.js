const express = require("express");
const router = express.Router();

const Vault = require("../../modules/vault");

// route - GET api/vault/get-credentials
// description -
// access - Public
router.get("/get-credentials/:sitename", async (req, res) => {
  try {
    console.log("entered /api/vault/get-credentials");
    const credentials = await Vault.find({ sitename: req.params.sitename });

    res.json(credentials);
  } catch (error) {
    console.log("/get-credentials: " + error);
  }
});

// route - GET api/vault/load-names
// description -
// access - Public
router.get("/load-names", async (req, res) => {
  try {
    console.log("entered /api/vault/load-names");
    const credentials = await Vault.find();

    res.json(credentials);
  } catch (error) {
    console.log("/load-names: " + error);
  }
});

// route - POST api/vault/save-credentials
// description -
// access - Public
router.post("/save-credentials", (req, res) => {
  try {
    let vaultEntry = new Vault({
      sitename: req.body.sitename,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      comment: req.body.comment,
    });

    vaultEntry.save();

    res.status(200);
    //   console.log("req.boby.sitename: " + req.body.sitename);
    //   res.send(req.params);
  } catch (error) {
    console.log("/save-credentials: " + error);
  }
});

module.exports = router;
