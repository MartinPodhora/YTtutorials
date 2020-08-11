import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Axios from 'axios';

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
            .then(user => {setData(user.data); console.log(user.data)})
            .catch(err => alert(err))
        } else {
            alert("wrong index for user")
        }   
    }

    useEffect(() => {
        Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/users")
        .then(res => setLength(res.data.length))
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
                        onChange={(value) => setPosition(value.target.value)}
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
        </>
    )
}

export default UserInfo
