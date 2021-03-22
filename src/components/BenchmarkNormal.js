import React from 'react';

const BenchmarkNormal = (props) => {

    const numbers = () => {
        const result = [1, 1];
        for (let i = 2; i < props.level; i++) {
            result[i] = result[i - 1] + result[i - 2];
        }
        return result;
    }

    const randomIntInc = (low, high) => {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }

    const id = 'span' + randomIntInc(1000000, 9999999);
    const fib = numbers().join(',');
    const text = parseInt(props.idx + 1) == props.timesToRender ? 'Benchmark normal test finished' : (parseInt(props.idx + 1) == 1 ? '' : '');

    return (<span id={id} data-fib={fib}>{text}</span>);

};

export default BenchmarkNormal;