import React from 'react'
import "./myStyles.css"

function StyleSheets(props) {
    let className = props.primary ? "primary" : ""
    return (
        <div>
            <h1 className={`${className} font-xl`}>Style sheets</h1>
        </div>
    )
}

export default StyleSheets
