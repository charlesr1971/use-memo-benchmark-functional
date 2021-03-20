import React, {useMemo} from 'react';

const BenchmarkMemo = ({level}) => {
    const complexObject = useMemo(() => {
        const result = {
            values: []
        };
        for (let i = 0; i <= level; i++) {
            result.values.push('mytest');
        };
        return result;
    }, [level]);
    return (<div>Benchmark with memo level: {level}</div>);
};

export default BenchmarkMemo;