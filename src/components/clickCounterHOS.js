import React, { Component } from 'react'

class ClickCounterHOS extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            count: 0
        }
    }

    incrementCount = () => {
        this.setState(preState => {
            return {
                count: preState.count + 1
            }
        })
    }
    
    render() {
        const {count} = this.state
        return (
            <div>
                <button onClick={this.incrementCount}>Click {count} times</button>
            </div>
        )
    }
}

export default ClickCounterHOS
