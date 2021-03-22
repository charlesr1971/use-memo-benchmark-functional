import React, { useState, useRef, Profiler } from 'react';
import BenchmarkNormal from "./BenchmarkNormal";
import BenchmarkMemo from "./BenchmarkMemo";
import { Spinner, Layout, Header, Navigation, Drawer, Content, Card, CardText, CardTitle, CardActions, CardMenu, IconButton, Icon } from 'react-mdl';

const PageHeader = (props) => {
    const [showBenchmarkNormal, setShowBenchmarkNormal] = useState(false);
    const [showBenchmarkMemo, setShowBenchmarkMemo] = useState(false);
    const [avgTimeNormal, setAvgTimeNormal] = useState(0);
    const [avgTimeMemo, setAvgTimeMemo] = useState(0);
    const [runAnimation, setRunAnimation] = useState(false);
    const [renderFinishedNormal, setRenderFinishedNormal] = useState(false);
    const [renderFinishedMemo, setRenderFinishedMemo] = useState(false);
    const [timesToRender, setTimesToRender] = useState(10000);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    React.useEffect(() => {
        const buttonCalculate = document.getElementById("buttonCalculate");
        const toggleNormal = document.getElementById("toggleNormal");
        const toggleMemo = document.getElementById("toggleMemo");
        if(buttonCalculate && toggleNormal && toggleMemo){
            if(renderFinishedNormal){
                buttonCalculate.removeAttribute("disabled");
                toggleNormal.setAttribute("disabled","disabled");
                toggleMemo.setAttribute("disabled","disabled");
                window.componentHandler.upgradeDom();
            }
            if(calculationsNormalFinished()){
                buttonCalculate.setAttribute("disabled","disabled");
                toggleNormal.setAttribute("disabled","disabled");
                toggleMemo.removeAttribute("disabled");
                window.componentHandler.upgradeDom();
            }
            if(renderFinishedMemo){
                buttonCalculate.removeAttribute("disabled");
                toggleMemo.setAttribute("disabled","disabled");
                window.componentHandler.upgradeDom();
            }
            if(calculationsMemoFinished()){
                buttonCalculate.setAttribute("disabled","disabled");
                toggleMemo.setAttribute("disabled","disabled");
                window.componentHandler.upgradeDom();
                   
            }
            if(calculationsFinished()){
                buttonCalculate.setAttribute("disabled","disabled");
                window.componentHandler.upgradeDom();
            }
        }
    }, [avgTimeNormal,avgTimeMemo,renderFinishedNormal,renderFinishedMemo]);
    React.useEffect(() => {
        if(timesToRender != 10000){
            const loopamountSelect = document.getElementById("loopamountSelect");
            if(loopamountSelect){
                loopamountSelect.setAttribute("disabled","disabled");
            }
        }
    }, [timesToRender]);
    // Choose how many times this component needs to be rendered
    // We will then calculate the average render time for all of these renders
    const global_consoleDebug = false;
    //const timesToRender = 10000;
    let _avgTimeArrayNormal = [];
    let _avgTimeArrayMemo = [];

    function _renderProfilerNormal(){
        return [...Array(timesToRender)].map((currentValue,index) => {
            return <Profiler id={`normal-${index}`} onRender={renderProfilerNormal('normal')} key={index}>
                <BenchmarkNormal level={1} timesToRender={timesToRender} idx={index} />
            </Profiler>;
        })
    }
    
    // Callback for our profiler
    const renderProfilerNormal = (type) => {
        return (...args) => {
            // Keep our render time in an array
            // Later on, calculate the average time
            // store args[3] which is the render time ...
            _avgTimeArrayNormal.push(args[3]); 
            let lastId1 = 'normal-' + parseInt(timesToRender - 1);
            lastId1 = lastId1.trim();
            let lastId2 = args[0].trim();
            if(lastId1 == lastId2){
                setRenderFinishedNormal(true);
            }
        };
    };

    const calculateAvgTimeNormal = function(){
        let _avgTime = 0;
        //if(global_consoleDebug){
            console.log("_avgTimeArrayNormal: ",_avgTimeArrayNormal);
        //}
        for(let i = 0; i < _avgTimeArrayNormal.length; i++){
            _avgTime += _avgTimeArrayNormal[i]; 
        }
        //if(global_consoleDebug){
            console.log("_avgTime normal: ",_avgTime);
        //}
        const _avgTimeArrayLength = parseInt(_avgTimeArrayNormal.length);
        //if(global_consoleDebug){
            console.log("_avgTimeArrayLength normal: ",_avgTimeArrayLength);
        //}
        const avgTimeNumber = parseInt(_avgTime);
        let _avgTimeNormal = avgTimeNumber/_avgTimeArrayLength;
        //if(global_consoleDebug){
            console.log("_avgTimeNormal normal: ",_avgTimeNormal);
        //}
        if(isNaN(_avgTimeNormal)){
            _avgTimeNormal = 0;
        }
        if(showBenchmarkNormal){
            setRunAnimation(false);
            setAvgTimeNormal(_avgTimeNormal);
        }
        _avgTimeArrayNormal = [];
    };

    const executeNormal = function(){
        //setRunAnimation(true);
        setShowBenchmarkMemo(false);
        setShowBenchmarkNormal(true);
    }

    const calculationsNormalFinished = function(){
        let result = false;
        const spanAvgTimeNormal = document.getElementById("spanAvgTimeNormal");
        let spanAvgTimeNormalDone = false;
        if(spanAvgTimeNormal){
            if(spanAvgTimeNormal.innerText != 0){
                spanAvgTimeNormalDone = true;
            }
        }
        //if(global_consoleDebug){
            console.log("calculationsNormalFinished: ",result);
        //}
        return spanAvgTimeNormalDone;
    }

    function _renderProfilerMemo(){
        return [...Array(timesToRender)].map((currentValue,index) => {
            return <Profiler id={`memo-${index}`} onRender={renderProfilerMemo('memo')} key={index}>
                <BenchmarkMemo level={1} timesToRender={timesToRender} idx={index} />
            </Profiler>;
        })
    }

    const renderProfilerMemo = (type) => {
        return (...args) => {
            // Keep our render time in an array
            // Later on, calculate the average time
            // store args[3] which is the render time ...
            _avgTimeArrayMemo.push(args[3]);
            let lastId1 = 'memo-' + parseInt(timesToRender - 1);
            lastId1 = lastId1.trim();
            let lastId2 = args[0].trim();
            if(lastId1 == lastId2){
                setRenderFinishedMemo(true);
            }
        };
    };

    const calculateAvgTimeMemo = function(){
        let _avgTime = 0;
        //if(global_consoleDebug){
            console.log("_avgTimeArrayMemo: ",_avgTimeArrayMemo);
        //}
        for(let i = 0; i < _avgTimeArrayMemo.length; i++){
            _avgTime += _avgTimeArrayMemo[i]; 
        }
        //if(global_consoleDebug){
            console.log("_avgTime memo: ",_avgTime);
        //}
        const _avgTimeArrayLength = parseInt(_avgTimeArrayMemo.length);
        //if(global_consoleDebug){
            console.log("_avgTimeArrayLength memo: ",_avgTimeArrayLength);
        //}
        const avgTimeNumber = parseInt(_avgTime);
        let _avgTimeMemo = avgTimeNumber/_avgTimeArrayLength;
        //if(global_consoleDebug){
            console.log("_avgTimeMemo memo: ",_avgTimeMemo);
        //}
        if(isNaN(_avgTimeMemo)){
            _avgTimeMemo = 0;
        }
        if(showBenchmarkMemo){
            setRunAnimation(false);
            setAvgTimeMemo(_avgTimeMemo);
        }
        _avgTimeArrayMemo = [];
    };

    const executeMemo = function(){
        setShowBenchmarkNormal(false);
        setShowBenchmarkMemo(true);
    }

    const calculationsMemoFinished = function(){
        let result = false;
        const spanAvgTimeMemo = document.getElementById("spanAvgTimeMemo");
        let spanAvgTimeMemoDone = false;
        if(spanAvgTimeMemo){
            if(spanAvgTimeMemo.innerText != 0){
                spanAvgTimeMemoDone = true;
            }
        }
        //if(global_consoleDebug){
            console.log("calculationsMemoFinished: ",result);
        //}
        return spanAvgTimeMemoDone;
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
        //if(global_consoleDebug){
            console.log("calculationsFinished: ",result);
        //}
        return result;
    }

    const animate = function(type){
        setRunAnimation(true);
        if(type == 'normal'){
            setTimeout(function(){
                executeNormal();
            },500);
        }
        if(type == 'memo'){
            setTimeout(function(){
                executeMemo();
            },500);
        }
    }

    const resetPage = () => {
        document.location = document.location;
    }

    const randomIntInc = (low, high) => {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }

    const handleSelectChange = (event) => {
        //if(global_consoleDebug){
            console.log('Pageheader: handleSelectChange(): event.target.value: ',event.target.value);
        //}
        setTimesToRender(parseInt(event.target.value));
    }

    const buttonResetStyle = {
        display: "none"
    };

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
    };

    let optsClassName1 = {};
    optsClassName1['className'] = "demo-card-wide";
    let optsClassName2 = {};
    optsClassName2['className'] = "post";

    
    const defaultStyle4 = {
        display: 'none'
    };
    if(runAnimation){
        defaultStyle4['display'] = "block";
    }

    const spinner = (<div ref={ref1} className="spinner-container" style={defaultStyle4}><div ref={ref2} className="spinner-container-inner"><Spinner ref={ref3} singleColor /></div></div>);

    const _loopamount_select = [100,500,1000,5000,10000,15000,20000,25000,30000,40000,50000,60000,70000,80000,90000,100000];

    let loopamount_select = _loopamount_select.map(
        function (records, index) {
            return (
            <option value={records} key={index}>{records}</option>
            );
        }
    );
    loopamount_select = (<div className="loopamount-select"><select id="loopamountSelect" className="custom" onChange={handleSelectChange.bind(this)} value={timesToRender}>{loopamount_select}</select></div>);

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
                            {loopamount_select}
                            <div className="notification"> 
                                <div className="left">{spinner}</div>
                                <div id="notification-right" className="right"> 
                                    {_renderProfilerNormal()}
                                </div>
                            </div>
                            <p>
                                <button id="toggleNormal" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {animate('normal')}}>Toggle Normal</button>
                            </p>
                            <p>
                                <button id="toggleMemo" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {animate('memo')}}>Toggle Memo</button>
                            </p>
                            <p>
                                <button id="buttonCalculate" style={defaultStyle3} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {calculateAvgTimeNormal();calculateAvgTimeMemo()}}>Calculate</button>
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
                                {loopamount_select}
                                <div className="notification"> 
                                    <div className="left">{spinner}</div>
                                    <div id="notification-right" className="right">
                                        {_renderProfilerMemo()}
                                    </div>
                                </div>
                                <p>
                                    <button id="toggleNormal" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {animate('normal')}}>Toggle Normal</button>
                                </p>
                                <p>
                                    <button id="toggleMemo" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {animate('memo')}}>Toggle Memo</button>
                                </p>
                                <p>
                                    <button id="buttonCalculate" style={defaultStyle3} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {calculateAvgTimeNormal();calculateAvgTimeMemo()}}>Calculate</button>
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
                                {loopamount_select}
                                <div className="notification"> 
                                    <div className="left">{spinner}</div>
                                    <div id="notification-right" className="right"></div>
                                </div>
                                <p>
                                    <button id="toggleNormal" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {animate('normal')}}>Toggle Normal</button>
                                </p>
                                <p>
                                    <button id="toggleMemo" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {animate('memo')}} disabled>Toggle Memo</button>
                                </p>
                                <p>
                                    <button id="buttonCalculate" style={defaultStyle3} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => {calculateAvgTimeNormal();calculateAvgTimeMemo()}} disabled>Calculate</button>
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
            <Drawer>
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