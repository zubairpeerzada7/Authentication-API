const Admin = require("../models/admin");
const Slot = require("../models/slot");

class SlotsFetchController {
  //fetch all free slots for admin

  fetchFreeSlotsForAdmin = async (req, res, next) => {
    try {
      const adminId = req.params.adminId;
      const fetchedAdmin = await Admin.findOne({ universityId: adminId });
      if (!fetchedAdmin) {
        return res
          .status(400)
          .json({ error: "Admin with that id not available" });
      }
      const slots = await Slot.find({
        admin: fetchedAdmin._id.toString(),
        student: null,
      });
      res.json({ metadata: { length: slots.length }, data: { slots } });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // fetch booked slots for admin

  fetchBookedSlotsForAdmin = async (req, res, next) => {
    try {
      const adminId = req.user._id;
      const slots = await Slot.find(
        {
          admin: adminId,
          student: { $ne: null },
        },
        { _id: false }
      ).populate("student", { name: 1, universityId: 1, _id: 0 });
      res.json({ metadata: { length: slots.length }, data: { slots } });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Fetch all booked slots by a single student for the providers
  fetchBookedSlotsForStudent = async (req, res) => {
    try {
      const studentId = req.user._id;

      const slots = await Slot.find(
        { student: studentId },
        { _id: false }
      ).populate("admin", { _id: 0, universityId: 1, name: 1 });
      res.json({ metadata: { length: slots.length }, data: { slots } });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new SlotsFetchController();
