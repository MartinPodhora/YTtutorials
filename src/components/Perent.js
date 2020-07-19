import React, { Component } from 'react'
import Child from "./Child"

export class Perent extends Component {
    constructor() {
        super()

        this.state ={
            parentName: "parent"
        }

        this.greetParent = this.greetParent.bind(this)
    }

    greetParent(childName) {
        alert(`hello ${this.state.parentName} from ${childName}`)         //pokial pouzivam this v metode musi byt bindnuta
    }

    render() {                                          //priradim metodu
        return (
            <div>
                <Child greetHandler={this.greetParent}/>        
            </div>
        )
    }
}

export default Perent
