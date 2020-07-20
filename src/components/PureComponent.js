import React, { PureComponent } from 'react'

//rpce recat pure class export

class PureComp extends PureComponent {

    //pri updejte kontroluje ci:
    //                              -predosli stav je rovnaky ako aktualny
    //                              -predosle props su rovnake ako aktualne
    //
    //      ak su rozdielne tak ho prekresli, inac nie
    //      ale neprekresli nikdy ani children  

    render() {
        console.log("Pure Comp render")

        return (
            <div>
                Pure Component {this.props.name}
            </div>
        )
    }
}

export default PureComp
