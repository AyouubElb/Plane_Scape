import { useState } from "react";

const FlightsFilter = ({ onFilterApply }) => {
  const [direction, setDirection] = useState("");
  const [date, setDate] = useState("");

  // Handle Apply Filter button click
  const handleApplyFilter = (e) => {
    e.preventDefault();
    const selectedDirection = direction || ""; // 'A' for arrival, 'D' for departure, '' for no selection
    const selectedDate = date ? new Date(date).toISOString().split("T")[0] : ""; // Format date to yyyy-MM-dd

    console.log("direction", direction);

    onFilterApply({ direction: selectedDirection, date: selectedDate });
  };

  return (
    <div className="hidden lg:block p-4 bg-gray-100 text-gray-800 max-w-xs mx-auto md:max-w-full">
      <form onSubmit={handleApplyFilter}>
        {/* Sort By */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Sort by:</label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option>Lowest Price</option>
            <option>Highest Price</option>
          </select>
        </div>

        {/* Arrival Time */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Arrival Time</h2>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="time1"
              name="arrivalTime"
              className="mr-2"
            />
            <label htmlFor="time1" className="flex-grow">
              5:00 AM - 11:59 AM
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="time2"
              name="arrivalTime"
              className="mr-2"
            />
            <label htmlFor="time2" className="flex-grow">
              12:00 PM - 5:59 PM
            </label>
          </div>
        </div>

        {/* Stops */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Stops</h2>
          <div className="flex items-center mb-2">
            <input type="radio" id="nonstop" name="stops" className="mr-2" />
            <label htmlFor="nonstop" className="flex-grow">
              Nonstop
            </label>
            <span>$230</span>
          </div>
          <div className="flex items-center mb-2">
            <input type="radio" id="1stop" name="stops" className="mr-2" />
            <label htmlFor="1stop" className="flex-grow">
              1 Stop
            </label>
            <span>$230</span>
          </div>
          <div className="flex items-center mb-2">
            <input type="radio" id="2stops" name="stops" className="mr-2" />
            <label htmlFor="2stops" className="flex-grow">
              2+ Stops
            </label>
            <span>$230</span>
          </div>
        </div>

        {/* Airlines Included */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Airlines Included</h2>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="alitalia"
              name="airlines"
              className="mr-2"
            />
            <label htmlFor="alitalia" className="flex-grow">
              Alitalia
            </label>
            <span>$230</span>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="lufthansa"
              name="airlines"
              className="mr-2"
            />
            <label htmlFor="lufthansa" className="flex-grow">
              Lufthansa
            </label>
            <span>$230</span>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="airfrance"
              name="airlines"
              className="mr-2"
            />
            <label htmlFor="airfrance" className="flex-grow">
              Air France
            </label>
            <span>$230</span>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="brussels"
              name="airlines"
              className="mr-2"
            />
            <label htmlFor="brussels" className="flex-grow">
              Brussels Airlines
            </label>
            <span>$230</span>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="airitaly"
              name="airlines"
              className="mr-2"
            />
            <label htmlFor="airitaly" className="flex-grow">
              Air Italy
            </label>
            <span>$230</span>
          </div>
          <div className="flex items-center mb-2">
            <input type="radio" id="siberia" name="airlines" className="mr-2" />
            <label htmlFor="siberia" className="flex-grow">
              Siberia
            </label>
            <span>$230</span>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="aireuropa"
              name="airlines"
              className="mr-2"
            />
            <label htmlFor="aireuropa" className="flex-grow">
              Air Europa
            </label>
            <span>$230</span>
          </div>
        </div>

        {/* Direction Filter */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Direction</h2>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="arrival"
              name="direction"
              value="A"
              className="mr-2"
              onChange={(e) => setDirection(e.target.value)}
            />
            <label htmlFor="arrival" className="flex-grow">
              Arrival
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="departure"
              name="direction"
              value="D"
              className="mr-2"
              onChange={(e) => setDirection(e.target.value)}
            />
            <label htmlFor="departure" className="flex-grow">
              Departure
            </label>
          </div>
        </div>

        {/* Date Filter */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Scheduled Date</h2>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-900 text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          Filter Flights
        </button>
      </form>
    </div>
  );
};

export default FlightsFilter;
