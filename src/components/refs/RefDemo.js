import React, { Component } from 'react'

class RefDemo extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()   //1st type
        this.cbRef = null                   //2nd type, callback ref
        this.setCbRef = (element) => {      //method which asign property with DomElm as param
            this.cbRef = element
        }
    }
    
    // create ref


    componentDidMount() {
        //this.inputRef.current.focus()           //prida focus na dany input(kurzor sa uz tam nechadza)
        //console.log(this.inputRef)

        //will call the ref with Dom element when comp mounts, call it with null when it unmounts
        this.cbRef && this.cbRef.focus()       
    }

    clickHandler = () => {
        alert(this.inputRef.current.value)
    }

    render() {          
        return (
            <div>
               <input type="text" ref={this.inputRef} />
               <input type="text" ref={this.setCbRef} />       {/*input element is implicit passed as parameter*/} 
               <button onClick={this.clickHandler}>Click</button> 
            </div>
        )
    }
}

export default RefDemo
