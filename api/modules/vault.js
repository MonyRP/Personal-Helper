const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  sitename: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
});

module.exports = Vault = mongoose.model("vault", UserSchema);
