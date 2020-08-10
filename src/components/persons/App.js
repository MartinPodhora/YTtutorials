import React, { useState, useEffect, useMemo } from 'react';
import InputForm from './InputForm';
import { Grid } from '@material-ui/core';
import PersonComp from './PersonComp';
import Axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom';

// const reload = () => {
//   let list
//   return Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/users")
//     .then(
//       res => { list =
//         res.data.map(user => {
//           let tmp = {
//             name: user.firstName,
//             surname: user.lastName,
//             address: user.email,
//             phone: user.username,
//             city: user.leadEmails,
//             postC: user.description,
//             id: user.id
//           }
//           return tmp
//         })
//       console.log("reloaded")}
//     )
//     .then(
//       () => { return list }
//     )
//     .catch(err => console.log(err))   
// }

function App() {
  const [personList, setPersonList] = useState([])
  const [open, setOpen] = useState(false)
  const [Error, setError] = useState({
    msg: "",
    type: "error"
  })
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
        res => setPersonList(
          res.data.map(user => {
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
    console.log("reloaded")
    return personList
  }
  
  //const personData = useMemo(() => reload().then(???), [personList])
  //cant process on personList change, PL is changing into reload

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
        reload()
        setError({ msg: "Person edited", type: "success"})
        setOpen(true) 
      })
      .catch(err => handleError(err))
  }
  
  useEffect(() => {
    //reload().then(data => console.log(data))
    reload()
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  if (err404) {
    return <Redirect to="*"/>
  }

  return (
    <div className="App" >
      <Navbar load={setLoading}/>   
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
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
          setErr={setError}
          open={setOpen}
          />
        </Grid>
      )}  
      </Grid>     
    </div>
  )
}

export default App;
