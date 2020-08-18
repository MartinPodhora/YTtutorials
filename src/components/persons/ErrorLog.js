import React, {useContext} from 'react'
import { ErrorList } from "./MainPage"
import { Link } from 'react-router-dom';
import { Paper, Typography, Button } from '@material-ui/core'

function ErrorLog() {
    const [ errors ]  = useContext(ErrorList)

    return (
        <div>
            <Link to="/MartinPodhora/YTtutorials.git" style={{textDecoration: "none"}}>
                <Button
                    color="primary"
                    variant="contained"
                    style={{margin: '20px'}}
                >
                    back
                </Button>
            </Link>
            <Paper elevation={3}>
                {errors.map(err => {
                    return (
                        <Typography key={err}>
                            {err}
                        </Typography>
                    )
                })}
            </Paper>  
        </div>
    )
}

export default ErrorLog
