import React, { useState, Profiler } from 'react';
import BenchmarkNormal from "./components/BenchmarkNormal";
import BenchmarkMemo from "./components/BenchmarkMemo";
//import Trigger from "./triggers/trigger-rerender";

import "./App.css";

const App = (props) => {
  const [showBenchmarkNormal, setShowBenchmarkNormal] = useState(false);
  const [showBenchmarkMemo, setShowBenchmarkMemo] = useState(false);
  const [showBenchmarkTrigger, setShowBenchmarkTrigger] = useState(false);
  // Choose how many times this component needs to be rendered
  // We will then calculate the average render time for all of these renders
  const timesToRender = 10;
  // Callback for our profiler
  const renderProfilerNormal = (type) => {
      return (...args) => {
          // Keep our render time in an array
          // Later on, calculate the average time
          // store args[3] which is the render time ...
          console.log("normal: ",args);
      };
  };
  const renderProfilerMemo = (type) => {
    return (...args) => {
        // Keep our render time in an array
        // Later on, calculate the average time
        // store args[3] which is the render time ...
        console.log("memo: ",args);
    };
  };
  // console.log("hello world");
  // Render our component 
  return <p><p> {showBenchmarkNormal && [...Array(timesToRender)].map((index) => {
      return <Profiler id={`normal-${index}`} onRender={renderProfilerNormal('normal')}>
          <BenchmarkNormal level={1} />
      </Profiler>;
  })}
  <button onClick={() => {setShowBenchmarkNormal(true)}}>Toggle Normal</button>
  </p><p> {showBenchmarkMemo && [...Array(timesToRender)].map((index) => {
      return <Profiler id={`normal-${index}`} onRender={renderProfilerMemo('memo')}>
          <BenchmarkMemo level={1} />
      </Profiler>;
  })}
  <button onClick={() => {setShowBenchmarkMemo(true)}}>Toggle Memo</button>
  </p><p> {showBenchmarkTrigger && [...Array(timesToRender)].map((index) => {
      return true;
  })}
  <button onClick={() => {setShowBenchmarkTrigger(true)}}>Trigger</button>
  </p></p>;
}

export default App;