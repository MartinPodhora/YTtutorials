import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, InputAdornment, Checkbox } from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Autocomplete from '@material-ui/lab/Autocomplete';

function InputForm({addP, loading, handleDelete}) {
    const [selectSize, setselectSize] = useState(8)
    const [del, setdel] = useState(false)
    const [count, setcount] = useState("")
    const [ids, setids] = useState([])
    const [Person, setPerson] = useState({
        id: 0,
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        leadEmails: "",
        description: "",
        username: ""
    }) 

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
                                onChange={(event) => setcount(event.target.value)}
                            />
                        </Grid>
                        {ids.map((data, i) => {
                            return <Grid item xs={6} key={i}>
                                <TextField 
                                    value={data}
                                    disabled={loading}
                                    className="input" 
                                    type="number"
                                    variant="outlined"
                                    label={i + ". ID"}
                                    onChange={(event) => {
                                        let tmp = [...ids]
                                        tmp[i] = event.target.value
                                        setids(tmp)
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
                        <Grid item xs={12} lg={6}>
                            <TextField
                                disabled={loading}
                                fullWidth
                                className="input"
                                label="first name"
                                variant="outlined"
                                value={Person.firstName}
                                onChange={(event) => setPerson({...Person, firstName: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                disabled={loading} 
                                fullWidth
                                className="input"
                                label="last name" 
                                variant="outlined"
                                value={Person.lastName}
                                onChange={(event) => setPerson({...Person, lastName: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                disabled={loading}
                                fullWidth 
                                className="input"
                                label="address"
                                variant="outlined"
                                value={Person.email}
                                onChange={(event) => setPerson({...Person, email: event.target.value})}                           
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                disabled={loading}
                                fullWidth 
                                className="input"
                                label="city"
                                variant="outlined"
                                value={Person.leadEmails}
                                onChange={(event) => setPerson({...Person, leadEmails: event.target.value})}                              
                            />
                        </Grid>
                        <Grid item xs={12} md={selectSize}>
                            <Autocomplete
                                multiple
                                options={hobyList}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                renderOption={(option, { selected }) => (
                                    <>
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon/>}
                                        checkedIcon={<CheckBoxIcon/>}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.name}
                                    </>
                                )}
                                renderInput={(params) => {
                                    console.log(params )
                                    params.length > 5 && (setselectSize(12))
                                    return <TextField {...params} variant="outlined"  placeholder="search" />
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <TextField
                                disabled={loading}
                                type="number"
                                fullWidth 
                                className="input"
                                label="postal code"
                                variant="outlined"
                                value={Person.description}
                                onChange={(event) => setPerson({...Person, description: event.target.value})}
                                error = {Person.description.length > 5}
                            />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <TextField
                                disabled={loading}
                                type="number"
                                fullWidth 
                                className="input"
                                label="phone num."
                                variant="outlined"
                                value={Person.username}
                                onChange={(event) => setPerson({...Person, username: event.target.value, password: event.target.value})}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+421</InputAdornment>,
                                }}
                                error = {Person.username.length > 9}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Button
                                disabled={loading} 
                                color="primary"
                                fullWidth
                                variant="contained"
                                onClick={() => { 
                                    addP(Person)
                                    setPerson({
                                        firstName: "",
                                        lastName: "",
                                        email: "",
                                        leadEmails: "",
                                        description: "",
                                        username: ""
                                    })
                                }}
                            >
                                Add Person
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={7}>
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

const hobyList = [
    {name: "Bike"},
    {name: "3D printing"},
    {name: "Acting"},
    {name: "Airsofting"},
    {name: "Audiophilia"},
    {name: "Birdwatching"},
    {name: "Boating"},
    {name: "Driving"},
    {name: "Golfing"},
    {name: "Kites"},
    {name: "Knitting"},
    {name: "Magic"},
    {name: "Locksport"},
    {name: "Model aircraft"},
    {name: "Netball"},
    {name: "Paintball"},
    {name: "Rafting"},
    {name: "Reading"},
    {name: "Squash"},
    {name: "Survival"},
    {name: "Zumba"},
    {name: "Wrestling"},
    {name: "Weightlifting"},
    {name: "Videophilia"},
    {name: "Trekkie"},
    {name: "Tennis"},
    {name: "Soapmaking"},
    {name: "Slacklining"},
    {name: "Shooting"},
    {name: "Railfans"},
    {name: "Pottery"},
    {name: "Piano"},
    {name: "Needlepoint"},
    {name: "Motorcycles"},
    {name: "Microscopy"},
    {name: "Letterboxing"},
    {name: "Leathercrafting"},
    {name: "LARPing"},
    {name: "Jogging"},
    {name: "Hooping"},
    {name: "Hiking"},
    {name: "Gnoming"}
]
export default InputForm
