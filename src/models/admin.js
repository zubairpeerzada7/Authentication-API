const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  universityId: String,
  password: String,
  name: String,
});

module.exports = mongoose.model("Admin", adminSchema);
