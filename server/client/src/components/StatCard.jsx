import React from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import { PiOfficeChairFill } from "react-icons/pi";
import { IoMdDoneAll } from "react-icons/io";
import { ImCross } from "react-icons/im";
const StatCard = ({ number, status }) => {
  if (status === "Pending") {
    return (
      <div className="inline px-12">
        <div className="flex flex-col justify-center items-start shadow p-10">
          <div className="flex justify-between items-center gap-20 mb-6">
            <p className="text-5xl text-yellow-200 font-bold">{number}</p>
            <div className="text-yellow-200 ">
              <MdOutlinePendingActions className="text-5xl" />
            </div>
          </div>
          <div>
            <p className="text-2xl inline">
              {status === undefined ? 0 : status} Applications
            </p>
          </div>
        </div>
      </div>
    );
  } else if (status === "Interview") {
    return (
      <div className="inline px-12">
        <div className="flex flex-col justify-center items-start shadow p-10">
          <div className="flex justify-between items-center gap-20 mb-6">
            <p className="text-5xl text-yellow-200 font-bold">{number}</p>
            <div className="text-yellow-200 ">
              <PiOfficeChairFill className="text-5xl" />
            </div>
          </div>
          <div>
            <p className="text-2xl inline">{status} Scheduled</p>
          </div>
        </div>
      </div>
    );
  } else if (status === "Accepted") {
    return (
      <div className="inline px-12">
        <div className="flex flex-col justify-center items-start shadow p-10">
          <div className="flex justify-between items-center gap-20 mb-6">
            <p className="text-5xl text-green-400 font-bold">{number}</p>
            <div className="text-green-400 ">
              <IoMdDoneAll className="text-5xl" />
            </div>
          </div>
          <div>
            <p className="text-2xl inline">{status} Applications</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="inline px-12 mt-8">
        <div className="flex flex-col justify-center items-start shadow p-10">
          <div className="flex justify-between items-center gap-20 mb-6">
            <p className="text-5xl text-red-400 font-bold">{number}</p>
            <div className="text-red-400 ">
              <ImCross className="text-5xl" />
            </div>
          </div>
          <div>
            <p className="text-2xl inline">{status} Applications</p>
          </div>
        </div>
      </div>
    );
  }
};

export default StatCard;
