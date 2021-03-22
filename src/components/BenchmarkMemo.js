import React, {useMemo} from 'react';

const BenchmarkMemo = (props) => {

    const numbers = useMemo(() => {
        const result = [1, 1];
        for (let i = 2; i < props.level; i++) {
            result[i] = result[i - 1] + result[i - 2];
        }
        return result;
    }, [props.level]);

    function randomIntInc(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }

    const id = 'span' + randomIntInc(1000000, 9999999);
    const fib = numbers.join(',');
    const text = parseInt(props.idx + 1) == props.timesToRender ? 'Benchmark memo test finished' : (parseInt(props.idx + 1) == 1 ? '' : '');

    return (<span id={id} data-fib={fib}>{text}</span>);

};

export default BenchmarkMemo;