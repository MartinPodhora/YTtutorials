import React, { Component } from 'react'
import RegComp from './RegComp'
import PureComp from './PureComponent'
import MemoComp from './MemoComp'

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
                {/*<RegComp name={this.state.name}></RegComp>*/}
                {/*<PureComp name={this.state.name}></PureComp>*/}
                <MemoComp name={this.state.name} />
            </div>
        )
    }
}

export default ParentComp
