const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/admin.auth.middleware");
const adminAuthController = require("../controllers/admin.auth.controller");
const slotsFetchController = require("../controllers/slots.fetch.controller");
const slotsModifyController = require("../controllers/slots.modify.controller");

// Signup admin and return token
router.post("/signup", adminAuthController.signup);

// Login admin and return token
router.post("/login", adminAuthController.login);

// Fetch all booked slots for the admin
router.get(
  "/booked-slots",
  authenticateToken,
  slotsFetchController.fetchBookedSlotsForAdmin
);

// Create Available time slots
router.post(
  "/slots",
  authenticateToken,
  slotsModifyController.createAvailableTimeSlot
);
module.exports = router;
