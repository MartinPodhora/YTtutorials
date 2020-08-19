import React, { useContext } from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { ErrorList } from "./MainPage"

const context = {
    errors: [],
    setErrors: null,
    setOpen: false
}

export function HandleError(err, comp) {
    if (err instanceof Error) {
        if (err.response) {
            if (err.response.status === 404) {
                context.setErrors([...context.errors, "error 404 page not found " + comp + " " + Date(Date.now()).toString()])
            } else if (err.response.status === 500) {
                context.setErrors([...context.errors, "500 Internal Server Error \n" + err.response.headers.reason + " " + comp + " "+ Date(Date.now()).toString()])
            } else {
                context.setErrors([...context.errors, err.response.headers.reason + " " + comp + " " + Date(Date.now()).toString()])
            }
        } else if (err.request) {
            context.setErrors([...context.errors, "Not respond from server " + comp + " " + Date(Date.now()).toString()])
        } else {
            context.setErrors([...context.errors, err.message + " " + comp + " " + Date(Date.now()).toString()])
        }
    } else {
        context.setErrors([...context.errors, err + " " + Date(Date.now()).toString()])
    }
    context.setOpen(true)   
}

function ErrorAlert() {
    //const [open, setOpen] = useState(false)
    const [ errors, setErrors, open, setOpen ]  = useContext(ErrorList)
    const msg = errors[errors.length - 1]
    context.setErrors = setErrors
    context.errors = errors
    context.setOpen = setOpen

    // useEffect(() => {
    //     errors.length > 0 && setOpen(true)
    // }, [errors])

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
                    {msg}
                </ MuiAlert>
            </Snackbar>
        </>
    )
}

export default ErrorAlert
