import React from 'react'

function FragmentDemo() {
    //used to group childrens without creating new nodes in 

    return (                //with div tag create another node into DOM(div)
        <React.Fragment>
            <h1>
                Fragment Demo
            </h1>
            <p>this describes fragment demo</p>
        </React.Fragment>     
    )
    //pokracovanie na Table.js a Column.js
}

export default FragmentDemo
