import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Axiostest() {
    const [persons, setpersons] = useState([])

    axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setpersons(res.data)
                //console.log(persons)
            })


    return (
        <div>
            <p>persons</p>
            <ul>
                {persons.map(person => <li>{person.name}</li>)}
            </ul>
        </div>
    )
}

export default Axiostest
