import React, { useState, useContext } from 'react'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { TableRow, TableCell, Grid, IconButton, Collapse, Box, Typography, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { editContext } from "./ComplexTable"
import EditRow from "./EditRow"

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row() {
    let context = useContext(editContext)
    const { paPerson, paTitles, onDel, setload, paLoading } = context
    const [expand, setExpand] = useState(false)
    const [edit, setEdit] = useState(false)
    const classes = useRowStyles();
    
    return (
        <>
            {edit ?
                <>
                    <TableRow>
                        <TableCell colSpan={paTitles.length + 1}>
                            <EditRow expand={setExpand} load={setload} edit={setEdit} />
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
                                                    <IconButton onClick={() => { setEdit(true); setload(true)  }} disabled={paLoading}>
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
