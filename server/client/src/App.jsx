import React from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Landing from "./components/Landing";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import { registerFormAction } from "./pages/Register";
import { loginFormAction } from "./pages/Login";
import Dashboard from "./components/Dashboard";
import AddJobs from "./components/AddJobs";
import Stats from "./components/Stats";
import AllJobs from "./components/AllJobs";
import Profile from "./components/Profile";
import EditJob from "./components/EditJob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginFormAction,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerFormAction,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <AddJobs />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    // <Routes>
    //   <Route path="/" element={<Navbar />}>
    //     <Route index element={<Landing />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route
    //       path="/register"
    //       element={<Register />}
    //       action={() => {
    //         console.log("Hello, Wolrd");
    //         return null;
    //       }}
    //     />
    //   </Route>
    // </Routes>
    <RouterProvider router={router} />
  );
};

export default App;
