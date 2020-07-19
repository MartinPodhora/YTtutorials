import React, { Component } from 'react'

class Counter extends Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
    }

    increment() {/*
        this.setState({
            count: this.state.count + 1
        }, () => {console.log("callback value", this.state.count)})             //callback meetoda sa vykona po nastaveni statu kebyze ju napisem len za vykona sa so starou hodnotou
        */
       
        this.setState((prevState) => ({
            count: prevState.count + 1
        }))
    }

    render() {
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={() => this.increment()}>++</button>
            </div>
        )
    }
}

export default Counter
