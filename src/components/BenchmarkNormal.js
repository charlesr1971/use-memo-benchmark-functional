import React from 'react';

const BenchmarkNormal = (props) => {
    const complexObject = {
        values: []
    };
    const randomIntInc = (low, high) => {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }
    for (let i = 0; i <= props.level; i++) {
        const newLocal = randomIntInc(1000000, 9999999);
        complexObject.values.push(newLocal);
    }
    //console.log(props);
    return ( ('idx' in props ? (parseInt(props.idx + 1)) : 0) == props.timesToRender ? (<div>Benchmark normal level: {props.level}</div>) : (<div></div>));
};

export default BenchmarkNormal;