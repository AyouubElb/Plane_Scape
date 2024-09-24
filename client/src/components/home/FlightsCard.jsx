import { Modal, Button } from "react-bootstrap";
import { IoIosAirplane } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const FlightsCard = ({ flight }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Extract relevant details from flight data
  const departureTime = new Date(flight.scheduleDateTime).toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  );
  const arrivalTime = new Date(flight.estimatedLandingTime).toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  );
  const scheduleDate = new Date(flight.scheduleDateTime)
    .toISOString()
    .split("T")[0]; // Schedule date (yyyy-MM-dd format)
  const departureAirport = flight.route.destinations[0]; // Assuming the first destination is the departure airport
  const arrivalAirport = flight.route.destinations[1]; // Assuming the second destination is the arrival airport
  const airline = flight.flightName; // Using the flight name as the airline name

  // Function to generate a random price
  const getRandomPrice = () => {
    return (Math.random() * (500 - 100) + 100).toFixed(2); // Random price between $100 and $500
  };

  // Function to generate a random duration
  const getRandomDuration = () => {
    const hours = Math.floor(Math.random() * 4); // Random hours between 0 and 3
    const minutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59
    return `${hours === 0 ? 2 : hours}h ${minutes}min`;
  };

  const price = getRandomPrice();
  const duration = getRandomDuration();

  // Handle booking flight
  const handleBookFlight = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      // If the user is not logged in, navigate to the signin page
      navigate("/signin");
      return;
    }
    // Check if the scheduled date is before today's date
    // const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-MM-dd format
    // if (scheduleDate < today) {
    //   Swal.fire({
    //     title: "Invalid Date!",
    //     text: "You cannot make a reservation for this date.",
    //     icon: "error",
    //     confirmButtonText: "OK",
    //   });
    //   return;
    // }
    // If the user is logged in and the date is valid, proceed with booking the flight
    const flightDetails = {
      flightNumber: airline,
      departureTime,
      arrivalTime,
      duration,
      price,
      from: departureAirport,
      to: arrivalAirport,
    };
    try {
      // Include token in the Authorization header
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await axios.post(
        "http://localhost:8000/api/flights/book",
        flightDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token with the request
          },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Flight booked successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/my-flights");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to book the flight.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error booking flight:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while booking the flight.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div>
      <div className="bg-white mt-6 lg:min-w-[600px]  rounded-xl rounded-bl-none min-h-[200px]">
        <div className="flex flex-col gap-6">
          <div className="font-bold px-4 text-sm mt-4 text-gray-800">
            {departureAirport} - {arrivalAirport ? arrivalAirport : "XYZ"}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-center px-4">
              <div className="text-xs text-gray-500 flex items-center gap-2">
                {/* <div><FlightTakeoffIcon /></div> */}
                <div>Departure</div>
              </div>
              <div className="font-bold text-sm">{departureTime}</div>
              <div className="text-sm text-gray-500">
                Airport: {departureAirport}
              </div>
            </div>
            <div className="text-gray-400">______</div>
            <div className="flex flex-col justify-center">
              <div className="text-sm font-bold text-green-700">{airline}</div>
              {/* <div><FlightIcon sx={{ color: '#4b1c7d', transform: 'rotate(90deg)' }} /></div> */}
              <div className="text-sm text-gray-500">{duration}</div>
            </div>
            <div className="text-gray-400">______</div>
            <div className="flex flex-col justify-center px-4">
              <div className="text-xs text-gray-500 flex items-center gap-2">
                {/* <div><FlightLandIcon /></div> */}
                <div>Arrival</div>
              </div>
              <div className="font-bold text-sm">{arrivalTime}</div>
              <div className="text-sm text-gray-500">
                Airport: {arrivalAirport ? arrivalAirport : "XYZ"}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 px-4">
              <div className="text-purple-900 font-bold text-sm">
                Price: ${price}
              </div>{" "}
              {/* Random price */}
              <div className="text-xs text-gray-500">
                {arrivalAirport ? "One Way Trip" : "Round Trip"}
              </div>{" "}
              {/* Trip type based on availability */}
            </div>
            <div>
              <button
                onClick={handleBookFlight}
                className="bg-purple-900 py-4 px-8 text-white text-sm font-medium rounded-br-md rounded-tl-md"
              >
                Book Flight
              </button>
            </div>
          </div>
        </div>
      </div>
      <Button
        className="bg-gray-200 px-4 py-2 rounded-b-md text-xs text-purple-900 underline"
        style={{
          backgroundColor: "#e5e7eb",
          padding: "0.5rem 1rem",
          borderRadius: "0 0 0.5rem 0.5rem",
          fontSize: "0.75rem",
          color: "#6b46c1",
          textDecoration: "underline",
          border: "none",
        }}
        onClick={handleShow}
      >
        Check the details
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="w-screen">
            <div className="flex flex-col items-center justify-center">
              {/* Brand Header */}
              <div className="flex items-center justify-center mb-2">
                <div className="bg-purple-300 rounded-full mr-2">
                  <IoIosAirplane className="text-[28px] text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 ml-2 mr-12">
                  Plane&nbsp;Scape
                </h1>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl font-bold text-purple-900 mb-2 text-center">
                Flight Details
              </h2>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="py-[2rem] px-[4rem]">
            {/* Airline Information */}
            <div className="mb-4">
              <p className="font-bold text-lg text-gray-800">{airline}</p>
              <p className="text-gray-600">
                Flight Number: {flight.flightNumber}
              </p>
            </div>

            {/* Departure and Arrival Information */}
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-gray-500">Departure</p>
                <p className="font-bold text-lg">{departureTime} AM</p>
                <p className="text-sm text-gray-500">{departureAirport}</p>
              </div>
              <div className="bg-purple-300 rounded-full mr-2 h-fit">
                <IoIosAirplane className="text-[28px] text-white" />
              </div>
              <div>
                <p className="text-gray-500">Arrival</p>
                <p className="font-bold text-lg">{arrivalTime} PM</p>
                <p className="text-sm text-gray-500">
                  {arrivalAirport ? arrivalAirport : "XYZ"}
                </p>
              </div>
            </div>

            {/* Duration and Price */}
            <div className="mb-4">
              <p className="font-bold text-lg">
                Flight Duration:{" "}
                <span className="text-gray-700">{duration}</span>
              </p>
            </div>
            <div className="mb-4">
              <p className="font-bold text-lg">
                Price: <span className="text-green-600">${price}</span>
              </p>
            </div>

            {/* Additional Message */}
            <div className="text-center">
              <p className="text-gray-600 font-semibold">
                Wishing you a safe and pleasant journey with Plane Scape!
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <FlightInfo show={show} /> */}
    </div>
  );
};

export default FlightsCard;
