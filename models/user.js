const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/tesatapp2");

const userSchema = new mongoose.Schema({
  image: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

module.exports = mongoose.model("user", userSchema);
