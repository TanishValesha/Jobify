import React from "react";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status == 404) {
    return (
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-col justify-center items-center ">
          <img className="w-[40%]" src="/errorImage.png" alt="Error Image" />
        </div>
        <div className="absolute flex flex-col justify-center items-center bottom-48">
          <h1>Page Not Found (ERROR 404)</h1>
          <Link to={"/"} className="underline">
            Home Page
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-col justify-center items-center ">
          <img className="w-[40%]" src="/errorImage.png" alt="Error Image" />
        </div>
        <div className="absolute flex flex-col justify-center items-center bottom-48">
          <h1>Something Went Wrong </h1>
          <Link to={"/"} className="underline">
            Home Page
          </Link>
        </div>
      </div>
    );
  }
};

export default Error;
