import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { TbCalendarWeek } from "react-icons/tb";
import { GiSuitcase } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const baseURL = "https://jobify-t777.onrender.com";

const Card = ({
  fetchfunction,
  id,
  position,
  company,
  location,
  jobStatus,
  jobtype,
  date,
}) => {
  const deleteJob = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${baseURL}/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    });
    toast.success("Job Deleted!");
    console.log("Deleted!");
    fetchfunction();
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-white text-black flex flex-col rounded shadow-md px-4">
        <div className="flex flex-col text-black w-96 p-4">
          <p className="text-2xl">{position}</p>
          <p className="text-slate-300">{company}</p>
        </div>
        <div>
          <hr className="w-full text-slate-300" />
        </div>
        <div className="grid grid-cols-2 self-start gap-x-10 gap-y-4 my-4">
          <div className="flex justify-start items-center gap-2">
            <FaLocationArrow className="text-xl text-slate-300" />
            <p className="text-lg">{location}</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <TbCalendarWeek className="text-xl text-slate-300" />
            <p className="text-kg">{date}</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <GiSuitcase className="text-xl text-slate-300" />
            <p className="text-lg">{jobtype}</p>
          </div>
          <div className="flex justify-center items-center text-red-700 hover:text-white border border-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2">
            <p className="text-lg text-red-400">{jobStatus}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-start gap-4 items-center my-4">
            <button
              className="bg-[#2cb1bc] px-5 py-1 rounded-md text-white"
              onClick={() => {
                navigate(`/dashboard/edit-job/${id}`);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteJob(id);
              }}
              className="bg-[#2cb1bc] px-5 py-1 rounded-md text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
