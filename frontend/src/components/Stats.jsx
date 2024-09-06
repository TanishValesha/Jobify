import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import axios from "axios";

const baseURL = "http://localhost:3000";

const Stats = () => {
  const [pending, setPending] = useState(0);
  const [accepted, setAccepted] = useState(0);
  const [interview, setInterview] = useState(0);
  const [declined, setDeclined] = useState(0);

  const setData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseURL}/stats/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    });
    if (response.data.Pending) {
      setPending(response.data.Pending);
    }
    if (response.data.Accepted) {
      setPending(response.data.Accepted);
    }
    if (response.data.Interview) {
      setPending(response.data.Interview);
    }
    if (response.data.Declined) {
      setPending(response.data.Declined);
    }
  };
  useEffect(() => {
    setData();
  }, []);
  return (
    <div className="grid grid-cols-3 ml-60 mt-10">
      <StatCard number={pending} status={"Pending"} />
      <StatCard number={interview} status={"Interview"} />
      <StatCard number={accepted} status={"Accepted"} />
      <StatCard number={declined} status={"Declined"} />
    </div>
  );
};

export default Stats;
