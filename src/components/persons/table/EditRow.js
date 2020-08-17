import React, { useContext, useState, useEffect, useRef} from 'react'
import { Button, Grid, Card, CardContent, TextField } from '@material-ui/core';
import { editContext } from "./ComplexTable"

function EditRow(props) {
    let context = useContext(editContext)
    const { paPerson, save, setErr, setload } = context
    const { expand, edit} = props
    const [person, setPerson] = useState(paPerson)
    const nameText = useRef()

    useEffect(() => {
        nameText.current.focus()
    }, [])

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
                expand(false)
                edit(false)
                setload(false)
                save(person)
                break;
        }
    }

    return (
        <>
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
                                    inputRef={nameText}
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
                                    onClick={() => { edit(false); setload(false); }}
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
        </>
    )
}

export default EditRow
