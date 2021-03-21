import React, { useState, Profiler } from 'react';
import BenchmarkNormal from "./BenchmarkNormal";
import BenchmarkMemo from "./BenchmarkMemo";
import { Spinner, Layout, Header, Navigation, Drawer, Content, Card, CardText, CardTitle, CardActions, CardMenu, IconButton, Icon } from 'react-mdl';

const PageHeader = (props) => {
    const [showBenchmarkNormal, setShowBenchmarkNormal] = useState(false);
    const [showBenchmarkMemo, setShowBenchmarkMemo] = useState(false);
    const [avgTimeNormal, setAvgTimeNormal] = useState(0);
    const [avgTimeMemo, setAvgTimeMemo] = useState(0);
    React.useEffect(() => {
        const buttonCalculate = document.getElementById("buttonCalculate");
        if(buttonCalculate){
            if(calculationsFinished()){
                buttonCalculate.setAttribute("disabled","disabled");
            }
        }
    }, [avgTimeNormal,avgTimeMemo]);
    // Choose how many times this component needs to be rendered
    // We will then calculate the average render time for all of these renders
    const timesToRender = 10000;
    let _avgTimeArrayNormal = [];
    let _avgTimeArrayMemo = [];
    // Callback for our profiler
    const renderProfilerNormal = (type) => {
        return (...args) => {
            // Keep our render time in an array
            // Later on, calculate the average time
            // store args[3] which is the render time ...
            //console.log("normal: ",args);
            _avgTimeArrayNormal.push(args[3]); 
        };
    };
    const calculateAvgTimeNormal = function(){
        let _avgTime = 0;
        console.log("_avgTimeArrayNormal: ",_avgTimeArrayNormal);
        for(let i = 0; i < _avgTimeArrayNormal.length; i++){
            _avgTime += _avgTimeArrayNormal[i]; 
        }
        console.log("_avgTime normal: ",_avgTime);
        const _avgTimeArrayLength = parseInt(_avgTimeArrayNormal.length);
        console.log("_avgTimeArrayLength normal: ",_avgTimeArrayLength);
        const avgTimeNumber = parseInt(_avgTime);
        let _avgTimeNormal = avgTimeNumber/_avgTimeArrayLength;
        console.log("_avgTimeNormal normal: ",_avgTimeNormal);
        if(isNaN(_avgTimeNormal)){
            _avgTimeNormal = 0;
        }
        if(showBenchmarkNormal){
            setAvgTimeNormal(_avgTimeNormal);
        }
        _avgTimeArrayNormal = [];
    };
    const executeNormal = function(){
        setShowBenchmarkMemo(false);
        setShowBenchmarkNormal(true);
    }
    const renderProfilerMemo = (type) => {
        return (...args) => {
            // Keep our render time in an array
            // Later on, calculate the average time
            // store args[3] which is the render time ...
            _avgTimeArrayMemo.push(args[3]);
        };
    };
    const calculateAvgTimeMemo = function(){
        let _avgTime = 0;
        console.log("_avgTimeArrayMemo: ",_avgTimeArrayMemo);
        for(let i = 0; i < _avgTimeArrayMemo.length; i++){
            _avgTime += _avgTimeArrayMemo[i]; 
        }
        console.log("_avgTime memo: ",_avgTime);
        const _avgTimeArrayLength = parseInt(_avgTimeArrayMemo.length);
        console.log("_avgTimeArrayLength memo: ",_avgTimeArrayLength);
        const avgTimeNumber = parseInt(_avgTime);
        let _avgTimeMemo = avgTimeNumber/_avgTimeArrayLength;
        console.log("_avgTimeMemo memo: ",_avgTimeMemo);
        if(isNaN(_avgTimeMemo)){
            _avgTimeMemo = 0;
        }
        if(showBenchmarkMemo){
            setAvgTimeMemo(_avgTimeMemo);
        }
        _avgTimeArrayMemo = [];
    };
    const executeMemo = function(){
        setShowBenchmarkNormal(false);
        setShowBenchmarkMemo(true);
    }
    const calculationsFinished = function(){
        let result = false;
        const spanAvgTimeNormal = document.getElementById("spanAvgTimeNormal");
        const spanAvgTimeMemo = document.getElementById("spanAvgTimeMemo");
        let spanAvgTimeNormalDone = false;
        let spanAvgTimeMemoDone = false;
        if(spanAvgTimeNormal){
            if(spanAvgTimeNormal.innerText != 0){
                spanAvgTimeNormalDone = true;
            }
        }
        if(spanAvgTimeMemo){
            if(spanAvgTimeMemo.innerText != 0){
                spanAvgTimeMemoDone = true;
            }
        }
        if(spanAvgTimeNormalDone && spanAvgTimeMemoDone){
            result = true;
        }
        console.log("calculationsFinished: ",result);
        return result;
    }
    const resetPage = () => {
        document.location = document.location;
    }
    const randomIntInc = (low, high) => {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }
    const buttonResetStyle = {
        display: "none"
    }
    const headerA = (<a className="bitbucket-link" href="https://bitbucket.org/charlesrobertson/use-memo-benchmark-functional/src/master/" target="_blank" rel="noreferrer"><i className="fa fa-github"></i></a>);
    const headerSpan = (<span className="mdl-layout-title">Use Memo Benchmark</span>);

    const defaultStyle1 = {
        display: 'block'
      };
    const defaultStyle2 = {
        padding: '20px'
    };
    const defaultStyle3 = {
        background: 'tomato'
    }
    let optsClassName1 = {};
    optsClassName1['className'] = "demo-card-wide";
    let optsClassName2 = {};
    optsClassName2['className'] = "post";

    const headerLink = ( 
        showBenchmarkNormal ?
        (
            <Card shadow={0} {...optsClassName1} style={defaultStyle1}>
                <CardTitle {...optsClassName2}>
                    <h2 className="mdl-card__title-text">{props.title}</h2>
                </CardTitle>
                <CardText>
                    <ol>
                        <li>
                            Please click on the Toggle Normal button, until a 'finish' notification appears, and then the calculate button
                        </li>
                        <li>
                            Please click on the Toggle Memo button, until a 'finish' notification appears, and then the calculate button
                        </li>
                        <li>
                            Click on the refresh icon above.
                        </li>
                    </ol>
                </CardText>
                <CardActions border>
                    <div className="todo-container" style={defaultStyle2}>

                        <div>
                            <p className="notification"> 
                                {showBenchmarkNormal && [...Array(timesToRender)].map((currentValue,index) => {
                                    return <Profiler id={`normal-${index}`} onRender={renderProfilerNormal('normal')} key={index}>
                                        <BenchmarkNormal level={1} timesToRender={timesToRender} idx={index} />
                                    </Profiler>;
                                })}
                
                            </p>
                            <p>
                                <a className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {executeNormal()}}>Toggle Normal</a>
                            </p>
                            <p>
                                <a className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {executeMemo()}}>Toggle Memo</a>
                            </p>
                            <p>
                                <a id="buttonCalculate" style={defaultStyle3} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {calculateAvgTimeNormal();calculateAvgTimeMemo()}}>Calculate</a>
                            </p>
                            <div>

                                <Card className="card-calculate" shadow={0} style={{marginTop: '40px'}}>
                                    <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                                        <h4 style={{marginTop: '0'}}>
                                            <strong>Avg time</strong> normal for a {timesToRender} loop
                                        </h4>
                                    </CardTitle>
                                    <CardActions border style={{borderColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', boxSizing: 'border-box', alignItems: 'center', color: '#fff'}}>
                                        <span id="spanAvgTimeNormal">{avgTimeNormal}</span>
                                        <div className="mdl-layout-spacer"></div>
                                        <Icon name="calculate" />
                                    </CardActions>
                                </Card>

                                <Card className="card-calculate" shadow={0} style={{marginTop: '20px'}}>
                                    <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                                        <h4 style={{marginTop: '0'}}>
                                            <strong>Avg time</strong> memo for a {timesToRender} loop
                                        </h4>
                                    </CardTitle>
                                    <CardActions border style={{borderColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', boxSizing: 'border-box', alignItems: 'center', color: '#fff'}}>
                                        <span id="spanAvgTimeMemo">{avgTimeMemo}</span>
                                        <div className="mdl-layout-spacer"></div>
                                        <Icon name="calculate" />
                                    </CardActions>
                                </Card>

                            </div>
                        </div> 

                    </div>     

                </CardActions>
                <CardMenu style={{color: '#fff'}}>
                    <IconButton  id="buttonReset" name="refresh" onClick={() => {resetPage()}} />
                </CardMenu>
            </Card>
        )
        :
        (
            showBenchmarkMemo ?
            (
                <Card shadow={0} {...optsClassName1} style={defaultStyle1}>
                    <CardTitle {...optsClassName2}>
                        <h2 className="mdl-card__title-text">{props.title}</h2>
                    </CardTitle>
                    <CardText>
                        <ol>
                            <li>
                                Please click on the Toggle Normal button, until a 'finish' notification appears, and then the calculate button
                            </li>
                            <li>
                                Please click on the Toggle Memo button, until a 'finish' notification appears, and then the calculate button
                            </li>
                            <li>
                                Click on the refresh icon above.
                            </li>
                        </ol>
                    </CardText>
                    <CardActions border>
                        <div className="todo-container" style={defaultStyle2}>
                    
                            <div>
                                <p className="notification"> 
                                    {showBenchmarkMemo && [...Array(timesToRender)].map((currentValue,index) => {
                                        return <Profiler id={`memo-${index}`} onRender={renderProfilerMemo('memo')} key={index}>
                                            <BenchmarkMemo level={1} timesToRender={timesToRender} idx={index} />
                                        </Profiler>;
                                    })}
                                </p>
                                <p>
                                    <a className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {executeNormal()}}>Toggle Normal</a>
                                </p>
                                <p>
                                    <a className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {executeMemo()}}>Toggle Memo</a>
                                </p>
                                <p>
                                    <a id="buttonCalculate" style={defaultStyle3} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {calculateAvgTimeNormal();calculateAvgTimeMemo()}}>Calculate</a>
                                </p>
                                <p>
                                    <button id="buttonReset" onClick={() => {resetPage()}} style={buttonResetStyle}>Reset</button>
                                </p>
                                <div>

                                    <Card className="card-calculate" shadow={0} style={{marginTop: '40px'}}>
                                        <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                                            <h4 style={{marginTop: '0'}}>
                                                <strong>Avg time</strong> normal for a {timesToRender} loop
                                            </h4>
                                        </CardTitle>
                                        <CardActions border style={{borderColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', boxSizing: 'border-box', alignItems: 'center', color: '#fff'}}>
                                            <span id="spanAvgTimeNormal">{avgTimeNormal}</span>
                                            <div className="mdl-layout-spacer"></div>
                                            <Icon name="calculate" />
                                        </CardActions>
                                    </Card>

                                    <Card className="card-calculate" shadow={0} style={{marginTop: '20px'}}>
                                        <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                                            <h4 style={{marginTop: '0'}}>
                                                <strong>Avg time</strong> memo for a {timesToRender} loop
                                            </h4>
                                        </CardTitle>
                                        <CardActions border style={{borderColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', boxSizing: 'border-box', alignItems: 'center', color: '#fff'}}>
                                            <span id="spanAvgTimeMemo">{avgTimeMemo}</span>
                                            <div className="mdl-layout-spacer"></div>
                                            <Icon name="calculate" />
                                        </CardActions>
                                    </Card>

                                </div>
                            </div>

                        </div>

                    </CardActions>
                    <CardMenu style={{color: '#fff'}}>
                        <IconButton  id="buttonReset" name="refresh" onClick={() => {resetPage()}} />
                    </CardMenu>
                </Card>
            )
            :
            (
                <Card shadow={0} {...optsClassName1} style={defaultStyle1}>
                    <CardTitle {...optsClassName2}>
                        <h2 className="mdl-card__title-text">{props.title}</h2>
                    </CardTitle>
                    <CardText>
                        <ol>
                            <li>
                                Please click on the Toggle Normal button, until a 'finish' notification appears, and then the calculate button
                            </li>
                            <li>
                                Please click on the Toggle Memo button, until a 'finish' notification appears, and then the calculate button
                            </li>
                            <li>
                                Click on the refresh icon above.
                            </li>
                        </ol>
                    </CardText>
                    <CardActions border>
                        <div className="todo-container" style={defaultStyle2}>

                            <div>
                                <p>
                                    <a className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {executeNormal()}}>Toggle Normal</a>
                                </p>
                                <p>
                                    <a className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {executeMemo()}}>Toggle Memo</a>
                                </p>
                                <p>
                                    <a id="buttonCalculate" style={defaultStyle3} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {calculateAvgTimeNormal();calculateAvgTimeMemo()}}>Calculate</a>
                                </p>
                                <div>

                                    <Card className="card-calculate" shadow={0} style={{marginTop: '40px'}}>
                                        <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                                            <h4 style={{marginTop: '0'}}>
                                                <strong>Avg time</strong> normal for a {timesToRender} loop
                                            </h4>
                                        </CardTitle>
                                        <CardActions border style={{borderColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', boxSizing: 'border-box', alignItems: 'center', color: '#fff'}}>
                                            <span id="spanAvgTimeNormal">{avgTimeNormal}</span>
                                            <div className="mdl-layout-spacer"></div>
                                            <Icon name="calculate" />
                                        </CardActions>
                                    </Card>

                                    <Card className="card-calculate" shadow={0} style={{marginTop: '20px'}}>
                                        <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                                            <h4 style={{marginTop: '0'}}>
                                                <strong>Avg time</strong> memo for a {timesToRender} loop
                                            </h4>
                                        </CardTitle>
                                        <CardActions border style={{borderColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', boxSizing: 'border-box', alignItems: 'center', color: '#fff'}}>
                                            <span id="spanAvgTimeMemo">{avgTimeMemo}</span>
                                            <div className="mdl-layout-spacer"></div>
                                            <Icon name="calculate" />
                                        </CardActions>
                                    </Card>

                                </div>
                            </div>

                        </div>

                    </CardActions>
                    <CardMenu style={{color: '#fff'}}>
                        <IconButton  id="buttonReset" name="refresh" onClick={() => {resetPage()}} />
                    </CardMenu>
                </Card>

            )
        )
    );

    return ( 
        <Layout fixedHeader>
            <Header title={headerSpan}>
                {headerA}
            </Header>
            <Drawer title="Postman REST API">
                <Navigation className="mdl-navigation"></Navigation>
            </Drawer>
            <Content>
                <div className="page-content">
                    {headerLink}
                </div>
            </Content>
        </Layout>
    );
};

export default PageHeader;