import React, { useState } from 'react'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { Button, TableRow, TableCell, Grid, IconButton, Collapse, Box, Typography, Card, CardContent, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { paPerson, paTitles, onDel, setload, paLoading, save, setErr } = props
    const [person, setPerson] = useState(paPerson)
    const [expand, setExpand] = useState(false)
    const [edit, setEdit] = useState(false)
    const classes = useRowStyles();

    const editCheck = () => {
        if (
            paPerson.firstName === person.firstName &&
            paPerson.lastName === person.lastName &&
            paPerson.leadEmails === person.leadEmails &&
            paPerson.email === person.email &&
            paPerson.username === person.username &&
            paPerson.description === person.description
        ) {
            return 1
        } else if (
            person.firstName === "" |
            person.lastName === "" |
            person.leadEmails === "" |
            person.email === "" |
            person.username === "" |
            person.description === ""
        ) {
            return 2
        }
        return 3
    }

    const saveData = () => {
        switch (editCheck()) {
            case 1:
                setErr("For edit you need to change at least one value", "error")
                break;
            case 2:
                setErr("Fill all the fields", "error")
                break;
            default:
                setExpand(false)
                setEdit(false)
                setload(false)
                save(person)
                break;
        }
    }

    return (
        <>
            {edit ?
                <>
                    <TableRow>
                        <TableCell colSpan={paTitles.length + 1}>
                            <Card>
                                <CardContent>
                                    <Grid
                                        container
                                        direction="column"
                                        alignItems="center"
                                    >
                                        <Grid
                                            item
                                            container
                                            direction="row"
                                            justify="center"
                                            spacing={1}
                                        >
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="name"
                                                    variant="outlined"
                                                    value={person.firstName}
                                                    margin="dense"
                                                    onChange={(event) => setPerson({ ...person, firstName: event.target.value })}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="surname"
                                                    variant="outlined"
                                                    value={person.lastName}
                                                    margin="dense"
                                                    onChange={(event) => setPerson({ ...person, lastName: event.target.value })}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="address"
                                                    variant="outlined"
                                                    value={person.email}
                                                    margin="dense"
                                                    onChange={(event) => setPerson({ ...person, email: event.target.value })}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="city"
                                                    variant="outlined"
                                                    value={person.leadEmails}
                                                    margin="dense"
                                                    onChange={(event) => setPerson({ ...person, leadEmails: event.target.value })}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="post c."
                                                    variant="outlined"
                                                    value={person.description}
                                                    margin="dense"
                                                    onChange={(event) => setPerson({ ...person, description: event.target.value })}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="phone"
                                                    variant="outlined"
                                                    value={person.username}
                                                    margin="dense"
                                                    onChange={(event) => setPerson({ ...person, username: event.target.value })}
                                                />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Button
                                                    fullWidth
                                                    onClick={() => { saveData() }}
                                                    color="primary"
                                                    variant="contained"
                                                >
                                                    Save
                                                </Button>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Button
                                                    fullWidth
                                                    onClick={() => { setEdit(false); setload(false); setExpand(false) }}
                                                    color="primary"
                                                    variant="contained"
                                                >
                                                    Back
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </TableCell>
                    </TableRow>
                </>
                :
                <>
                    <TableRow className={classes.root} >
                        <TableCell >
                            <IconButton size="small" onClick={() => setExpand(!expand)} disabled={paLoading}>
                                {expand ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                        </TableCell>
                        {paTitles.map((data) => <TableCell key={data.field}>{paPerson[data.field]}</TableCell>)}
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={paTitles.length + 1}>
                            <Collapse in={expand} timeout="auto" unmountOnExit>
                                <Box margin={1}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        Details
                                    </Typography>
                                    <Card>
                                        <CardContent>
                                            <Grid
                                                container
                                                spacing={2}
                                                direction="row"
                                                justify="center"
                                                alignItems="center"
                                            >
                                                <Grid item xs={5}>
                                                    <Typography >
                                                        Adress: {paPerson?.email}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <Typography >
                                                        City: {paPerson?.leadEmails}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <IconButton onClick={() => onDel(paPerson.id)} disabled={paLoading}>
                                                        <DeleteOutlinedIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <Typography >
                                                        Postal code: {paPerson?.description}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <Typography >
                                                        phone num.: {paPerson?.username}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <IconButton onClick={() => { setEdit(true); setload(true) }} disabled={paLoading}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </>
            }
        </>
    )
}

export default Row
