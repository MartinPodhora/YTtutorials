import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const Navbar = (props) => {
  const {showMenu, login, logged} = props
  const classes = useStyles();
  

  const toggleDrawer = (anchor, open) => (event) => {

  }


  return (
    <>
    <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <IconButton color="contrast" onClick={showMenu}>
            <MenuIcon/>
          </IconButton>
          <Typography type="title" color="inherit" style={{width: '100%', margin: '20px'}}>
            Person info database
          </Typography>       
          <IconButton color="contrast" onClick={login}>
              <AccountCircle/>
          </IconButton>
          <Typography type="title" color="inherit" style={{width: '8%', margin: '20px'}}>
            {logged ? "logout" : "log in"}
          </Typography>
        </Toolbar>
      </AppBar>



      <Router>
        <div style={{display: "flex"}}>
          <Drawer>
          
          </Drawer>
        </div>
      </Router>
    </>
  )
}

export default Navbar;