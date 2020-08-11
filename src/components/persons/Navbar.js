import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Hidden, ListItemIcon, Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: "inherit"},
  link: { 
    textDecoration: "none",
    color: theme.palette.text.primary
  }
}))

const Navbar = (props) => {
  const {login, logged, load} = props
  const classes = useStyles();
  const [opened, setOpened] = useState(false)

  return (
    <>     
      <AppBar position="sticky" elevation={0} >
        <Toolbar>
          <IconButton color="inherit" onClick={() => {setOpened(true); load(true)}}>
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

      <div style={{display: "flex"}}>
        <Drawer
          style={{width: "200px"}}
          variant="persistent"
          anchor="left"
          open={opened}
          classes={{ paper: classes.drawerPaper}}
        >
          <List>
            <Link to="/MartinPodhora/YTtutorials.git" className={classes.link}>
              <ListItem button onClick={() => {setOpened(false); load(false)}}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home page"}/>
              </ListItem>
            </Link>
            <Link to="/login" className={classes.link}>
              <ListItem button onClick={() => setOpened(false)}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary={"Log in"}/>
              </ListItem>
            </Link>
            <Link to="/gui" className={classes.link}>
              <ListItem button onClick={() => setOpened(false)}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Gui"}/>
              </ListItem>
            </Link>
            <Link to="/userInfo" className={classes.link}>
              <ListItem button onClick={() => setOpened(false)}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary={"User info detail"}/>
              </ListItem>
            </Link>               
          </List>
        </Drawer>        
      </div>      
    </>
  )
}

export default Navbar;