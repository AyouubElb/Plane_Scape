import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/login&register/Login";
import Register from "./components/login&register/Register";
import MyFlights from "./components/myFlights/MyFlights";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-flights",
        element: <MyFlights />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
