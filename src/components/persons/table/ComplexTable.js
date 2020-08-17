import React, { useState, useEffect, createContext } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Button, TableContainer, Paper, Table, TableRow, TableCell, TableHead, TableBody, Grid, TableFooter, TableSortLabel, TablePagination, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';
import Paggination from "./Paggination"
import Row from "./Row"
import { useError } from "../useError.js"

export const editContext = createContext()

function ComplexTable() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [sort, setSort] = useState({ indx: 0, asc: false })
    const [persons, setPersons] = useState([])
    const [loading, setLoading] = useState(true)
    const [err404, seterr404] = useState(false)
    const [open, setOpen] = useState(false)
    const [Error, setError] = useError("","error", setOpen)

    let titles = [
        { title: 'First name', field: 'firstName' },
        { title: 'Last name', field: 'lastName' },
        { title: 'ID', field: 'id' }
    ]

    const setSnackbar = (paMsg, paType) => {
        setError({ msg: paMsg, type: paType })
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
            .finally(() => setTimeout(() => { setLoading(false) }, 500))
        console.log("reloaded data")
        return persons
    }

    useEffect(() => {
        reload()
    }, [])

    const handleClose = () => {
        setOpen(false)
    }

    const deleteHandler = (indx) => {
        setLoading(true)
        Axios.delete("http://192.168.0.61:9011/UAM/rest/applications/7289/users/" + indx)
            .then(() => {
                reload()
                setSnackbar("Person deleted", "success")
            })
            .catch(err => handleError(err))
    }

    const editHandler = (person) => {

        setLoading(true)
        Axios.put("http://192.168.0.61:9011/UAM/rest/applications/7289/users", {...person, createdBy: "Martin Podhora", additionalData: []})
        .then(() => {
          reload()
          setSnackbar("Person edited", "success")
        })
        .catch(err => handleError(err))
      }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }

    const sortPersons = (byWhat, direction) => persons.sort((a, b) => (a[byWhat] === b[byWhat] ? 0 : (a[byWhat] > b[byWhat] ? -1 : 1)) * (direction ? -1 : 1))
    const sortedPersons = sortPersons(titles[sort.indx].field, sort.asc)
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, persons.length - page * rowsPerPage);

    if (err404) {
        return <Redirect to="*" />
    }

    

    return (
        <>
            <Link to="/MartinPodhora/YTtutorials.git" style={{ textDecoration: "none" }}>
                <Button
                    color="primary"
                    variant="contained"
                    style={{ margin: '3em' }}
                >
                    back
                </Button>
            </Link>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
                style={{ marginTop: '1em' }}
            >
                <Grid item xs={10} md={8} lg={6}>
                    <TableContainer component={Paper}>
                        <Table style={{ minWidth: '500px' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell />

                                    {titles.map((data, i) => {
                                        return (
                                            <>
                                                <TableCell key={i}>
                                                    <TableSortLabel
                                                        active={i === sort.indx}
                                                        direction={sort.asc ? "asc" : "desc"}
                                                        onClick={() => loading ? null : setSort({ indx: i, asc: !sort.asc })}
                                                    >
                                                        {data.title}
                                                    </TableSortLabel>
                                                </TableCell>
                                            </>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(sortedPersons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
                                    .map((person) => {
                                        return (
                                            <editContext.Provider
                                                value={{
                                                    paPerson: person,
                                                    paTitles: titles,
                                                    setload: setLoading,
                                                    paLoading: loading,
                                                    onDel: deleteHandler,
                                                    save: editHandler,
                                                    setErr: setSnackbar,
                                                }}                                     
                                            >
                                                <Row key={person.id}/>
                                            </editContext.Provider>
                                        )
                                    })}

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={titles.length} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter >
                                <TableRow >
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 15, 20, { label: 'All', value: persons.length }]}
                                        colSpan={titles.length}
                                        count={persons.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={(newPage) => setPage(newPage)}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={Paggination}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    )
}

export default ComplexTable
