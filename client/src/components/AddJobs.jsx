import axios from "axios";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const baseURL = "https://jobify-t777.onrender.com";

const AddJobs = () => {
  //   const user = localStorage.getItem("user");
  //   const userID = user._id;
  // }
  const timestamp = Date.now();
  const date = dayjs(timestamp);
  const formattedDate = date.format("MMMM D, YYYY");
  const token = localStorage.getItem("token");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [jobStatus, setJobStatus] = useState("Pending");
  const [type, setType] = useState("Full-time");

  const addJobAction = async (e) => {
    e.preventDefault();
    let createdAt = formattedDate;
    if (position == "" || company == "" || location == "") {
      toast.error("All filed are mandatory!");
    } else {
      const response = await axios.post(
        `${baseURL}/jobs/`,
        {
          position,
          company,
          location,
          jobStatus,
          type,
          createdAt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      toast.success("Job Added!");
      navigate("/dashboard/all-jobs");
      return response.data;
    }
  };

  const navigate = useNavigate();

  return (
    <Form method="post">
      <div className="px-16 py-26 mt-10 sm:ml-64">
        <div className="grid gap-4 grid-cols-3">
          <div className="mb-5">
            <label
              for="position"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Position
            </label>
            <input
              type="name"
              id="name"
              name="position"
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="company"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company
            </label>
            <input
              type="name"
              id="company"
              name="company"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="location"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Job Location
            </label>
            <input
              type="name"
              id="location"
              name="location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div>
            <label
              for="status"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Job Status
            </label>
            <select
              id="status"
              value={jobStatus}
              onChange={(e) => {
                setJobStatus(e.target.value);
              }}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value="Pending">
                Pending
              </option>
              <option value="Interview">Interview</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
          <div>
            <label
              for="type"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Job Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value="Full-time">
                Full-time
              </option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="flex justify-center items-end">
            <button
              onClick={addJobAction}
              type="button"
              class="text-white bg-[#2cb1bc] hover:bg-[#16595e] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 w-full py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default AddJobs;
