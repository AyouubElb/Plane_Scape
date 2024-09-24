import { useState } from "react";
import axios from "axios";
import { IoIosAirplane } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import bg_image from "../../assets/bg_image.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePhoto: null,
  });
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], // Handle file input
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, profilePhoto } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", firstName);
    formDataToSend.append("lastName", lastName);
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);
    formDataToSend.append("photo", profilePhoto);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Registration successful!");
        // Clear form data
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          profilePhoto: null,
        });
        // Navigate to login page
        navigate("/login");
      }
    } catch (error) {
      alert("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <section
      className="pl-[6rem]"
      style={{ backgroundImage: `url(${bg_image})` }}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="flex justify-center items-center w-full lg:block">
          <div className="bg-white rounded-lg shadow sm:max-w-md xl:p-0 w-full max-w-sm">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="text-xl flex justify-start items-center gap-2 font-bold mb-4 text-purple-900 uppercase">
                <div className="bg-purple-300 rounded-full mr-2">
                  <IoIosAirplane className="text-[28px] text-white" />
                </div>
                <p>Plane Scape</p>
              </div>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-purple-900 md:text-2xl">
                Create new account
              </h1>
              <form className="space-y-1" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-1 text-sm font-medium text-gray-900"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-1 text-sm font-medium text-gray-900"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-900"
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
                    className="block mb-1 text-sm font-medium text-gray-900"
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
                <div>
                  <label
                    htmlFor="profilePhoto"
                    className="block mb-1 text-sm font-medium text-gray-900"
                  >
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    name="profilePhoto"
                    id="profilePhoto"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-purple-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Register
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-purple-900 hover:underline"
                  >
                    Log in
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

export default Register;
