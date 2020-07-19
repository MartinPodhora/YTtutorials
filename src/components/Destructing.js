import React from "react"
/*
export const Destructing = ({par1, par2}) => {

    return (
        <div>
            <p>parameter 1 {par1}</p>
            <p>parameter 2 {par2}</p>
        </div>
    )
}

//or , in class the same but this.props, same with state
*/

export const Destructing = (props) => {
    const {par1, par2} = props

    return (
        <div>
            <p>parameter 1 {par1}</p>
            <p>parameter 2 {par2}</p>
        </div>
    )
}