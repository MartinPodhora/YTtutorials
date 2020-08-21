import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'

function Page404() {
    return (
        <div style={{justifyContent:"center"}}>
            <Grid
                container
                direction="row" 
                justify="center" 
                alignItems="center"
            >
                <Grid item xs={7}>
                    <h1>
                        ERROR 404
                    </h1>
                </Grid>
                <Grid item xs={7}>
                    <p>
                        page you looking for was not found 
                    </p>
                </Grid>
                <Grid item xs={7}>
                    <Link to="/MartinPodhora/YTtutorials.git">
                        Back to App 
                    </Link>
                </Grid>
            </Grid>       
        </div>
    )
}

export default Page404
