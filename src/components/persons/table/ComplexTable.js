import React, { useState, useEffect, createContext } from 'react'
import { Link } from 'react-router-dom';
import { Button, TableContainer, Paper, Table, TableRow, TableCell, TableHead, TableBody, Grid, TableFooter, TableSortLabel, TablePagination} from '@material-ui/core';
import Axios from 'axios';
import Paggination from "./Paggination"
import Row from "./Row"
import { HandleError as handleError } from "../ErrorAlert"

export const editContext = createContext()

function ComplexTable() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [sort, setSort] = useState({ indx: 0, asc: false })
    const [persons, setPersons] = useState([])
    const [loading, setLoading] = useState(true)

    let titles = [
        { title: 'First name', field: 'firstName' },
        { title: 'Last name', field: 'lastName' },
        { title: 'ID', field: 'id' }
    ]

    const reload = () => {
        setLoading(true)
        Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/users")
        .then(res => setPersons(res.data))
        .catch(err => handleError(err, "Table"))
        .finally(() => setLoading(false))
        console.log("reloaded data")
        return persons
    }

    useEffect(() => {
        reload()
    }, [])

    const deleteHandler = (indx) => {
        setLoading(true)
        Axios.delete("http://192.168.0.61:9011/UAM/rest/applications/7289/users/" + indx)
        .then(() => {
            reload()
        })
        .catch(err => handleError(err, "Table"))
    }

    const editHandler = (person) => {
        setLoading(true)
        Axios.put("http://192.168.0.61:9011/UAM/rest/applications/7289/users", {...person, createdBy: "Martin Podhora", additionalData: []})
        .then(() => {
          reload()
        })
        .catch(err => handleError(err, "Table"))
      }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }

    const sortPersons = (byWhat, direction) => persons.sort((a, b) => (a[byWhat] === b[byWhat] ? 0 : (a[byWhat] > b[byWhat] ? -1 : 1)) * (direction ? -1 : 1))
    const sortedPersons = sortPersons(titles[sort.indx].field, sort.asc)
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, persons.length - page * rowsPerPage);
    
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
