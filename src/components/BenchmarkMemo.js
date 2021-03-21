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
    return ( ('idx' in props ? (parseInt(props.idx + 1)) : 0) == props.timesToRender ? (<span>Benchmark memo test finished</span>) : (<span></span>));
};

export default BenchmarkMemo;