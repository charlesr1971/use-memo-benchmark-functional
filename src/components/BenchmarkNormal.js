import React from 'react';

const BenchmarkNormal = ({level}) => {
    const complexObject = {
        values: []
    };
    for (let i = 0; i <= level; i++) {
        complexObject.values.push('mytest');
    }
    //console.log(complexObject);
    return ( <div>Benchmark level: {level}</div>);
};

export default BenchmarkNormal;