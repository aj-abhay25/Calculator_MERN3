import React, { useEffect, useRef } from "react";

import './Display.css';

function Display(props){
    // 3 components -> history, expression and result

    const resultRef = useRef();
    const expressionRef = useRef();

    // To scroll into view i.e user doesn't have to scroll manually
    useEffect(() => {
        resultRef.current.scrollIntoView();
    }, [props.history]);

    useEffect(() => {
        expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
    }, [props.expression])
    return(
        <div className="Display custom-scroll">
            <div className="History">
            {   
                props.history &&
                props.history.map((item) => <p key = {item + Math.random() * 34}>{item}</p>)
            }
            </div>
            <div ref = {expressionRef} className="Expression custom-scroll">
                <p>{props.expression}</p>
            </div>
            <p ref = {resultRef} className="Result">{props.result}</p>
        </div>
    )
}

export default Display;