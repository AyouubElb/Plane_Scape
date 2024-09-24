import React, { useState } from "react";
import axios from "axios";
import { IoIosAirplane } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import bg_image from "../../assets/bg_image.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        { email, password }
      );

      if (response.status === 200) {
        // Store the token in local storage
        localStorage.setItem("token", response.data.token);
        console.log("response", response);

        setFormData({ email: "", password: "" }); // Clear inputs
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      alert("Login failed. Please check your email and password.");
      console.error(error);
    }
  };

  return (
    <section
      className=" pl-[6rem]"
      style={{ backgroundImage: `url(${bg_image})` }}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="flex justify-center items-center w-full lg:block">
          <div className="bg-white rounded-lg shadow sm:max-w-md xl:p-0 w-full">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="text-xl flex justify-start items-center gap-2 font-bold mb-4 text-purple-900 uppercase">
                <div className="bg-purple-300 rounded-full mr-2">
                  <IoIosAirplane className="text-[28px] text-white" />
                </div>
                <p>Plane Scape</p>
              </div>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-purple-900 md:text-2xl">
                Log in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="name@email.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-purple-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Log in
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-purple-900 hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
