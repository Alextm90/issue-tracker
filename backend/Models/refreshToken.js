const mongoose = require("mongoose");
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
  token: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;
