const { json } = require('express');
const express = require('express');
const router = express.Router();

const Vault = require('../../modules/vault');

// route - GET api/vault/get-credentials
// description - gets credentials stored for website name
// access - Public
router.get('/get-credentials/:sitename', async (req, res) => {
  try {
    console.log('entered /api/vault/get-credentials');
    const credentials = await Vault.find({ sitename: req.params.sitename });

    res.json(credentials);
  } catch (error) {
    console.log('/get-credentials: ' + error);
  }
});

// route - GET api/vault/load-names
// description - gets website names and record counts for each website name
// access - Public
router.get('/load-names', async (req, res) => {
  try {
    let results = [];
    let siteNamesSet = new Set();
    let recordCounts = {};

    const credentials = await Vault.find({}, 'sitename');

    for (let i = 0; i < credentials.length; i++) {
      siteNamesSet.add(credentials[i].sitename);
      recordCounts[credentials[i].sitename] = (recordCounts[credentials[i].sitename] || 0) + 1;
    }

    let recordCountKeys = Object.keys(recordCounts);
    let siteNamesArray = Array.from(siteNamesSet);

    for (let i = 0; i < siteNamesArray.length; i++) {
      results.push({
        siteName: recordCountKeys[i],
        recordCount: recordCounts[siteNamesArray[i]]
      });
    }

    res.json(results);
  } catch (error) {
    console.log('/load-names: ' + error);
  }
});

// route - POST api/vault/save-credentials
// description - saves new credentials
// access - Public
router.post('/save-credentials', async (req, res) => {
  try {
    let search1 = await Vault.findOne({ sitename: req.body.sitename, username: req.body.username });

    let search2 = await Vault.findOne({ sitename: req.body.sitename, email: req.body.email });

    // console.log('search1.length: ' + search1.length);
    // console.log('search2.length: ' + search2.length);

    if (!(search1 || search2)) {
      let vaultEntry = new Vault({
        sitename: req.body.sitename,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        comment: req.body.comment
      });

      vaultEntry.save();

      res.status(200).send('Credential saved successfuly.');
    } else {
      console.log('sending 200;');
      res.status(400).send('Server error. Credential already already exists.');
    }
    //   console.log("req.boby.sitename: " + req.body.sitename);
    //   res.send(req.params);
  } catch (error) {
    console.log('/save-credentials: ' + error);
  }
});

module.exports = router;
