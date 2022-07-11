import React from "react";
import { FaVolumeMute } from "react-icons/fa";
const Timer = (props) => {
  const options = ["Pomodoro", "Short Break", "Long Break"];
  return (
    <div className="w-10/12 mx-auto pt-5 flex flex-col justify-center items-center mt-10">
      <div className="flex gap-5 items-center">
        {options.map((option, index) => {
          return (
            <h1
              key={index}
              className={`${
                index === props.stage ? "bg-gray-500 bg-opacity-30" : ""
              } p-1 cursor-pointer transition-all rounded`}
              onClick={() => props.switchStage(index)}
            >
              {option}
            </h1>
          );
        })}
      </div>
      <div className="mt-10 mb-10">
        <h1 className="text-8xl font-bold select-none m-0">
          {props.getTickingTimee()}:{props.seconds.toString().padStart(2, "0")}
        </h1>
      </div>
      <button
        className="px-16 py-2 text-2xl rounded-md bg-black text-white uppercase font-bold"
        onClick={props.startTimer}
      >
        {props.tickings ? "Stop" : "Start"}
      </button>
      {props.isTimesup && (
        <div data-testid="svg-mute-icon">
          <FaVolumeMute
            className="text-3xl cursor-pointer"
            onClick={props.muteAlarm}
          />
        </div>
      )}
    </div>
  );
};
export default Timer;
