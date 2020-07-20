import React, { Component } from 'react'
import LifecycleB from './LifecycleB'

class LifecycleA extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: "myName"
        }
        //run 1st at begin
        console.log("LifecycleA constructor")
    }

    static getDerivedStateFromProps(props, state) {
        //get state and props returning new state or null
        //run 2nd at begin ----------- 1st at update
        console.log("LifecycleA getDerivedStateFromProps")
        return null
    }

    componentDidMount() {
        //run 4th at begin
        console.log("LifecycleA componentDidMount")
    }

    shouldComponentUpdate() {
        //----------- 2nd at update
        console.log("LifecycleA shouldComponentUpdate")
        return true
    }

    getSnapshotBeforeUpdate() {
        //----------- 4th at update
        console.log("LifecycleA getSnapshotBeforeUpdate")
        return null
    }

    componentDidUpdate() {
        //----------- 5th at update
        console.log("LifecycleA componentDidUpdate")
    }

    changeState = () => {
        this.setState({
            name: "codevolution"
        })
    }

    render() {
        //run 3rd at begin ----------- 3rd at update
        console.log("LifecycleA render")
        return (
            <div>
               <div>
                   LifecycleA
               </div>
               <button onClick={this.changeState}>Change state</button>
               <LifecycleB /> 
            </div>
        )
    }
}

export default LifecycleA
