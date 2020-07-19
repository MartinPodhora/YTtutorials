import React, { Component } from 'react'

export class UserGreeting extends Component {
    constructor() {
        super()
        this.state = {
            isLogged: true
        }
    }

    render() {
        let msg = this.state.isLogged ? "WC boss" : "WC quest"
        return (
            <div>
                <h1>{msg}</h1>
            </div>
        )
    }
}

export default UserGreeting
