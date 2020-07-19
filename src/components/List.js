import React from 'react'

function List() {
    const names = ["blep" , "mlem" , "meow"]
    const doneList = names.map(name => <h2>{name}</h2>)

const keyList = names.map((name, index) => <h2 key={index}>{name}</h2>)
    //1st is parameter
    //ak znova zacnem pouzivat html zas treba {}
    return (
        <div>
            {doneList}
        </div>
    )
}

export default List
