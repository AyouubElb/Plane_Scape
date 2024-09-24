const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import Routes
const flightsRoutes = require("./routes/flightsRoute");
const userRoutes = require("./routes/userRoutes");

//config
const app = express();
require("dotenv").config();

// Middelware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes Middleware
app.use("/api/flights", flightsRoutes);
app.use("/api/users", userRoutes);

//Run the app
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("Database is connected ..."))
  .catch((err) => console.log(`Database could not connect ... ${err}`));

app.listen(port, () => console.log(`App is running on port : ${port}`));
