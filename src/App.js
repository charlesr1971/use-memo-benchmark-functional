import React, { useState, Profiler } from 'react';
import BenchmarkNormal from "./components/BenchmarkNormal";
import BenchmarkMemo from "./components/BenchmarkMemo";
//import Trigger from "./triggers/trigger-rerender";

import "./App.css";

const App = (props) => {
  const [showBenchmarkNormal, setShowBenchmarkNormal] = useState(false);
  const [showBenchmarkMemo, setShowBenchmarkMemo] = useState(false);
  const [avgTimeNormal, setAvgTimeNormal] = useState(0);
  const [avgTimeMemo, setAvgTimeMemo] = useState(0);
  // Choose how many times this component needs to be rendered
  // We will then calculate the average render time for all of these renders
  const timesToRender = 10000;
  let _avgTimeArrayNormal = [];
  let _avgTimeArrayMemo = [];
  //let showBenchmarkNormal = false;
  //let showBenchmarkMemo = false;
  // Callback for our profiler
  const renderProfilerNormal = (type) => {
      return (...args) => {
          // Keep our render time in an array
          // Later on, calculate the average time
          // store args[3] which is the render time ...
          //console.log("normal: ",args);
          _avgTimeArrayNormal.push(args[3]); 
      };
  };
  const calculateAvgTimeNormal = function(){
    let _avgTime = 0;
    console.log("_avgTimeArrayNormal: ",_avgTimeArrayNormal);
    for(let i = 0; i < _avgTimeArrayNormal.length; i++){
        _avgTime += _avgTimeArrayNormal[i]; 
    }
    console.log("_avgTime normal: ",_avgTime);
    const _avgTimeArrayLength = parseInt(_avgTimeArrayNormal.length);
    console.log("_avgTimeArrayLength normal: ",_avgTimeArrayLength);
    const avgTimeNumber = parseInt(_avgTime);
    let _avgTimeNormal = avgTimeNumber/_avgTimeArrayLength;
    console.log("_avgTimeNormal normal: ",_avgTimeNormal);
    if(isNaN(_avgTimeNormal)){
        _avgTimeNormal = 0;
    }
    setAvgTimeNormal(_avgTimeNormal);
    _avgTimeArrayNormal = [];
  };
  const executeNormal = function(){
    setShowBenchmarkMemo(false);
    setShowBenchmarkNormal(true);
    //setExecute(1);
  }
  const renderProfilerMemo = (type) => {
    return (...args) => {
        // Keep our render time in an array
        // Later on, calculate the average time
        // store args[3] which is the render time ...
        //console.log("memo: ",args);
        _avgTimeArrayMemo.push(args[3]);
    };
  };
  const calculateAvgTimeMemo = function(){
    let _avgTime = 0;
    console.log("_avgTimeArrayMemo: ",_avgTimeArrayMemo);
    for(let i = 0; i < _avgTimeArrayMemo.length; i++){
        _avgTime += _avgTimeArrayMemo[i]; 
    }
    console.log("_avgTime memo: ",_avgTime);
    const _avgTimeArrayLength = parseInt(_avgTimeArrayMemo.length);
    console.log("_avgTimeArrayLength memo: ",_avgTimeArrayLength);
    const avgTimeNumber = parseInt(_avgTime);
    let _avgTimeMemo = avgTimeNumber/_avgTimeArrayLength;
    console.log("_avgTimeMemo memo: ",_avgTimeMemo);
    if(isNaN(_avgTimeMemo)){
        _avgTimeMemo = 0;
    }
    setAvgTimeMemo(_avgTimeMemo);
    _avgTimeArrayMemo = [];
  };
  const executeMemo = function(){
    setShowBenchmarkNormal(false);
    setShowBenchmarkMemo(true);
    //setExecute(1);
  }
  const randomIntInc = (low, high) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
  }
  // console.log("hello world");
  // Render our component 
  return  (
                showBenchmarkNormal ?
                (
                    <p>
                        <p> 
                            {showBenchmarkNormal && [...Array(timesToRender)].map((currentValue,index) => {
                                return <Profiler id={`normal-${index}`} onRender={renderProfilerNormal('normal')}>
                                    <BenchmarkNormal level={1} timesToRender={timesToRender} idx={index}  />
                                </Profiler>;
                            })}
            
                        </p>
                        <p>
                            <button onClick={() => {executeNormal()}}>Toggle Normal</button>
                        </p>
                        <p>
                            <button onClick={() => {executeMemo()}}>Toggle Memo</button>
                        </p>
                        <p>
                            <button onClick={() => {calculateAvgTimeNormal();calculateAvgTimeMemo()}}>Calculate</button>
                        </p>
                        <p>
                            <p><strong>Avg time</strong> normal for a {timesToRender} loop: {avgTimeNormal}</p>
                            <p><strong>Avg time</strong> memo for a {timesToRender} loop: {avgTimeMemo}</p>
                        </p>
                    </p>
                )
                :
                (
                    showBenchmarkMemo ?
                    (
                        <p>
                            <p> 
                                {showBenchmarkMemo && [...Array(timesToRender)].map((currentValue,index) => {
                                    return <Profiler id={`memo-${index}`} onRender={renderProfilerMemo('memo')}>
                                        <BenchmarkMemo level={1} timesToRender={timesToRender} idx={index} />
                                    </Profiler>;
                                })}
                            </p>
                            <p>
                            <button onClick={() => {executeNormal()}}>Toggle Normal</button>
                            </p>
                            <p>
                                <button onClick={() => {executeMemo()}}>Toggle Memo</button>
                            </p>
                            <p>
                                <button onClick={() => {calculateAvgTimeNormal();calculateAvgTimeMemo()}}>Calculate</button>
                            </p>
                            <p>
                                <p><strong>Avg time</strong> normal for a {timesToRender} loop: {avgTimeNormal}</p>
                                <p><strong>Avg time</strong> memo for a {timesToRender} loop: {avgTimeMemo}</p>
                            </p>
                        </p>
                    )
                    :
                    (
                        <p>
                            <p>
                                <button onClick={() => {executeNormal()}}>Toggle Normal</button>
                            </p>
                            <p>
                                <button onClick={() => {executeMemo()}}>Toggle Memo</button>
                            </p>
                            <p>
                                <button onClick={() => {calculateAvgTimeNormal();calculateAvgTimeMemo()}}>Calculate</button>
                            </p>
                            <p>
                                <p><strong>Avg time</strong> normal for a {timesToRender} loop: {avgTimeNormal}</p>
                                <p><strong>Avg time</strong> memo for a {timesToRender} loop: {avgTimeMemo}</p>
                            </p>
                        </p>
                    )
                )
            )
            
            
        
}

export default App;