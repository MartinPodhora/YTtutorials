import React, { useState} from 'react'
import { Card, Typography, CardContent, CardMedia, IconButton, Button, TextField, Grid } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';

function PersonComp({paPerson, onDel, loading, setload, save, setErr, open}) {
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
        setErr({ msg: "For edit you need to change at least one value", type: "error"})
        open(true) 
        break;
      case 2:
        setErr({ msg: "Fill all the fields", type: "error"})
        open(true)
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
                        onChange={val => setPerson({...person, firstName: val.target.value})}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="surname"
                        variant="outlined"
                        value={person.lastName}
                        margin="dense"
                        onChange={val => setPerson({...person, lastName: val.target.value})}
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
                        onChange={val => setPerson({...person, email: val.target.value})}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="city"
                        variant="outlined"
                        value={person.leadEmails}
                        margin="dense"
                        onChange={val => setPerson({...person, leadEmails: val.target.value})}
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
                        onChange={val => setPerson({...person, description: val.target.value})}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="phone"
                        variant="outlined"
                        value={person.username}
                        margin="dense"
                        onChange={val => setPerson({...person, username: val.target.value})}
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

export default PersonComp
