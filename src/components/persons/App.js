import React, { useState, useEffect, useMemo, useContext } from 'react';
import InputForm from './InputForm';
import { Grid } from '@material-ui/core';
import PersonComp from './PersonComp';
import Axios from 'axios';
import Navbar from './Navbar';
import { HandleError as handleError } from "./ErrorAlert"

function App() {
  const [personList, setPersonList] = useState([])
  const [loading, setLoading] = useState(true)

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

  const reload = () => {
    setLoading(true)
    Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/users")
    .then(res => setPersonList(res.data))
    .catch(err => handleError(err, "App"))
    .finally(() => setLoading(false))
    console.log("reloaded data")
    return personList
  }

  const add = (person) => {
    setLoading(true)
    if(addCheck(person)) {
      Axios.post("http://192.168.0.61:9011/UAM/rest/applications/7289/users", {...person, createdBy: "Martin Podhora"})
      .then(() => { 
        reload()
      })
      .catch(err => {handleError(err, "App"); setLoading(false)})
    } else {
      handleError("Fill all fields !!! App component " + Date(Date.now()).toString(), "App") 
      setLoading(false)
    }     
  }

  const deleteHandler = (indx) => {
    setLoading(true)
    Axios.delete("http://192.168.0.61:9011/UAM/rest/applications/7289/users/" + indx)
    .then(() => { 
      reload()
    })
    .catch(err => {handleError(err, "App"); setLoading(false)})
  }

  const editHandler = (person) => {
    setLoading(true)
    Axios.put("http://192.168.0.61:9011/UAM/rest/applications/7289/users", {...person, createdBy: "Martin Podhora", additionalData: []})
    .then(() => {
      reload()
    })
    .catch(err => {handleError(err, "App"); setLoading(false)})
  }

  const multiDelete = (ids) => {
    let invalidID = []
    setLoading(true)
    let resArray = ids.map(id => Axios.delete("http://192.168.0.61:9011/UAM/rest/applications/7289/users/" + id))
    Promise.allSettled(resArray)
    .then(res => {
      res.map((obj, i) => {
        obj.status !== "fulfilled" && invalidID.push(ids[i])
      })
      handleError("persons with id : " + invalidID.map(id => id + " ") + " wasnt deleted " + Date(Date.now()).toString(), "App") 
      reload() 
    })  
  }

  useEffect(() => {
    reload()
  }, [])

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
        />
      </Grid>
    )}, [loading]
  )

  return (
    <div className="App" >
      <Navbar 
        load={setLoading}
      />   
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
