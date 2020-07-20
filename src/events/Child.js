import React from 'react'           //rfce

function Child(props) {
    return (
        <div>
            <button onClick={() => props.greetHandler("child")}>greed parent</button>
        </div>
    )
}

export default Child
