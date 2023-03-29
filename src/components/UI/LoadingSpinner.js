import React from 'react'
import loader from "../../Assets/loader.png"

export default function LoadingSpinner(props) {
    const loaderArea = props.loaderArea
    return (
        <div className='loader' style={{ minHeight: `${loaderArea}vh`, minWidth: `${loaderArea}vw` }}>
            <img src={loader} alt="Loading..." height={props.loaderSize} width={props.loaderSize} />
        </div>
    )
}
