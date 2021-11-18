const express = require("express");
const router = express.Router();
const URL = require("../models/Url");
const validateURL = require('valid-url');

// Randomly generates a 7 character shortened url
const generateShortURL = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortURL = "";
    for (var i = 0; i < 7; i++){
        let randomNum = Math.floor(Math.random() * alphabet.length);
        shortURL += alphabet[randomNum];
    }
    return shortURL;
}

// Posts a long url and returns URL object
router.post("/", async (req, res) => {
  var longURL = req.body.longURL;
  // If url provided is not valid, add http:// to it, and see if that works
  if (!validateURL.isWebUri(longURL)){
    longURL = "http://" + longURL;
  }
  if (validateURL.isWebUri(longURL)){
    // Create a shortened url
    const url = new URL({
    longURL: longURL,
    shortURL: generateShortURL()
    });
    try {
    const newURL = await url.save();
    return res.status(200).json({ url: newURL });
    } catch (err) {
    return res.status(400).json({ msg: err.message });
    }


  } else {
    return res.status(400).json({ msg: "Please enter a valid url" });
  }
});

// Redirect user to longer url when visiting shorter url
router.get('/:shortURL', async (req, res) => {
    console.log(req.params.shortURL);
    try {
        const url = await URL.findOne({
            shortURL: req.params.shortURL
        });
        if (url) {
            return res.redirect(url.longURL);
        }
        return res.status(404).json('Not found')
    }
    // exception handler
    catch (err) {
        console.error(err);
        res.status(500).json({msg: err.message});
    }
})



module.exports = router;