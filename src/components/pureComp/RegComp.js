import React, { Component } from 'react'

class RegComp extends Component {
    render() {
        console.log("regular Comp render")
        return (
            <div>
                Regular Componenet {this.props.name}
            </div>
        )
    }
}

export default RegComp
