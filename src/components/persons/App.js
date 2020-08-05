import React, { useState, useEffect } from 'react';
import InputForm from './InputForm';
import { Grid } from '@material-ui/core';
import PersonComp from './PersonComp';
import Axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom';

function App() {
  const [personList, setPersonList] = useState([])
  const [open, setOpen] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [typeErr, setTypeErr] = useState("error")
  const [loading, setLoading] = useState(true)
  const [err404, seterr404] = useState(false)

  const addCheck = (person) => {
    return (
      person.name !== "" &&
      person.surname !== "" &&
      person.city !== "" &&
      person.address !== "" &&
      person.phone !== "" &&
      person.postC !== ""
    )
  }

  const handleError = (err) => {
    setTypeErr("error")
    if (err.response) {
      if (err.response.status === 404) {
        seterr404(true)
      } else if (err.response.status === 500) {
        setErrMsg("500 Internal Server Error \n" + err.response.headers.reason)
        setOpen(true)
      } else {
        setErrMsg(err.response.headers.reason)
        setOpen(true)
      }
    } else if (err.request) { 
      setErrMsg("Not respond from server")
      setOpen(true)
    } else {
      setErrMsg(err.message)
      setOpen(true)
    }
    setLoading(false)
  }
  
 

  const reload = () => {
    setLoading(true)
    Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/users")
      .then(
        dat => setPersonList(
          dat.data.map(user => {
            let tmp = {
              name: user.firstName,
              surname: user.lastName,
              address: user.email,
              phone: user.username,
              city: user.leadEmails,
              postC: user.description,
              id: user.id
              }
            return tmp
          })
        ),
        setTimeout(() => {setLoading(false)}, 800),
      )
      .catch(err => handleError(err))
  }

  const add = (person) => {
    setLoading(true)
    if(addCheck(person)) {
      Axios.post("http://192.168.0.61:9011/UAM/rest/applications/7289/users", { 
        "firstName": person.name,
        "lastName": person.surname,
        "email": person.address,
        "username": person.phone,
        "leadEmails": person.city,
        "description": person.postC,
        "password": person.postC,
        "createdBy": "martin"
      })
      .then(() => { 
        reload(setPersonList)
        setTypeErr("success")
        setErrMsg("Person added")
        setOpen(true) 
      })
      .catch(err => handleError(err))
    } else {
      setTypeErr("error")
      setErrMsg("Fill all fields !!")
      setOpen(true)
      setLoading(false)
    }     
  }

  const deleteHandler = (indx) => {
    setLoading(true)
    Axios.delete("http://192.168.0.61:9011/UAM/rest/applications/7289/users/" + indx)
    .then(() => { 
      reload(setPersonList)
      setTypeErr("success")
      setErrMsg("Person deleted")
      setOpen(true) 
    })
    .catch(err => handleError(err))
    setPersonList(personList.filter(i => i.id !== indx))
  }

  const editHandler = (person) => {
    setLoading(true)
    Axios.put("http://192.168.0.61:9011/UAM/rest/applications/7289/users", {
      "id": person.id, 
      "firstName": person.name,
      "lastName": person.surname,
      "email": person.address,
      "username": person.phone,
      "leadEmails": person.city,
      "description": person.postC,
      "password": person.postC,
      "createdBy": "martin"
    }).then(() => { 
        reload(setPersonList)
        setTypeErr("success")
        setErrMsg("Person edited")
        setOpen(true) 
      })
      .catch(err => handleError(err))
  }
  
  useEffect(() => {
    reload()
    setInterval(() => reload(), 50000)  
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  if (err404) {
    return <Redirect to="*"/>
  }

  return (
    <div className="App" >
      <Navbar />   
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center"}}
      >
        <MuiAlert 
          onClose={handleClose} 
          variant="filled" 
          severity={typeErr}
        >
          {errMsg}
        </ MuiAlert>
      </Snackbar>
      <InputForm addP={!loading ? add : null} loading={loading}/>
      <Grid 
        container
        spacing={5}
        direction="row"
        justify="flex-start"
        alignItems="baseline"
        style= {{margin: "10px"}}
      >
      {personList.map(tmp =>
        <Grid item key={tmp.id}> 
          <PersonComp
          key={tmp.id}
          paPerson={tmp} 
          onDel={!loading ? deleteHandler : null}
          loading={loading}
          edit={!loading ? editHandler : null}
          setload={setLoading}
          save={editHandler}
          errmsg={setErrMsg}
          errtype={setTypeErr}
          open={setOpen}
          />
        </Grid>
      )}  
      </Grid>     
    </div>
  )
}

export default App;
