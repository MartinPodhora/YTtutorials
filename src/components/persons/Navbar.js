import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Hidden } from '@material-ui/core'
import { Link } from 'react-router-dom';
//import { Button, Drawer } from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';
//import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// });

const Navbar = (props) => {
  const {showMenu, login, logged} = props
  // const classes = useStyles();
  

  // const toggleDrawer = (anchor, open) => (event) => {

  // }


  return (
    <>
    <AppBar position="sticky" elevation={0} >
        <Toolbar>
          <IconButton color="inherit" onClick={showMenu}>
            <MenuIcon/>
          </IconButton>
          <Typography type="title" color="inherit" style={{width: '100%', margin: '20px', minWidth: '160px'}}>
            Person info database
          </Typography>
          <Link to="/login" style={{ color: '#FFF' }}>
            <IconButton color="inherit" onClick={login}>
                <AccountCircle/>
            </IconButton>
          </Link>       
          
          <Hidden only="xs">
            <Typography type="title" color="inherit" style={{width: '5%', margin: '20px',  minWidth: '60px'}}>
              {logged ? "logout" : "log in"}
            </Typography>
          </Hidden>       
        </Toolbar>
      </AppBar>



      
    </>
  )
}

/* <Router>
        <div style={{display: "flex"}}>
          <Drawer>
          
          </Drawer>
        </div>
      </Router> */

export default Navbar;