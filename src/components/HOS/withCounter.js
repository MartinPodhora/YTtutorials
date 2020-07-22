import React from "react"

const withCounter = (WrappedComponent, incrementNumber )=> {
    //props are passed from HOS in app here not to other classes
    //func which takes a component and return enhanced component
    class WithCounter extends React.Component {
        //copy same functionality which we want to share
        constructor(props) {
            super(props)
        
            this.state = {
                count: 0
            }
        }
    
        incrementCount = () => {
            this.setState(prevState => {
                return {
                    count: prevState.count + incrementNumber
                }
            })
        }
        //count and increment cout needs to be known in other classes

        render() {
            return (
                <WrappedComponent 
                    count={this.state.count} 
                    incrementCount={this.incrementCount}
                    //to add name props from app
                    //name={this.props.name} or for all props
                    {...this.props} //rest of the props
                />
            )
        }
    }
    return WithCounter
}

export default withCounter