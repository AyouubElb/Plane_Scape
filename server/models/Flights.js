const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true],
    }, // Reference to user who booked the flight
    flightNumber: { type: String },
    departureTime: { type: String },
    arrivalTime: { type: String },
    duration: { type: String },
    price: { type: String },
    from: { type: String }, // Departure city
    to: { type: String }, // Arrival city
  },
  { timestamps: true }
);

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
