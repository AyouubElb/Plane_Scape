import { IoIosAirplane } from "react-icons/io";
import { FaTag } from "react-icons/fa6";
import { FaGlobeAmericas } from "react-icons/fa";
import profile from "../../assets/profile.png";
import FlightSearchForm from "./FlightSearchForm";
import Facilities from "./Facilities";
import FlightsContainer from "./FlightsContainer";
import FlightsFilter from "./FlightsFilter";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const url = "http://localhost:8000";

  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({ direction: "", date: "" });

  // Function to get user info from the database
  const getUserdata = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, cannot authenticate user.");
      return;
    }

    try {
      const response = await axios.get(`${url}/api/users/userInfo`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        photo: response.data.photo,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      getUserdata();
    }
  }, [setUser]);
  // Handle filter apply
  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
  };
  return (
    <section className="w-full overflow-hidden bg-lightGrey rounded-2xl p-4">
      <div className="flex justify-between mb-4">
        <div className="flex items-center cursor-pointer">
          <div className="bg-purple-300 rounded-full mr-2">
            <IoIosAirplane className="text-[28px] text-white" />
          </div>
          <h4 className="font-roboto text-base font-medium uppercase">
            Plane Scape
          </h4>
        </div>
        <ul className="flex items-center">
          <li className="flex gap-1 items-center cursor-pointer mr-6">
            <FaTag className="text-purple-300" />
            <p className="font-roboto text-[0.9rem] font-medium text-darkGrey">
              Deals
            </p>
          </li>
          <li className="flex gap-1 items-center cursor-pointer mr-7">
            <FaGlobeAmericas className="text-purple-300" />
            <p className="font-roboto text-[0.9rem] font-medium text-darkGrey">
              Discover
            </p>
          </li>
          {user && (
            <li className="flex gap-1 items-center cursor-pointer">
              <img
                src={`${url}/Images/${user.photo}`}
                alt="profile image"
                className="w-[35px]"
              />
              <p className="font-roboto text-[0.9rem] font-medium font-mediumtext-darkGrey">
                {user.firstName} {user.lastName}
              </p>
            </li>
          )}
        </ul>
      </div>
      <div className="grid grid-cols-5">
        <div className="col-span-4">
          <FlightSearchForm />
          <div className="grid grid-cols-6">
            <div className="col-span-4">
              <FlightsContainer direction={null} date={null} />
            </div>
            <div className="col-span-2">
              <FlightsFilter onFilterApply={handleFilterApply} />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <Facilities />
        </div>
      </div>
    </section>
  );
};

export default Home;
