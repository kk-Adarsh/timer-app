import { useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import Navigations from "./components/Navigations";
import Timer from "./components/Timer";
import alarm from "./components/public_alarm.mp3";
import "./App.css";

function App() {
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [tickings, setTickings] = useState(false);
  const [consumedSeconds, setConsumedSeconds] = useState(0);
  const [stage, setStage] = useState(0);
  const [isTimesup, setIsTimesUp] = useState(false);

  const alarmRef = useRef();

  const timeUp = () => {
    setIsTimesUp(true);
    alarmRef.current.play();
    reset();
  };

  const reset = () => {
    setTickings(false);
    setPomodoro(25);
    setLongBreak(10);
    setShortBreak(5);
    setSeconds(0);
    setConsumedSeconds(0);
  };

  const switchStage = (index) => {
    const isYes =
      consumedSeconds && stage !== index
        ? window.confirm("Timer will be reset Do you want to change??")
        : false;

    if (isYes) {
      reset();
      setStage(index);
    } else if (!consumedSeconds) {
      setStage(index);
    }
  };

  const muteAlarm = () => {
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
  };

  const startTimer = () => {
    setIsTimesUp(false);
    muteAlarm();
    setTickings((ticking) => !ticking);
  };

  const getTickingTime = () => {
    const timeStage = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    };
    return timeStage[stage];
  };

  const updateMinute = () => {
    const updateStage = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    };
    return updateStage[stage];
  };

  const clockTicking = () => {
    const minute = getTickingTime();
    const setMinutes = updateMinute();

    if (minute === 0 && seconds === 0) {
      timeUp();
    } else if (seconds === 0) {
      setMinutes((minute) => minute - 1);
      setSeconds(59);
    } else {
      setSeconds((second) => second - 1);
    }
  };

  useEffect(() => {
    window.onbeforeunload = () => {
      return consumedSeconds ? "Show warning" : null;
    };

    const timer = setInterval(() => {
      if (tickings) {
        setConsumedSeconds((value) => value + 1);
        clockTicking();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, pomodoro, shortBreak, longBreak, tickings]);

  return (
    <ErrorBoundary>
      <div className=" bg-gray-100 min-h-screen">
        <div className="max-w-2xl min-h-screen mx-auto">
          <Navigations />
          <Timer
            stage={stage}
            switchStage={switchStage}
            getTickingTimee={getTickingTime}
            seconds={seconds}
            tickings={tickings}
            startTimer={startTimer}
            muteAlarm={muteAlarm}
            isTimesup={isTimesup}
          />
          {/* <Alarm ref={alarmRef} /> */}
          <audio data-testid="alarm-audio" ref={alarmRef}>
            <source src={alarm} type="audio/mp3" />
          </audio>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
