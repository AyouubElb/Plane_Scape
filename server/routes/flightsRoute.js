const express = require("express");

const {
  allFlights,
  bookFlight,
  bookedFlights,
} = require("../controllers/flightController");

const { validateToken } = require("../middlewares/auth"); // Middleware to validate user token

const router = express.Router();

router.get("/", allFlights);

// Route to book a flight
router.post("/book", validateToken, bookFlight);

// Route to fetch booked flights
router.get("/booked-flights", validateToken, bookedFlights);

module.exports = router;
