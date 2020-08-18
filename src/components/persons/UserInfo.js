import React, { useState, useEffect, useContext } from 'react'
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import ErrorAlert from "./ErrorAlert"
import { HandleError as handleError} from "./ErrorAlert"

function UserInfo() {
    const [position, setPosition] = useState("")
    const [data, setData] = useState("")
    const [length, setLength] = useState(0)
    const [change, setChange] = useState(false)

    const getUserOnIndex = (position) => {
        setChange(true)
        if(position => 0 && position < length) {
            Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/users")
            .then(res => { return res.data[position].id })
            .then(id => Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/users/" + id))
            .then(res => {setData(res.data)/*; console.log(user.data)*/})
            .catch(err => handleError(err, "UserInfo"))
        } else {
            handleError("wrong index for user !!! User info Comp " + Date(Date.now()).toString(), "UserInfo")
        }   
    }

    useEffect(() => {
        Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/users")
        .then(res => setLength(res.data.length))
        .catch(err => handleError(err, "UserInfo"))
        return setChange(false)
    }, [change])

    return (
        <>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}
                style={{margin: '2em'}}
            >   
                <Grid item xs={4}>
                    <TextField 
                        value={position}
                        label={"position 1-" + length} 
                        variant="outlined"
                        onChange={(event) => setPosition(event.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button 
                        color="primary"
                        fullWidth
                        variant="contained"
                        onClick={() => getUserOnIndex(position - 1)}
                    >
                        Get person
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Link to="/MartinPodhora/YTtutorials.git" style={{textDecoration: "none"}}>
                        <Button
                            color="primary"
                            variant="contained"
                            style={{marginLeft: '2em'}}
                        >
                            back
                        </Button>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={7}
                >
                    <Paper 
                        elevation={2}
                        color="primary"
                    >
                        <Typography>
                            created: {data.created}
                        </Typography>
                        <Typography>
                            created by: {data.createdBy}
                        </Typography>
                        <Typography>
                            firstName: {data.firstName}
                        </Typography>
                        <Typography>
                            lastName: {data.lastName}
                        </Typography>
                        <Typography>
                            phone: {data.username}
                        </Typography>
                        <Typography>
                            address: {data.email}
                        </Typography>
                        <Typography>
                            post num.: {data.description}
                        </Typography>
                        <Typography>
                            team: {data.myteam}
                        </Typography>                        
                    </Paper>
                </Grid>
            </Grid>
            <ErrorAlert />          
        </>
    )
}

export default UserInfo
