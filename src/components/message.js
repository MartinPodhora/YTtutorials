import React, {Component} from "react"

export class Message extends Component {

    constructor() {
        super()
        this.state = {
            msg: "welcome visitor"
        }
    }

    changeMessage() {
        this.setState({
            msg: "thanks for visiting"
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.msg} </h1>
                <button onClick={() => this.changeMessage()}>Subscribe</button>
            </div>
            
        )
    } 
}