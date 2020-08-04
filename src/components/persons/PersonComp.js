import React from 'react'
import { Card, Typography, CardContent, CardMedia, IconButton } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';

function PersonComp({person, onDel, edit}) {
    const {id, name, surname, address, city, postC, phone} = person 
    return (
        <div>
          <Card>
            <CardMedia image="./person.png" />
            <CardContent>
              <Typography variant="h5" component="h5">
                {name} {surname}
              </Typography>
              <Typography>
                Adress: {address}
              </Typography>
              <Typography>
                City: {city}
              </Typography>
              <Typography>
                Postal code: {postC}
              </Typography>
              <Typography>
                Phone num.: {phone}
              </Typography>
            </CardContent>
            <IconButton onClick={() => onDel(id)}>
              <DeleteOutlinedIcon />
            </IconButton>             
            <IconButton obClic={() => edit(id)}>
              <EditIcon />
            </IconButton>
          </Card>
        </div>
    )
}

export default PersonComp
