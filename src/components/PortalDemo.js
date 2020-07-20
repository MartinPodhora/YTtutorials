import React from 'react'
import ReactDom from "react-dom"

function PortalDemo() {
    //1st param jsx, also components
    //2nd node in html
    //moze pokazit ui https://codesandbox.io/s/00254q4n6p Modal ?
    //event bubling https://codepen.io/gaearon/pen/jGBWpE

    return ReactDom.createPortal(
        <h1>Portal Demo</h1>,
        document.getElementById("portal-root")
    )
}

export default PortalDemo
