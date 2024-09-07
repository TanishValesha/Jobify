import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { store } from "../../app/store";
import { clearUser, setUser } from "../features/users/userSlice";

const baseURL = "http://localhost:3000";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [email, setEmail] = useState(user.email);

  const updateProfileAction = async () => {
    const token = localStorage.getItem("token");
    const newProfile = await axios.put(
      `${baseURL}/user-stats/update-user`,
      {
        firstName,
        lastName,
        city,
        country,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      }
    );
    store.dispatch(clearUser());
    localStorage.setItem("user", JSON.stringify(newProfile));
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      store.dispatch(setUser(storedUser));
    }
    toast.success("Profile Updated");
    console.log(newProfile);
  };
  return (
    <Form method="post">
      <div className="px-56 py-26 mt-10 sm:ml-64">
        <div className="flex flex-col">
          <div className="flex justify-center items-center mb-8">
            <RiAccountCircleFill className="text-8xl text-[#2cb1bc]" />
          </div>
          <div className="mb-5">
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="name"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              type="name"
              id="city"
              name="city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="country"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country
            </label>
            <input
              type="name"
              id="country"
              name="country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div className="flex justify-center items-end">
            <button
              type="button"
              onClick={updateProfileAction}
              class="text-white mb-10 bg-[#2cb1bc] hover:bg-[#16595e] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 w-full py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Profile;
