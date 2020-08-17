import React, { useContext, useEffect, useState } from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { ErrorList } from "./MainPage"

function ErrorAlert() {
    const [open, setOpen] = useState(false)
    const [ errors, setErrors ]  = useContext(ErrorList)
    const msg = errors[errors.length - 1]
    console.log(msg)


    useEffect(() => {
        setOpen(true)
    }, [errors])

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Snackbar 
                open={open} 
                autoHideDuration={5000} 
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center"}}
            >
                <MuiAlert 
                    onClose={handleClose} 
                    variant="filled" 
                    severity="error"
                >
                    {msg !== "" ? msg : ""}
                </ MuiAlert>
            </Snackbar>
        </>
    )
}

export default ErrorAlert
