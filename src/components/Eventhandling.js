import React from 'react'               //rfce

function Eventhandling() {

    function clickHandler() {
        console.log("clicked")
    }

    return (
        <div>
            <button onClick={clickHandler}>Click</button>   //nedavat () vola funckiu ale my chemem priradit
        </div>
    )
}

export default Eventhandling
