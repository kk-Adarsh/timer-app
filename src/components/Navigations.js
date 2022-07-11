import React from "react";
import { FiClock } from "react-icons/fi";
const Navigations = () => {
  return (
    <div className="pt-5 flex justify-center mx-auto w-11/12">
      <div className="flex items-center gap-1 cursor-pointer">
        <FiClock className="text-sm text-black" />
        <h1>Pomodoro</h1>
      </div>
    </div>
  );
};
export default Navigations;

/* <FiSettings className="text-2xl cursor-pointer"></FiSettings> */
