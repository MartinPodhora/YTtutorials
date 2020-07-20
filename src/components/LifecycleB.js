import React, { Component } from 'react'

class LifecycleB extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: "myName"
        }
        //run 1st at begin
        console.log("LifecycleB constructor")
    }

    static getDerivedStateFromProps(props, state) {
        //get state and props returning new state or null
        //run 2nd at begin 
        console.log("LifecycleB getDerivedStateFromProps")
        return null
    }

    componentDidMount() {
        //run 4th at begin
        console.log("LifecycleB componentDidMount")
    }

    shouldComponentUpdate() {
        console.log("LifecycleB shouldComponentUpdate")
        return true
    }

    getSnapshotBeforeUpdate() {
        console.log("LifecycleB getSnapshotBeforeUpdate")
        return null
    }

    componentDidUpdate() {
        console.log("LifecycleB componentDidUpdate")
    }

    render() {
        //run 3rd at begin
        console.log("LifecycleB render()")
        return (
            <div>
                <div>LifecycleB</div>
            </div>
        )
    }
}

export default LifecycleB