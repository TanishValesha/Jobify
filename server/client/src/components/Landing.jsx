import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main>
      <div className="grid grid-cols-2 px-36 place-items-center h-screen gap-10">
        <div className="flex flex-col items-start justify-center gap-8">
          <h1 className="text-7xl font-bold">
            Job <span className="text-[#2cb1bc]">Tracking</span> App
          </h1>
          <p className="text-xl text-slate-400 font-medium">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque
            minus tempora, optio voluptatum, enim, libero a harum laborum
            deserunt deleniti asperiores cum vitae autem explicabo ducimus
            voluptates. Voluptatem, ipsa impedit!
          </p>
          <div className="flex flex-row gap-6">
            <Link
              to={"/login"}
              className="bg-[#2cb1bc] hover:bg-[#16595e] px-6 py-2 rounded text-white font-medium"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="bg-[#2cb1bc] hover:bg-[#16595e] px-6 py-2 rounded text-white font-medium"
            >
              Register
            </Link>
          </div>
        </div>
        <div>
          <img src="/main.jpg" alt="Landing Page Image" />
        </div>
      </div>
      <div className="flex items-start justify-center ">
        <p>
          Created By:{" "}
          <span className="text-[#2cb1bc] font-bold">Tanish Valesha</span>
        </p>
      </div>
    </main>
  );
};

export default Landing;
