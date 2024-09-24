const Flight = require("../models/Flights");

// Controller to get flights from the API
exports.allFlights = async (req, res) => {
  try {
    // Access the page query parameter
    const page = req.query.page || 1;
    //  // Extract query parameters from the request
    //  const { flightDirection, scheduleDate } = req.query;

    //  // Construct the query parameters dynamically
    const apiUrl = `https://api.schiphol.nl/public-flights/flights?page=${page}`;
    //  const params = {};

    //  if (flightDirection) {
    //    params.flightDirection = flightDirection; // 'A' for arrival, 'D' for departure
    //  }

    //  if (scheduleDate) {
    //    params.scheduleDate = scheduleDate; // Format should be yyyy-MM-dd
    //  }

    const result = await fetch(
      apiUrl,
      //   new URLSearchParams({
      //     includedelays: "false",
      //     page: "0",
      //     sort: "-scheduleTime",
      //     flightDirection: "D",
      //     ...searchparams,
      //   }),
      {
        headers: {
          app_id: "6d4ba530",
          app_key: "e5165117a5bb55e1462769061cf5b93b",
          ResourceVersion: "v4",
        },
      }
    );
    const data = await result.json();
    // Check if flights exist in the data
    if (data.flights) {
      // Get the length of the flights array
      const flightsLength = data.flights.length;

      // Add the length to the response (optional)
      res.json({
        totalFlights: flightsLength,
        flights: data.flights,
      });
    } else {
      // Handle the case where there are no flights
      res.json({
        totalFlights: 0,
        flights: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};

// Controller to save a booked flight
exports.bookFlight = async (req, res) => {
  const {
    flightNumber,
    departureTime,
    arrivalTime,
    duration,
    price,
    from,
    to,
  } = req.body;
  const userId = req.user.id; // Assuming user is authenticated and user ID is available in req.user

  try {
    const newFlight = new Flight({
      user: userId,
      flightNumber,
      departureTime,
      arrivalTime,
      duration,
      price,
      from,
      to,
    });

    await newFlight.save();
    res
      .status(200)
      .json({ message: "Flight booked successfully", flight: newFlight });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to book flight", error: error.message });
  }
};

// Controller to get the booked flights of the signed-in user
exports.bookedFlights = async (req, res) => {
  const userId = req.user.id; // Assuming user is authenticated and user ID is available in req.user

  try {
    const flights = await Flight.find({ user: userId });
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve booked flights",
      error: error.message,
    });
  }
};
