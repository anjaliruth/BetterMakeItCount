import {useState, useEffect} from 'react'
import {Duration} from 'luxon'

export default function CurrentTimer({startTimeStamp}) {
    //inside this hook below, an effect is set up, where the function 'rerender' will be called each second, to update the (dummy) state, the state update will trigger a rerender of the CurrentTimer component, since there is a state inside this component which has been updated

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
    
    useRenderOnInterval(1000);

    function getElapsedTime() {
      if (startTimeStamp) {
        return Duration.fromMillis(Date.now() - startTimeStamp)
          .rescale()
          .toFormat("hh:mm:ss");
      }
      return "00:00:00";
    }

    return <h1 className="stopWatch">{getElapsedTime()}</h1>;
  }