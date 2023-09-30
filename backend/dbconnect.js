mongoose = require("mongoose");
require("dotenv").config();

const db = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = db;
