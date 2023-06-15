import { useState, useEffect } from "react";
import { Duration } from "luxon";

export default function TimeTracker() {
  const [startTimeStamp, setStartTimeStamp] = useState(0);
  const [elapsedTimes, setElapsedTimes] = useState([]);
  console.log(startTimeStamp);
  console.log(elapsedTimes);

  const useRenderOnInterval = (interval = 1000) => {
    const [, setter] = useState(0);
    function rerender() {
      setter((prev) => prev + 1);
    }

    useEffect(() => {
      //setup the interval
      const intervalId = setInterval(rerender, interval);
      //teardown
      return () => clearInterval(intervalId);
    }, [interval]);
  };

  function handleStart() {
    setStartTimeStamp(Date.now());
  }

  function handleStop() {
    setElapsedTimes((prevTotal) => [...prevTotal, Date.now() - startTimeStamp]);
  }
  return (
    <div className="timeTrackerComponent">
      <button className="start" onClick={handleStart}>
        Start
      </button>
      <button className="stop" onClick={handleStop}>
        Stop
      </button>
      {elapsedTimes.map((singleSession, i) => (
        //rescale => rescale units to their largest representation
        <h1 className="elapsedTime" key={i}>
          {Duration.fromMillis(singleSession)
            .rescale()
            .toHuman(["hours", "minutes", "seconds"])}
        </h1>
      ))}
    </div>
  );
}
