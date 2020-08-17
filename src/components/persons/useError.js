import { useState, useEffect } from 'react'

export function useError(msg, type, open) {
    const [Error, setError] = useState({
        msg: msg,
        type: type
    })

    useEffect(() => {
        if(Error.msg !== "") open(true)
    }, [Error])

    return [ Error, setError]
}

