const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    default: null,
  },
  startTime: Date,
  endTime: Date,
});

module.exports = mongoose.model("Slot", slotSchema);
