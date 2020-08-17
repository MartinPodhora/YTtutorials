import React, {useContext} from 'react'
import { ErrorList } from "./MainPage"

function ErrorLog() {
    const [ errors, setErrors ]  = useContext(ErrorList)

    return (
        <div>
            {errors}
        </div>
    )
}

export default ErrorLog
