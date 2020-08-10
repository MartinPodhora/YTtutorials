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
      paPerson.name === person.name &&
      paPerson.surname === person.surname &&
      paPerson.city === person.city &&
      paPerson.address === person.address &&
      paPerson.phone === person.phone &&
      paPerson.postC === person.postC
    ) {
      return 1
    } else if (
      person.name === "" |
      person.surname === "" |
      person.city === "" |
      person.address === "" |
      person.phone === "" |
      person.postC === ""
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
                {person?.name} {person?.surname}
              </Typography>
              <Typography >
                Adress: {person?.address}
              </Typography>
              <Typography >
                City: {person?.city}
              </Typography>
              <Typography >
                Postal code: {person?.postC}
              </Typography>
              <Typography >
                Phone num.: {person?.phone}
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
                        value={person.name}
                        margin="dense"
                        onChange={val => setPerson({...person, name: val.target.value})}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="surname"
                        variant="outlined"
                        value={person.surname}
                        margin="dense"
                        onChange={val => setPerson({...person, surname: val.target.value})}
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
                        value={person.address}
                        margin="dense"
                        onChange={val => setPerson({...person, address: val.target.value})}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="city"
                        variant="outlined"
                        value={person.city}
                        margin="dense"
                        onChange={val => setPerson({...person, city: val.target.value})}
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
                        value={person.postC}
                        margin="dense"
                        onChange={val => setPerson({...person, postC: val.target.value})}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="phone"
                        variant="outlined"
                        value={person.phone}
                        margin="dense"
                        onChange={val => setPerson({...person, phone: val.target.value})}
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
