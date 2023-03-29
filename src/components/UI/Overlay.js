import React from 'react'
import ReactDom from 'react-dom'
import classes from "./Overlay.module.css"


const OverlayBox = (props) => {
    return (
        <div className={classes.backdrop}>
            <div className={classes.overlayBox}>
                <h1>{props.message}</h1>
                <button onClick={props.onClick}>Close</button>
            </div>
        </div>
    )
}

export default function Overlay(props) {
    return (
        <React.Fragment>
            {ReactDom.createPortal(<OverlayBox message={props.message} onClick={props.onClick} />, document.getElementById("overlay"))}
        </React.Fragment>
    )
}
