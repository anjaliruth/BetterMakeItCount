import { useState, useEffect } from "react";
import { Duration } from "luxon";

export default function TimeTracker() {
  const [startTimeStamp, setStartTimeStamp] = useState(null);
  const [todayTotal, setTodayTotal] = useState(0);
  const [elapsedTimes, setElapsedTimes] = useState([]);
  const [sessionsByDates, setSessionsByDates] = useState({})
//   console.log("start:",startTimeStamp);
//   console.log("session:",elapsedTimes);
  console.log("Dates:",sessionsByDates);
  console.log("elapsedTime", elapsedTimes)
  console.log("Today total", todayTotal)
//   console.log(new Date())

  const useRenderOnInterval = (interval) => {
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

  function CurrentTimer() {
//inside this hook below, an effect is set up, where the function 'rerender' will be called each second, to update the (dummy) state, the state update will trigger a rerender of the CurrentTimer component, since there is a state inside this component which has been updated
    useRenderOnInterval(1000)

   function getElapsedTime() {
     
    if(startTimeStamp) {
    return(
        Duration.fromMillis(Date.now()-startTimeStamp)
        .rescale()
        .toFormat("hh:mm:ss")
) 
    }
    return "00:00:00"
}

return <h1 className="stopWatch">{getElapsedTime()}</h1>

  }
  function handleStart() {
    setStartTimeStamp(Date.now());
  }


  function msRescale(time) {
    const timeValue =  Duration.fromObject({
      ...Duration.fromMillis(time)
        .rescale()
        .toObject(),
      milliseconds: undefined
    }).toHuman({unitDisplay: "short"})
    return timeValue
  }
//   function handleStop() {
//     setElapsedTimes((prevTotal) => [...prevTotal, Date.now() - startTimeStamp]);
// const currentDate = new Date().toISOString().split("T")[0]
// // console.log("current Date", currentDate)
//     setSessionsByDates((prev) =>{
//         const updatedSessions = {...prev}
//     if(updatedSessions[currentDate]) {
//         updatedSessions[currentDate].push(elapsedTimes);
//     }
//     else{
//         updatedSessions[currentDate]= [elapsedTimes]
//     }
//     })
//     setStartTimeStamp(null)
//   }

function handleStop() {
    const currentDate = new Date().toISOString().split("T")[0];
    setElapsedTimes((prevTotal)=> {
    const updatedElapsedTimes = [ ...prevTotal, Date.now() - startTimeStamp ];
 setSessionsByDates((prev) =>{
    const updatedSessions = {...prev}
    if(updatedSessions[currentDate]) {
    updatedSessions[currentDate].push(Date.now() - startTimeStamp )
    }
    else{
        updatedSessions[currentDate] = [Date.now() - startTimeStamp ]
    }
   
    //we return these 2 because the state stters have been called for these 2 states, which trigger a rerender.
    //by returning updatedSession and updatedElapsedTimes, we make sure that  subsequent code that depends on those state values will have access to the most recent and accurate data.
    return updatedSessions

 });
 
 calculateTodayTotal()
 return updatedElapsedTimes

      })
setTodayTotal(calculateTodayTotal)
    setStartTimeStamp(null)
}

function calculateTodayTotal() {
    const currentDate = new Date().toISOString().split("T")[0];
    if (sessionsByDates[currentDate]) {
       return (sessionsByDates[currentDate].reduce((total, duration)=> total + duration, 0))
}
else{
  return 0
}
}


  return (
    <div className="timeTrackerComponent">
    <CurrentTimer/>
      <button className="start" onClick={handleStart}>
        Start
      </button>
      <button className="stop" onClick={handleStop}>
        Stop
      </button>
      {elapsedTimes.map((singleSession, i) => (
        //rescale => rescale units to their largest representation
        <h1 className="elapsedTime" key={i}>
       {msRescale(singleSession)}
        </h1>

      ))}
      {(todayTotal> 0) && <h1>Total: {todayTotal}</h1>}
      
    </div>
  );
}
