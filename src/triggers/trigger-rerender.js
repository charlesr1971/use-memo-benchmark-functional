import React, {useState} from 'react';
import BenchmarkNormal from "../components/BenchmarkNormal";

// Add a simple counter in state
// which can be used to trigger re-renders
const [count, setCount] = useState(0);
const triggerReRender = () => {
    setCount(count + 1);
};
// Update our Benchmark component to have this extra prop
// Which will force a re-render
<BenchmarkNormal level={1} count={count} />