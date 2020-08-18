import React, { useState, useContext} from 'react'
import { Card, Typography, CardContent, CardMedia, IconButton, Button, TextField, Grid } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types'
import { HandleError as handleError } from "./ErrorAlert"


function PersonComp({paPerson, onDel, loading, setload, save}) {
  const [edit, setEdit] = useState(false)
  const [person, setPerson] = useState(paPerson)

  const styleButton = {
    marginLeft: "20px"
  }

  const editCheck = () => {
    if(
      paPerson.firstName === person.firstName &&
      paPerson.lastName === person.lastName &&
      paPerson.leadEmails === person.leadEmails &&
      paPerson.email === person.email &&
      paPerson.username === person.username &&
      paPerson.description === person.description
    ) {
      return 1
    } else if (
      person.firstName === "" |
      person.lastName === "" |
      person.leadEmails === "" |
      person.email === "" |
      person.username === "" |
      person.description === ""
    ) {
      return 2
    } 
    return 3
  }

  const saveData = () => {
    switch (editCheck()) {
      case 1:
        handleError("For edit you need to change at least one value " + Date(Date.now()).toString() ,"Person component")
        break;
      case 2:
        handleError("Fill all the fields !!! " + Date(Date.now()).toString() ,"Person component")
        break;  
      default:
        setEdit(false)
        setload(false)
        save(person)
        break;
    }
  }

  return (
    <div>
      <Card>
        <CardMedia image="./person.png" />
        <CardContent>
          {!edit ? 
            <>
              <Typography variant="h5" component="h5" >
                {person?.firstName} {person?.lastName}
              </Typography>
              <Typography >
                Adress: {person?.email}
              </Typography>
              <Typography >
                City: {person?.leadEmails}
              </Typography>
              <Typography >
                Postal code: {person?.description}
              </Typography>
              <Typography >
                Phone num.: {person?.username}
              </Typography>
              <Typography >
                ID: {person?.id}
              </Typography>
            </>
            :
            <>
              <Typography component={'span'}>
                <Grid
                  container
                  direction="column"
                >
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={1}
                  >
                    <Grid item xs={6}>
                      <TextField
                        label="name"
                        variant="outlined"
                        value={person.firstName}
                        margin="dense"
                        onChange={(event) => setPerson({...person, firstName: event.target.value})}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="surname"
                        variant="outlined"
                        value={person.lastName}
                        margin="dense"
                        onChange={(event) => setPerson({...person, lastName: event.target.value})}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={1}
                  >
                    <Grid item xs={6}>
                      <TextField
                        label="address"
                        variant="outlined"
                        value={person.email}
                        margin="dense"
                        onChange={(event) => setPerson({...person, email: event.target.value})}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="city"
                        variant="outlined"
                        value={person.leadEmails}
                        margin="dense"
                        onChange={(event) => setPerson({...person, leadEmails: event.target.value})}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={1}
                  >
                    <Grid item xs={6}>
                      <TextField
                        label="post c."
                        variant="outlined"
                        value={person.description}
                        margin="dense"
                        onChange={(event) => setPerson({...person, description: event.target.value})}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="phone"
                        variant="outlined"
                        value={person.username}
                        margin="dense"
                        onChange={(event) => setPerson({...person, username: event.target.value})}
                      />
                    </Grid>
                  </Grid>
                </Grid>                   
              </Typography>
            </>
          }
        </CardContent>

        <IconButton onClick={() => onDel(person.id)} disabled={loading}>
          <DeleteOutlinedIcon />
        </IconButton>

        <IconButton onClick={() => {setEdit(true); setload(true)}} disabled={loading}>
          <EditIcon />
        </IconButton>
        
        {edit &&
        <>
          <Button 
            onClick={() => saveData()} 
            color="primary" 
            variant="contained"
            style={styleButton}
          >
            Save
          </Button>
          <Button
            onClick={() => {setEdit(false); setload(false)}}
            color="primary" 
            variant="contained"
            style={styleButton}
          >
            Back
          </Button>
        </>           
        }
      </Card>
    </div>
  )
}

PersonComp.propTypes = {
  paPerson: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    leadEmails: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    description: PropTypes.string
  })
}

export default PersonComp
