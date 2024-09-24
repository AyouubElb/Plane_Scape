import { useState } from "react";
import { IoIosAirplane, IoMdCalendar } from "react-icons/io";
import { FaTag, FaPlane } from "react-icons/fa6";
import {
  FaGlobeAmericas,
  FaPlaneDeparture,
  FaPlaneArrival,
} from "react-icons/fa";

const FlightSearchForm = () => {
  const [isOneWay, setIsOneWay] = useState(false);

  return (
    <div className="bg-white rounded-xl p-4 mr-5">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2">
          <FaPlane />
          <p className="font-roboto text-[0.9rem] font-medium uppercase">
            Book your flights
          </p>
        </div>
        <div>
          <button
            className={`font-roboto rounded-l-full px-[14px] py-[4px] ${
              !isOneWay
                ? "text-white bg-purple-300"
                : "text-purle-300 bg-purple-200"
            }`}
            onClick={() => setIsOneWay((prev) => !prev)}
          >
            Round trip
          </button>
          <button
            className={`font-roboto rounded-r-full px-[14px] py-[4px] ${
              isOneWay
                ? "text-white bg-purple-300"
                : "text-purle-300 bg-purple-200"
            }`}
            onClick={() => setIsOneWay((prev) => !prev)}
          >
            One way
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 mb-6">
        <div className="flex items-center col-span-1 bg-white border-[2px] border-gray-300 border-solid rounded-l-full h-[45px] mr-1">
          <FaPlaneDeparture className="text-purple-300 text-[20px] ml-2" />
          <input
            placeholder="Istanbul"
            className="focus:outline-none w-[75%] ml-2"
            type="text"
          />
        </div>
        <div className="flex items-center col-span-1 bg-white border-[2px] border-gray-300 border-solid rounded-r-full h-[45px] mr-4">
          <FaPlaneArrival className="text-purple-300 text-[20px] ml-2" />
          <input
            placeholder="Casablanca"
            className="focus:outline-none w-[75%] ml-2"
            type="text"
          />
        </div>
        <div className="flex items-center col-span-1 bg-white border-[2px] border-gray-300 border-solid rounded-l-full h-[45px] mr-1">
          <IoMdCalendar className="text-purple-300 text-[20px] ml-2" />
          <input type="date" className="w-[75%] ml-2" />
        </div>
        <div className="flex items-center col-span-1 bg-white border-[2px] border-gray-300 border-solid rounded-r-full h-[45px]">
          <IoMdCalendar className="text-purple-300 text-[20px] ml-2" />
          <input type="date" className="w-[75%] ml-2" />
        </div>
      </div>
      <button
        type="button"
        className="bg-purple-300 text-white font-roboto font-medium rounded-[8px] px-4 py-2"
      >
        Show flights
      </button>
    </div>
  );
};

export default FlightSearchForm;
