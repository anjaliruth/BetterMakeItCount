import { useState, useEffect } from "react";
import { Duration, DateTime } from "luxon";
import CurrentTimer from "../CurrentTimer.js";
import play from "../Media/play.png"
import stop from "../Media/stop.png"

export default function TimeTracker() {
  const [startTimeStamp, setStartTimeStamp] = useState(null);
  const [sessionsByDates, setSessionsByDates] = useState({});
  const currentDate = new Date().toLocaleDateString();
  // const currentTime = DateTime.now().toFormat("[HH:mm]: ");
  //   console.log("start:",startTimeStamp);
  //   console.log("session:",elapsedTimes);
  // console.log("Dates:", sessionsByDates);
  // console.log("elapsedTime", elapsedTimes);
  // console.log("Today total", todayTotal);
  console.log("Sessions for Current Date:", sessionsByDates[currentDate]);
  console.log("Sessions by Dates:", sessionsByDates);

  // console.log("time", currentTime);
  console.log("Todays Date:", currentDate);
  console.log("Todays Date2:", new Date().toLocaleDateString());
  // localStorage.clear()
  //   console.log(new Date())

  const daysOfTheWeek = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    const storedSession = localStorage.getItem("session");
    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession);
        setSessionsByDates(parsedSession);
        console.log("Storage:", parsedSession);
      } catch (error) {
        console.error("Error parsing sessions from local storage");
      }
    }
  }, []);

  function handleStart() {
    setStartTimeStamp(Date.now());
  }

  function msRescale(time) {
    const timeValue = Duration.fromObject({
      ...Duration.fromMillis(time).rescale().toObject(),
      milliseconds: undefined,
    }).toHuman({ unitDisplay: "short" });
    return timeValue;
  }

  function handleStop() {
    // const newData = {
    //   "18/06/2023": [{ elapsedtime: 32334, timestamp: "[10:34AM]" },{ elapsedtime: 4944034, timestamp: "[4:05PM]" }],
    // };
    const stopTime = DateTime.now().toFormat("[h:mm a]: ");

    setSessionsByDates((prev) => {
      const updatedSessions = { ...prev };
      if (updatedSessions[currentDate]) {
        updatedSessions[currentDate].push({
          elapsedTime: Date.now() - startTimeStamp,
          timestamp: stopTime,
        });
      } else {
        updatedSessions[currentDate] = [
          { elapsedTime: Date.now() - startTimeStamp, timestamp: stopTime },
        ];
      }

      //we return these 2 because the state stters have been called for these 2 states, which trigger a rerender.
      //by returning updatedSession and updatedElapsedTimes, we make sure that  subsequent code that depends on those state values will have access to the most recent and accurate data.
      // // Adds new data to localStorage
      // Object.assign(updatedSessions, newData);
      console.log("Check here", updatedSessions);
      localStorage.setItem("session", JSON.stringify(updatedSessions));
      return updatedSessions;
    });
    setStartTimeStamp(null);
  }

  function handleDelete(date, index) {
    setSessionsByDates((prev) => {
      const updatedSessions = { ...prev };
      if (updatedSessions[date]) {
        updatedSessions[date].splice(index, 1);
      }
      return updatedSessions;
    });
  }

  // function totalDaily(date) {
  //   const formattedDate = new Date(date).toLocaleDateString();
  //   if (sessionsByDates[formattedDate]) {
  //     return sessionsByDates[formattedDate].reduce(
  //       (total, duration) => total + duration.elapsedTime,
  //       0
  //     );
  //   } else {
  //     return 0;
  //   }
  // }
  function totalDaily(date) {
    if (date === currentDate) {
      if (sessionsByDates[date]) {
        return sessionsByDates[date].reduce(
          (total, duration) => total + duration.elapsedTime,
          0
        );
      } else {
        return 0;
      }
    } else {
      const formattedDate = DateTime.fromISO(date).toFormat("dd/MM/yyyy");
      if (sessionsByDates[formattedDate]) {
        return sessionsByDates[formattedDate].reduce(
          (total, duration) => total + duration.elapsedTime,
          0
        );
      } else {
        return 0;
      }
    }
  }

  //CHATGPT ANSWER
  // function totalDaily(date) {
  //   const formattedDate = DateTime.fromISO(date).toFormat('dd/MM/yyyy');
  //   if (sessionsByDates[formattedDate]) {
  //     return sessionsByDates[formattedDate].reduce(
  //       (total, duration) => total + duration.elapsedTime,
  //       0
  //     );
  //   } else {
  //     return 0;
  //   }
  // }

  const dailyTotal = totalDaily(currentDate);

  function getLastWeekDates(length) {
    let currentDate = new Date();
    let startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - length);
    //convert to ISO so that DateTime luxon can format it fromISO to ''dd LLL yy'
    return startDate.toISOString().split("T")[0];
  }

  return (
    <div className="timeTrackerComponent">
      <h1 className="title">Make it Count!</h1>
      <CurrentTimer startTimeStamp={startTimeStamp} />
      <div className="timerButtons">
        <img src={play} alt="playButton" className="start" onClick={handleStart} />
        <img src={stop} alt="stopButton" className="stop" onClick={handleStop} />
       
        
 
      </div>

      {sessionsByDates[currentDate] && <h2 className="today">Today</h2>}
      {sessionsByDates[currentDate] &&
        sessionsByDates[currentDate].map((singleSession, i) => (
          //rescale => rescale units to their largest representation.
          <div className="todaySessionEntry-withdelete">
            <div className="todaySessionEntry">
              <h2 className="elapsedTime" key={i}>
                {singleSession.timestamp}
              </h2>
              <h1 className="elapsedTime" key={i}>
                {msRescale(singleSession.elapsedTime)}
              </h1>
            </div>
            <button
              className="deleteButton"
              onClick={() => handleDelete(currentDate, i)}
            >
              🗑️
            </button>
          </div>
        ))}
      {dailyTotal ? (
        <h1 className="dailyTotal">Total: {msRescale(dailyTotal)}</h1>
      ) : (
        <p></p>
      )}

      <div className="total">
        <h2 className="dashboardHeading">Previous 7 days</h2>
        {daysOfTheWeek.map((day, i) => (
          <div className="previousDailyTotal">
            <h2 key={i}>
              {DateTime.fromISO(getLastWeekDates(day)).toFormat("dd LLL yy")}
            </h2>
            <h3 key={i + 100}>
              {totalDaily(getLastWeekDates(day))
                ? msRescale(totalDaily(getLastWeekDates(day)))
                : "No recorded sessions"}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
