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
    return ( ('idx' in props ? (parseInt(props.idx + 1)) : 0) == props.timesToRender ? (<span>Benchmark normal test finished</span>) : (<span></span>));
};

export default BenchmarkNormal;