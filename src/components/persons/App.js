import React, { useState, useEffect, useMemo } from 'react';
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
  const [loading, setLoading] = useState(true)
  const [err404, seterr404] = useState(false)
  const [Error, setError] = useState({
    msg: "",
    type: "error"
  })

  const addCheck = (person) => {
    return (
      person.firstName !== "" &&
      person.secondName !== "" &&
      person.leadEmails !== "" &&
      person.email !== "" &&
      person.username !== "" &&
      person.description !== ""
    )
  }

  const handleError = (err) => {
    setError({...Error, type: "error"})
    if (err.response) {
      if (err.response.status === 404) {
        seterr404(true)
      } else if (err.response.status === 500) {
        setError({...Error, msg: "500 Internal Server Error \n" + err.response.headers.reason})
        setOpen(true)
      } else {
        setError({...Error, msg: err.response.headers.reason})
        setOpen(true)
      }
    } else if (err.request) { 
      setError({...Error, msg:"Not respond from server"})
      setOpen(true)
    } else {
      setError({...Error, msg: err.message})
      setOpen(true)
    }
    setLoading(false)
  }

  const reload = () => {
    setLoading(true)
    Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/users")
    .then(
      res => setPersonList(res.data),
      setTimeout(() => {setLoading(false)}, 800)
    )
    .catch(err => handleError(err))
    console.log("reloaded data")
    return personList
  }

  const add = (person) => {
    setLoading(true)
    if(addCheck(person)) {
      Axios.post("http://192.168.0.61:9011/UAM/rest/applications/7289/users", {...person, createdBy: "Martin Podhora"})
      .then(() => { 
        reload()
        setError({ msg: "Person added", type: "success"})
        setOpen(true) 
      })
      .catch(err => handleError(err))
    } else {
      setError({ msg: "Fill all fields !!", type: "error"})
      setOpen(true)
      setLoading(false)
    }     
  }

  const deleteHandler = (indx) => {
    setLoading(true)
    Axios.delete("http://192.168.0.61:9011/UAM/rest/applications/7289/users/" + indx)
    .then(() => { 
      reload()
      setError({ msg: "Person deleted", type: "success"})
      setOpen(true) 
    })
    .catch(err => handleError(err))
  }

  const editHandler = (person) => {
    setLoading(true)
    Axios.put("http://192.168.0.61:9011/UAM/rest/applications/7289/users", {...person, createdBy: "Martin Podhora", additionalData: []})
    .then(() => {
      reload()
      setError({ msg: "Person edited", type: "success"})
      setOpen(true) 
    })
    .catch(err => handleError(err))
  }

  const multiDelete = (ids) => {
    setLoading(true)
    let resArray = ids.map(id => Axios.delete("http://192.168.0.61:9011/UAM/rest/applications/7289/users/" + id))
    Promise.allSettled(resArray)
    .then(tmp => {
      setLoading(false)
      tmp.map((obj, i) => {obj.status === "fulfilled" ? 
        setTimeout(() => {
          setError({ msg: "person with id " + ids[i] + " delted", type: "success"})
          setOpen(true)
        }, (i * 3000))
        :
        setTimeout(() => {
          setError({ msg: "person with id " + ids[i] + " error: " + obj.reason.response.headers.reason, type: "error"});
          setOpen(true)
        }, (i * 3000))       
      })
    })
    reload()  
  }
  
  useEffect(() => {
    reload()
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const personData = useMemo(() => {
    console.log("rendered list"); 
    return personList.map(tmp =>
      <Grid item key={tmp.id}> 
        <PersonComp
          key={tmp.id}
          paPerson={tmp} 
          onDel={!loading ? deleteHandler : null}
          loading={loading}
          edit={!loading ? editHandler : null}
          setload={setLoading}
          save={editHandler}
          setErr={setError}
          open={setOpen}
        />
      </Grid>
    )}, [loading]
  )

  if (err404) {
    return <Redirect to="*"/>
  }

  return (
    <div className="App" >
      <Navbar 
        load={setLoading}
      />   
      <Snackbar 
        open={open} 
        autoHideDuration={5000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center"}}
      >
        <MuiAlert 
          onClose={handleClose} 
          variant="filled" 
          severity={Error.type}
        >
          {Error.msg}
        </ MuiAlert>
      </Snackbar>
      <InputForm 
        addP={!loading ? add : null} 
        loading={loading} 
        handleDelete={multiDelete}
      />
      <Grid 
        container
        spacing={5}
        direction="row"
        justify="flex-start"
        alignItems="baseline"
        style= {{margin: "10px"}}
      >
      {personData}  
      </Grid>     
    </div>
  )
}

export default App;
