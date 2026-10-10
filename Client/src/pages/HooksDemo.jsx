import { useState, memo, useCallback } from "react";

// child component 
const Child = memo(({ propsData }) => {
    console.log("Child rendered");
    return <button onClick={propsData} >
        say hi
    </button>
});



const HooksDemo = () => {
    const [count, setCount] = useState(0);

    const sayHi = useCallback(() => console.log("HhiuI"),[]);


    return (<div>
        <h2>Demo</h2>
        <button onClick={() => setCount(count + 1)}> count: {count} </button>
        <Child propsData={sayHi} />
    </div>);

};
export default HooksDemo;