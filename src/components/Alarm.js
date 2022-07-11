import React from "react";
import alarm from "./public_alarm.mp3";

const Alarm = React.forwardRef((_, ref) => {
  console.log(ref.current);
  console.log("in alarm");
  return (
    <audio ref={ref} controls>
      <source src={alarm} type="audio/mp3" />
    </audio>
  );
});

export default React.memo(Alarm);
