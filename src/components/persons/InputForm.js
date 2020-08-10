import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, InputAdornment } from '@material-ui/core'

function InputForm({addP, loading, handleDelete}) {
    const [Person, setPerson] = useState({
        id: "",
        name: "",
        surname: "",
        address: "",
        city: "",
        postC: "",
        phone: ""
    })

    const [del, setdel] = useState(false)
    const [count, setcount] = useState("")
    const [ids, setids] = useState([])

    useEffect(() => {
        let tmp = []
        for (let i = 0; i < count; i++) {
            tmp[i]=""
        }
        setids(tmp)
        
    }, [count])

    return (
        <React.Fragment>
            <Grid container
                spacing={2}
                direction="column"
                justify="center"
                alignItems="center"
                style={{marginTop: '60px'}}
            >   
                <Grid item xs={1} sm={2} md={3} lg={4} xl={4}>
                </Grid>
                {del ?
                <Grid item xs={10} sm={8} md={6} lg={4} xl={3}>
                    <Grid 
                        container
                        spacing={2}
                        direction="row"
                        alignItems="baseline"              
                    >
                        <Grid 
                            item 
                            xs={12}
                        >
                            <TextField
                                disabled={loading} 
                                fullWidth
                                className="input"
                                label="count of IDs" 
                                variant="outlined"
                                type="number"
                                value={count}
                                onChange={val => setcount(val.target.value)}
                            />
                        </Grid>
                        {ids.map((data, i) => {
                            return <Grid item xs={6}>
                                <TextField 
                                    value={data}
                                    type="number"
                                    variant="outlined"
                                    label={i + ". ID"}
                                    onChange={val => {
                                        let pom = [...ids]
                                        pom[i] = val.target.value
                                        setids(pom)
                                    }}
                                />
                            </Grid>
                        })}
                        {count % 2 === 1 ? <Grid item xs={6}></ Grid>: ""}
                        <Grid 
                            item 
                            xs={4}
                        > 
                            <Button
                                disabled={loading} 
                                color="primary"
                                fullWidth
                                variant="contained"                       
                                onClick={() => handleDelete(ids)}
                            >
                                Delete
                            </Button>
                        </Grid>
                        <Grid 
                            item 
                            xs={4}
                        > 
                            <Button
                                disabled={loading} 
                                color="primary"
                                fullWidth
                                variant="contained"
                                onClick={() => setdel(false)}                       
                            >
                                back
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>                    
                :
                <Grid item xs={10} sm={8} md={6} lg={4} xl={3}>
                    <Grid container
                        spacing={2}
                        direction="row"
                        justify="center"
                        alignItems="baseline"
                    >
                        <Grid item xs={12}>
                            <TextField
                                disabled={loading}
                                fullWidth
                                className="input"
                                label="name"
                                variant="outlined"
                                value={Person.name}
                                onChange={val => setPerson({...Person, name: val.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                disabled={loading} 
                                fullWidth
                                className="input"
                                label="surname" 
                                variant="outlined"
                                value={Person.surname}
                                onChange={val => setPerson({...Person, surname: val.target.value})}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                disabled={loading}
                                fullWidth 
                                className="input"
                                label="address"
                                variant="outlined"
                                value={Person.address}
                                onChange={val => setPerson({...Person, address: val.target.value})}                           
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                disabled={loading}
                                fullWidth 
                                className="input"
                                label="city"
                                variant="outlined"
                                value={Person.city}
                                onChange={val => setPerson({...Person, city: val.target.value})}                              
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                disabled={loading}
                                type="number"
                                fullWidth 
                                className="input"
                                label="postal code"
                                variant="outlined"
                                value={Person.postC}
                                onChange={val => setPerson({...Person, postC: val.target.value})}
                                error = {Person.postC.length > 5}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                disabled={loading}
                                type="number"
                                fullWidth 
                                className="input"
                                label="phone num."
                                variant="outlined"
                                value={Person.phone}
                                onChange={val => setPerson({...Person, phone: val.target.value})}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+421</InputAdornment>,
                                }}
                                error = {Person.phone.length > 9}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Button
                                disabled={loading} 
                                color="primary"
                                fullWidth
                                variant="contained"
                                onClick={() => { 
                                    addP(Person)
                                    setPerson({
                                        name: "",
                                        surname: "",
                                        address: "",
                                        city: "",
                                        postC: "",
                                        phone: ""
                                    })
                                }}
                            >
                                Add Person
                            </Button>
                        </Grid>
                        <Grid item xs={7}>
                            <Button
                                disabled={loading} 
                                color="primary"
                                fullWidth
                                variant="contained"
                                onClick={() => setdel(true)}
                            >
                                Delete Multiple Persons
                            </Button>
                        </Grid>
                    </Grid> 
                </Grid>}
                <Grid item xs={1} sm={2} md={3} lg={4} xl={5}>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default InputForm
