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

    const id = 'span' + complexObject.values[0];
    const text = parseInt(props.idx + 1) == props.timesToRender ? 'Benchmark normal test finished' : (parseInt(props.idx + 1) == 1 ? '' : '');

    return (<span id={id}>{text}</span>);
    
};

export default BenchmarkNormal;