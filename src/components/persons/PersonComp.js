import React from 'react'
import { Card, Typography, CardContent, CardMedia, IconButton } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

function PersonComp({person, onDel}) {
    const {id, name, surname, address, city, post, phone} = person 
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
                Postal code: {post}
              </Typography>
              <Typography>
                Phone num.: {phone}
              </Typography>
            </CardContent>
            <IconButton onClick={() => onDel(id)}>
              <DeleteOutlinedIcon />
            </IconButton>             
            
          </Card>
        </div>
    )
}

export default PersonComp
