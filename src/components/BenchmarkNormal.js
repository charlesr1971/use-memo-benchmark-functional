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
    //const text = ('idx' in props ? (parseInt(props.idx + 1)) : 0) == props.timesToRender ? ('Benchmark normal test finished') : ('idx' in props ? (parseInt(props.idx + 1)) : 0) == 1 ? ('Benchmark normal test started') : '';
    const text = parseInt(props.idx + 1) == props.timesToRender ? 'Benchmark normal test finished' : (parseInt(props.idx + 1) == 1 ? '' : '');
    return (<span>{text}</span>);
};

export default BenchmarkNormal;