const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/student.auth.middleware");
const studentAuthController = require("../controllers/student.auth.controller");
const slotsFetchController = require("../controllers/slots.fetch.controller");
const slotsModifyController = require("../controllers/slots.modify.controller");

// Signup student and return bearer token
router.post("/signup", studentAuthController.signup);

// Login student and return bearer token
router.post("/login", studentAuthController.login);

// Fetch all free slots for the admin
router.get(
  "/:adminId/free-slots",
  authenticateToken,
  slotsFetchController.fetchFreeSlotsForAdmin
);

// Fetch all booked slots by a single student for the providers
router.get(
  "/booked-slots",
  authenticateToken,
  slotsFetchController.fetchBookedSlotsForStudent
);

// Book a session with the provider
router.patch(
  "/slots/:id/book",
  authenticateToken,
  slotsModifyController.createBookingForTimeSlot
);

module.exports = router;
