import React, { Component } from 'react'

class ErrorBoundry extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            hasError: false
        }
    }
    

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    //react do automaticaly catch erros but NOT IN EVENT HANDLERS
    componentDidCatch(error, info) {
        console.log(error)
        console.log(info)
    }

    render() {
        if(this.state.hasError) {
            return(
                <p>smting went wrong</p>
            )
        }
        //refers to component we are actally rendering 
        return this.props.children
        //wrap all components(as childrens) with ErrorBoundry
        //kazdeho obalit osobitne
    }
}

export default ErrorBoundry
