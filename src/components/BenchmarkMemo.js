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
    }, [props.idx]);

    const id = 'span' + complexObject.values[0];
    const text = parseInt(props.idx + 1) == props.timesToRender ? 'Benchmark memo test finished' : (parseInt(props.idx + 1) == 1 ? '' : '');

    return (<span id={id}>{text}</span>);

};

export default BenchmarkMemo;