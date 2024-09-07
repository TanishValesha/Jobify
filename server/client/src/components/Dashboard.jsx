import React from "react";
import AddJobs from "./AddJobs";
import { Link, redirect, useNavigate } from "react-router-dom";
import { MdOutlineLogout, MdOutlineQueryStats } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { BsFillPersonFill } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const base_URL = "http://localhost:3000";

const Dashboard = () => {
  let user = useSelector((state) => state.user.user);
  console.log(user);
  const navigate = useNavigate();
  const performLogOut = async () => {
    axios.get(`${base_URL}/users/logout`);
    if (localStorage.getItem("token")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.log("User item removed from local storage.");
    } else {
      console.log("User item not found in local storage.");
    }
    toast.success("Logged Out");
    navigate("/");
  };
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <Link to="/dashboard" className="flex ms-2 md:me-24">
                <img src="logo.jpg" className="h-8 me-3" alt="Jobify Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Jobify
                </span>
              </Link>
            </div>
            <div>
              <h1 className="text-2xl text-[#2cb1bc] underline">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-4 ms-3">
                <button>
                  <MdOutlineLogout
                    onClick={performLogOut}
                    className="text-3xl"
                  />
                </button>
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div>
                  <p className="font-bold">
                    {user.firstName + " " + user.lastName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/dashboard"}
                className="flex items-center gap-4 px-8 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaAddressBook className="text-3xl" />
                <span className="ms-3">Add Jobs</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/all-jobs"}
                className="flex items-center gap-4 px-8 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdOutlineQueryStats className="text-3xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">All Jobs</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/stats"}
                className="flex items-center gap-4 px-8 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <ImStatsDots className="text-3xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">Stats</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/profile"}
                className="flex items-center gap-4 px-8 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BsFillPersonFill className="text-3xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <Outlet />
    </div>
  );
};

export default Dashboard;
