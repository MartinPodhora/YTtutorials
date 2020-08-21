import React from 'react'
import { Grid, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function LoginPage({loading, name, password	}) {
    return (
        <div>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
                style={{marginTop: '60px'}}
            >
                <Grid item >
                    <TextField
                        disabled={loading}
                        fullWidth
                        label="name"
                        variant="outlined"
                        value={name}
                        onChange={(event) => name=event.target.value}
                    />
                </Grid>
                <Grid item >
                    <TextField
                        disabled={loading}
                        fullWidth
                        label="password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(event) => password=event.target.value}
                    />
                </Grid>
                <Grid item >
                    <Button
                        disabled={loading} 
                        color="primary"
                        variant="contained"
                    >
                        log in
                    </Button>
                    <Link to="/MartinPodhora/YTtutorials.git" style={{textDecoration: "none"}}>
                        <Button
                            disabled={loading} 
                            color="primary"
                            variant="contained"
                            style={{marginLeft: '20px'}}
                        >
                            back
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default LoginPage
