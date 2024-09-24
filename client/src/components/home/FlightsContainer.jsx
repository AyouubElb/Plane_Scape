import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import FlightsCard from "./FlightsCard";
import { nanoid } from "nanoid";
// import Loading from "../Other/Loading";

const FlightsContainer = ({ direction, date }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch flights with pagination and filters
  const fetchFlights = async (pageNumber) => {
    try {
      // Build query parameters based on direction and date
      let apiUrl = `http://localhost:8000/api/flights?page=${pageNumber}`;
      if (direction) apiUrl += `&flightDirection=${direction}`;
      if (date) apiUrl += `&scheduleDate=${date}`;

      const response = await axios.get(apiUrl);
      const fetchedFlights = response.data.flights;

      setFlights((prevFlights) => [...prevFlights, ...fetchedFlights]);
      setHasMore(fetchedFlights.length > 0);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  // Load more flights when user scrolls to the bottom
  const handleScroll = useCallback(() => {
    const scrollContainer = document.getElementById("flights-container");
    if (
      scrollContainer.scrollTop + scrollContainer.clientHeight >=
      scrollContainer.scrollHeight
    ) {
      if (hasMore && !loading) {
        setLoading(true);
        setPage((prevPage) => {
          const newPage = prevPage + 1;
          fetchFlights(newPage);
          return newPage;
        });
      }
    }
  }, [hasMore, loading]);

  useEffect(() => {
    // Reset flights when direction or date changes
    setFlights([]);
    setPage(0);
    fetchFlights(0); // Fetch the first page of flights with new filters

    const scrollContainer = document.getElementById("flights-container");
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [handleScroll, direction, date]);

  const generateUniqueKey = (flight) => {
    return `${flight.flightNumber}__${flight.scheduleDate}__${flight.id}`;
  };
  return (
    <div id="flights-container" style={{ overflowY: "auto", height: "110vh" }}>
      {flights.map((flight) => (
        <FlightsCard key={nanoid()} flight={flight} />
      ))}
    </div>
  );
};

export default FlightsContainer;
