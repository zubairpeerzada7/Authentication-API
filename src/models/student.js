const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  universityId: String,
  password: String,
  name: String,
});

module.exports = mongoose.model("Student", studentSchema);
