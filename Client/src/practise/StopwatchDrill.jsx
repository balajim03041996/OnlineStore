import { useEffect, useRef, useState } from "react";


const StopwatchDrill = () => {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef(null);

    const start = () => {
        if (intervalRef.current)
            return;
        intervalRef.current = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

    };
    const stop = () => {
        clearInterval(intervalRef.current);// stop the timer whose number is note
        intervalRef.current = null;// erase the note
    };
    const reset = () => {
        stop();
        setSeconds(0);
    };

    useEffect(() => {
        return () => stop();
    }, []);

    const convertToMinutes = () => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return <div>{String(min).padStart(2, "0")}mm: {sec}ss</div>
    };

    return (<div>
        <div>{seconds > 0 ? convertToMinutes() : ""}</div>
        <p><button onClick={() => start()}>start</button></p>
        <p><button onClick={() => stop()}>stop</button></p>
        <p><button onClick={() => reset()}>reset</button></p>

    </div>);


};
export default StopwatchDrill;