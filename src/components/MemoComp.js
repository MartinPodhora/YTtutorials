import React from 'react'

function MemoComp({name}) {
    console.log("rendering memo component")
    return (
        <div>
            {name}
        </div>
    )
}
//  exporting memo FC(same as pure), React ver. 16.6 +
//  return new enhanced component, 
//  higher order comp

export default React.memo(MemoComp)
