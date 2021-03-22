import React, {useMemo} from 'react';

const BenchmarkMemo = (props) => {
    const complexObject = useMemo(() => {
        const result = {
            values: []
        };
        const randomIntInc = (low, high) => {
            return Math.floor(Math.random() * (high - low + 1) + low);
        }
        for (let i = 0; i <= props.level; i++) {
            const newLocal = randomIntInc(1000000, 9999999);
            result.values.push(newLocal);
        };
        return result;
    }, [props.level]);
    //const text = ('idx' in props ? (parseInt(props.idx + 1)) : 0) == props.timesToRender ? ('Benchmark memo test finished') : ('idx' in props ? (parseInt(props.idx + 1)) : 0) == 1 ? ('Benchmark memo test started') : '';
    const text = parseInt(props.idx + 1) == props.timesToRender ? 'Benchmark memo test finished' : (parseInt(props.idx + 1) == 1 ? '' : '');
    return (<span>{text}</span>);
};

export default BenchmarkMemo;