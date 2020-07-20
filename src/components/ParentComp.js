import React, { Component } from 'react'
import RegComp from './RegComp'
import PureComp from './PureComponent'

class ParentComp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: "myName"
        }
    }
    
    componentWillMount() {
        setInterval(() => {
            this.setState({
                name: "myName"
            })
        } , 2000)
    }

    render() {
        console.log("**********************parent Comp render**********************")

        return (
            <div>
                Parent Component
                <RegComp name={this.state.name}></RegComp>
                <PureComp name={this.state.name}></PureComp>
            </div>
        )
    }
}

export default ParentComp
