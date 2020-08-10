import React, { useState } from 'react'
import { Grid, TextField, Select, MenuItem, InputLabel, Hidden, Checkbox, FormControlLabel } from '@material-ui/core'

function GUI() {
    const [gender, setgender] = useState("")

    const handleChange = (event) => {
        setgender(event.target.value)
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            spacing={2}
            // style={{margin: "2%", width: "97%"}}
            style={{padding: "10em"}}
        >
            <Grid 
                item
                xs={12}
                lg={6} 
            >
                <TextField label="first name" variant="outlined"/>
            </Grid>
            <Grid 
                item
                xs={12}
                lg={6}
            >
                <TextField label="second name" variant="outlined"/>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <InputLabel >gender</InputLabel>
                <Select 
                    value={gender}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                >
                    <MenuItem value="other"> other </ MenuItem>
                    <MenuItem value="male"> male </ MenuItem>
                    <MenuItem value="female"> female </ MenuItem>
                </Select>
            </Grid>
            <Hidden smDown>
                <Grid 
                    item
                    sm={12}
                >
                    <TextField
                        fullWidth
                        label="description"
                        variant="outlined"
                        multiline
                        rows={5}
                        di
                    />
                </Grid>
            </Hidden>
            <Grid 
                item 
                xs={12} 
                md={3}
            >
                <FormControlLabel
                    control={<Checkbox />}
                    label="Option 1"
                />
            </Grid>
            <Grid 
                item 
                xs={12} 
                md={3}
            >
                <FormControlLabel
                    control={<Checkbox />}
                    label="Option 2"
                />
            </Grid>
            <Grid 
                item 
                xs={12} 
                md={3}
            >
                <FormControlLabel
                    control={<Checkbox />}
                    label="Option 3"
                />
            </Grid>
            <Grid 
                item 
                xs={12} 
                md={3}
            >
                <FormControlLabel
                    control={<Checkbox />}
                    label="Option 4"
                />
            </Grid>
            



        </Grid>
    )
}

export default GUI
