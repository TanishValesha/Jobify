import axios from "axios";
import { Form } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const baseURL = "http://localhost:3000";

const AllJobs = () => {
  const [jobStatus, setJobStatus] = useState("all");
  const [type, setType] = useState("all");
  const [sortType, setSortType] = useState("newest");
  const [jobs, setJobs] = useState({});
  const token = localStorage.getItem("token");
  const getAllJobsAction = async () => {
    const response = await axios.get(
      `${baseURL}/jobs`,
      {
        params: { jobStatus, type },
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      }
      // {
      //
      // }
    );
    // console.log(response.data);

    return response.data;
  };

  const resetAllFilters = () => {
    setJobStatus("all");
    setType("all");
  };
  const getData = async () => {
    const jobData = await getAllJobsAction();
    //   Object.values(jobData).map((item, index) => {
    //     console.log(item);
    //   });
    console.log(Object.values(jobData).length);
    setJobs(Object.values(jobData));
  };
  useEffect(() => {
    getData();
  }, [jobStatus, type, sortType]);
  return (
    <div>
      <Form method="post">
        <div className="px-16 py-26 mt-10 sm:ml-64">
          <h1 className="text-3xl my-8">Job Filters</h1>
          <div className="grid gap-4 grid-cols-3">
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
                <option selected value="all">
                  all
                </option>
                <option value="Pending">Pending</option>
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
                <option selected value="all">
                  all
                </option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label
                for="type"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sort
              </label>
              <select
                id="sortType"
                value={sortType}
                onChange={(e) => {
                  setSortType(e.target.value);
                }}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected value="newest">
                  newest first
                </option>
                <option value="oldest">oldest first</option>
                <option value="a-z">a-z</option>
                <option value="z-a">z-a</option>
              </select>
            </div>
            <div className="flex justify-center items-end">
              <button
                type="button"
                onClick={resetAllFilters}
                class="text-white bg-[#2cb1bc] hover:bg-[#16595e] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 w-full py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Reset Values
              </button>
            </div>
          </div>
        </div>
      </Form>
      <div className=" pl-52 my-10 flex flex-col justify-start items-center min-h-screen">
        <div>
          <h1 className="text-3xl pb-8 text-left font-bold relative">
            {Object.values(jobs).length} Jobs Found
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-16">
          {Object.values(jobs).map((item, index) => (
            <Card
              fetchfunction={getData}
              key={item._id}
              id={item._id}
              position={item.position}
              company={item.company}
              location={item.location}
              jobStatus={item.jobStatus}
              jobtype={item.jobType}
              date={item.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
