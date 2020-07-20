import React from 'react'

function Columns() {
    const items = []
    return (
        <React.Fragment>
            {
                items.map(item => (
                    <React.Fragment key={item.id}>
                        <h1>Title</h1>
                        <p>{item.title}</p>
                    </React.Fragment>    
                ))
            }

            <td>Name</td>
            <td>Surname</td>
        </React.Fragment>

        //React.Fragment can be typed like <> childrens </> but u cant pass key atribute
    )
}

export default Columns
