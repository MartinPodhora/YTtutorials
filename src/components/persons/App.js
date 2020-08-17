import React, { useState, useEffect, useMemo, useContext } from 'react';
import InputForm from './InputForm';
import { Grid } from '@material-ui/core';
import PersonComp from './PersonComp';
import Axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom';
import { useError } from "./useError.js"
import { ErrorList } from "./MainPage"
import ErrorAlert from "./ErrorAlert"

function App() {
  const [personList, setPersonList] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [err404, seterr404] = useState(false)
  const [Error, setError] = useError("","error", setOpen)
  const [errors, setErrors] = useContext(ErrorList)

  console.log(errors)

  const setSnackbar = (paMsg, paType) => { 
    setError({msg: paMsg, type: paType})
  }

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
    if (err.response) {
      if (err.response.status === 404) {
        setErrors([...errors, "error 404 " + Date.now()])
        seterr404(true)
      } else if (err.response.status === 500) {
        //setSnackbar("500 Internal Server Error \n" + err.response.headers.reason, "error")
        setErrors([...errors, "500 Internal Server Error \n" + err.response.headers.reason + " " + Date.now()])
      } else {
        //setSnackbar(err.response.headers.reason, "error")
        setErrors([...errors, err.response.headers.reason + " " + Date.now()])
      }
    } else if (err.request) {
      setErrors([...errors, "Not respond from server " + Date.now()]) 
      //setSnackbar("Not respond from server", "error")
    } else {
      setErrors([...errors, err.message + " " + Date.now()]) 
      //setSnackbar(err.message, "error")
    }
    setLoading(false)
  }

  const reload = () => {
    setLoading(true)
    Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/users")
    .then(res => setPersonList(res.data))
    .catch(err => handleError(err))
    .finally(() => setTimeout(() => {setLoading(false)}, 500))
    console.log("reloaded data")
    return personList
  }

  const add = (person) => {
    setLoading(true)
    if(addCheck(person)) {
      Axios.post("http://192.168.0.61:9011/UAM/rest/applications/7289/users", {...person, createdBy: "Martin Podhora"})
      .then(() => { 
        reload()
        setSnackbar("Person added", "success")
      })
      .catch(err => handleError(err))
    } else {
      setSnackbar("Fill all fields !!", "error")
      setLoading(false)
    }     
  }

  const deleteHandler = (indx) => {
    setLoading(true)
    Axios.delete("http://192.168.0.61:9011/UAM/rest/applications/7289/users/" + indx)
    .then(() => { 
      reload()
      setSnackbar("Person deleted", "success")
    })
    .catch(err => handleError(err))
  }

  const editHandler = (person) => {
    setLoading(true)
    Axios.put("http://192.168.0.61:9011/UAM/rest/applications/7289/users", {...person, createdBy: "Martin Podhora", additionalData: []})
    .then(() => {
      reload()
      setSnackbar("Person edited", "success")
    })
    .catch(err => handleError(err))
  }

  const multiDelete = (ids) => {
    setLoading(true)
    let resArray = ids.map(id => Axios.delete("http://192.168.0.61:9011/UAM/rest/applications/7289/users/" + id))
    Promise.allSettled(resArray)
    .then(res => {
      res.map((obj, i) => {obj.status === "fulfilled" ? 
        setTimeout(() => {
          setSnackbar("person with id " + ids[i] + " delted", "success")
        }, (i * 3000))
        :
        setTimeout(() => {
          setSnackbar("person with id " + ids[i] + " error: " + obj.reason.response.headers.reason, "error")
        }, (i * 3000))       
      })
      reload() 
    })  
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
          setErr={setSnackbar}
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
      {/* <Snackbar 
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
      </Snackbar> */}
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
      <ErrorAlert/>     
    </div>
  )
}

export default App;
