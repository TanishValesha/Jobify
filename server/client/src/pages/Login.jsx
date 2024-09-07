import React from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../../app/store";
import { setUser } from "../features/users/userSlice";
const baseURL = "http://localhost:3000";

export const loginFormAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const res = await axios.post(`${baseURL}/users/login`, data);
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Logged In");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      store.dispatch(setUser(storedUser));
    }
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error);
    console.log(error);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitted = navigation.state === "submitting";
  return (
    <div>
      <div>
        <Form
          method="post"
          className="max-w-sm mx-auto flex flex-col min-h-screen justify-start"
        >
          <h1 className="text-center my-10 text-[#2cb1bc] text-3xl">
            Login into your existing account
          </h1>
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitted}
            className="text-white bg-[#2cb1bc] hover:bg-[#16595e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
