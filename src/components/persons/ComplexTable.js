import React, { useState, useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Button, TableContainer, Paper, Table, TableRow, TableCell, TableHead, TableBody, Grid, IconButton, TableFooter } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Axios from 'axios';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TablePagination from '@material-ui/core/TablePagination';

const Paggination = (props) => {
    const { count, page, rowsPerPage, onChangePage } = props;

    const handlePrevPage = (event) => {
        onChangePage(event, page - 1)
    }
    
    const handleNextPage = (event) => {
        onChangePage(event, page + 1)
    }
    
    const handleLastPage = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    const handleFirstPage = (event) => {
        onChangePage(event, 0)
    }

    
    return (
        <>
            <IconButton
                onClick={handleFirstPage}
                disabled={page === 0}
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={handlePrevPage}
                disabled={page === 0}
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextPage}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPage}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                <LastPageIcon />
            </IconButton>
        </>
    )
}

function ComplexTable() {
    let titles = [
        { title: 'First name', field: 'firstName' },
        { title: 'Last name', field: 'lastName' },
        { title: 'Address', field: 'email' },
        { title: 'Phone', field: 'username' }
    ]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [persons, setPersons] = useState([])
    const [loading, setLoading] = useState(true)
    const [err404, seterr404] = useState(false)
    const [open, setOpen] = useState(false)
    const [Error, setError] = useState({
        msg: "",
        type: "error"
    })

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, persons.length - page * rowsPerPage);
    
    const setSnackbar = (paMsg, paType) => {
        setError({msg: paMsg, type: paType})
        setOpen(true)
    }


    const handleError = (err) => {
        if (err.response) {
            if (err.response.status === 404) {
            seterr404(true)
            } else if (err.response.status === 500) {
            setSnackbar("500 Internal Server Error \n" + err.response.headers.reason, "error")
            } else {
            setSnackbar(err.response.headers.reason, "error")
            }
        } else if (err.request) { 
            setSnackbar("Not respond from server", "error")
        } else {
            setSnackbar(err.message, "error")
        }
        setLoading(false)
    }

    const reload = () => {
        setLoading(true)
        Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/users")
        .then(res => setPersons(res.data))
        .catch(err => handleError(err))
        .finally(() => setTimeout(() => {setLoading(false)}, 500))
        console.log("reloaded data")
        return persons
    }

    useEffect(() => {
        reload()
    }, [])

    const handleClose = () => {
        setOpen(false)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    if (err404) {
        return <Redirect to="*"/>
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
                    severity={Error.type}
                >
                    {Error.msg}
                </ MuiAlert>
            </Snackbar>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
                style={{marginTop: '60px'}}
            >
                <Grid item xs={10}>
                    <TableContainer component={Paper}>
                        <Table style={{minWidth: '500px'}}>
                            <TableHead>
                                <TableRow>
                                    {titles.map((title) => <TableCell key={title.title}>{title.title}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {persons.map((person) => {
                                    return <TableRow> {
                                        titles.map((title) => <TableCell key={title.title}>{person[title.field]}</TableCell>)}
                                    </TableRow>
                                })}

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={persons.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={(newPage) => setPage(newPage)}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={Paggination}
                                    />
                                </TableRow>
                            </TableFooter>            
                        </Table>   
                    </TableContainer> 
                </Grid>
                <Grid item >
                    <Link to="/MartinPodhora/YTtutorials.git" style={{textDecoration: "none"}}>
                        <Button
                            color="primary"
                            variant="contained"
                            style={{marginLeft: '20px'}}
                        >
                            back
                        </Button>
                    </Link>
                </Grid>

            </Grid>
            
            
            
            
        </>
    )
}

export default ComplexTable
