const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  issue_title: { type: String }, 
  issue_text: { type: String }, 
  created_on: { type: Date, required: true },
  updated_on: { type: Date, required: true },
  open: { type: Boolean, required: true },
  created_by: { type: String }, 
  assigned_to: String,
  status_text: String,
  project: String,
});

const Issue = mongoose.model("projects", userSchema);

module.exports = Issue;
