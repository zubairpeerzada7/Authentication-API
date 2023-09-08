const moment = require("moment");
const Slot = require("../models/slot");

class SlotsModifyController {
  // Create Available time slots

  createAvailableTimeSlot = async (req, res) => {
    const { startTime, endTime } = req.body;
    if (
      !startTime ||
      !endTime ||
      !moment(startTime).isValid() ||
      !moment(endTime).isValid()
    ) {
      return res.status(400).json({ message: "Arguments not provided" });
    }
    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({ message: "Start & End Dates mismatch" });
    }
    try {
      const slotBooked = await Slot.findOne({
        admin: req.user._id,
        student: { $ne: null },
        startTime: { $lte: endTime },
        endTime: { $gte: startTime },
      });
      if (slotBooked) {
        return res.status(400).json({ error: "Slot is already booked" });
      }

      // Create a new slot
      const slotObject = {
        admin: req.user._id,
        student: null,
        startTime,
        endTime,
      };
      const slot = new Slot(slotObject);

      await slot.save();
      res.status(201).json({
        data: {
          slot: {
            ...slotObject,
          },
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Book time slot by student

  createBookingForTimeSlot = async (req, res) => {
    const slotId = req.params.id;
    const studentId = req.user._id;
    try {
      const fetchedSlot = await Slot.findOne({
        _id: slotId,
        student: null,
      }).populate("admin", { _id: 0, universityId: 1, name: 1 });
      if (!fetchedSlot) {
        return res.status(400).json({ error: "Slot not available" });
      }
      const result = await Slot.findByIdAndUpdate(
        { _id: slotId },
        { $set: { student: req.user._id } }
      ).lean();

      res.status(201).json({
        data: {
          slot: {
            ...result,
            student: req.user._id,
            admin: {
              name: fetchedSlot.admin.name,
              universityId: fetchedSlot.admin.universityId,
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
module.exports = new SlotsModifyController();
