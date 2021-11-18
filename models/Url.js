const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLSchema = new Schema({
  longURL: {
    type: String,
    required: true
  },
  shortURL: {
    type: String,
    required: true
  }
});

const URL = mongoose.model("URL", URLSchema);
module.exports = URL;