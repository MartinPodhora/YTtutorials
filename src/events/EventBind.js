import React, { Component } from 'react'

export class EventBind extends Component {
    constructor() {
        super()

        this.state = {
            msg: "Hello"
        }
        this.clickHandler = this.clickHandler.bind(this)                //vykona sa iba raz oproti v render metod, best option
    }
    /*
    clickHandler() {
        this.setState({
            msg: "bye"
        })
    }*/

    clickHandler = () => {
        this.setState({
            msg: "bye"
        })
    }

    render() {
        return (
            <div>
                <p>{this.state.msg}</p>
                {/*<button onClick={this.clickHandler.bind(this)}>Click</button>                    problem pri kazdom vykreslovani bindovanie moze byt pomale, vytvaranie novej metody}
                <button onClick={() => {this.clickHandler()}}>Click</button>*/}
                <button onClick={this.clickHandler}>Click</button>
            </div>
        )
    }
}

export default EventBind
