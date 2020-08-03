 import React, { useState, useEffect } from 'react';
// import PortalDemo from './components/PortalDemo';
// import Hero from './components/Hero';
// import ErrorBoundry from './components/ErrorBoundry';
// import ClickCounterHOS from './components/HOS/clickCounterHOS';
// import HoverCOunterHOS from './components/HOS/HoverCOunterHOS';
// import ClickCounterTwo from './components/ClickCounterTwo';
// import HoverCounterTwo from './components/HoverCounterTwo';
// import Ajaxtestt from './components/Ajaxtestt';
// import Axiostest from './components/Axiostest.js'
import InputForm from './components/persons/InputForm';
import { Grid } from '@material-ui/core';
import PersonComp from './components/persons/PersonComp';
import Axios from 'axios';
//import ParentComp from './components/ParentComp';
//import RefDemo from './components/RefDemo';
//import FocusInputRef from './components/FocusInputRef';
//import FRParentInput from './components/refs/FRParentInput';
//import logo from './logo.svg';
//import { Message } from "./components/message"
//import Counter from "./components/Counter"
//import Parent from "./components/Perent"
//import './App.css';
//import UserGreeting from './components/CondRender';
//import List from './components/List';
//import StyleSheets from './components/StyleSheets';
//import InlineSyle from './components/InlineSyle';

//import "./appStyle.css"
//import style from "./appStyle.module.css"
//different input of module css

//import Form from './components/Form';
//import LifecycleA from './components/LifecycleA';
//import FragmentDemo from './components/FragmentDemo';
//import Table from './components/Table';
//import PureComp from './components/PureComponent';


/*
function App() {
  return (
    <div className="App" >
      <table cellPadding="20px">
        <tbody>
          <tr>
            <th>
              <Ajaxtestt timeId="time1" timezone={-11} country="Los Angeles"/>
            </th>
            <th>
              <Ajaxtestt timeId="time2" timezone={-8} country="New York"/>
            </th>
            <th>
              <Ajaxtestt timeId="time3" timezone={-3} country="London"/>
            </th>
            <th>
              <Ajaxtestt timeId="time4" timezone={-2} country="Paris"/>
            </th>
          </tr>
          <tr>
          <th>
              <Ajaxtestt timeId="time5" timezone={-1} country="Mosscow"/>
            </th>
            <th>
              <Ajaxtestt timeId="time6" timezone={4} country="Bejing"/>
            </th>
            <th>
              <Ajaxtestt timeId="time7" timezone={5} country="Tokyo"/>  
            </th>
          </tr>
        </tbody>
        
      </table>
      <Axiostest />
    </div>
  );
}
*/

const reload = (setpersonList) => {
  Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/businessunits")
    .then(
      dat => setpersonList(
        dat.data.map(user => {
          let descr = JSON.parse(user.description)
          descr.id = user.id
          return descr
        })
      ),
      console.log("reloaded")
    )
}

function App() {
  const [personList, setpersonList] = useState([]) 
  //setInterval(reload(setpersonList), 5000)

  const getNewId = () => {
    let max = 0
    for(let i = 0; i < personList.length; i++) {
      max < personList[i].id && (max = personList[i].id)
    }
    return max
  }

  const add = person => {
    person.id = getNewId() + 1
    setpersonList([...personList, person])
    Axios.post("http://192.168.0.61:9011/UAM/rest/applications/7289/businessunits", {
      "id": person.id,
      "name": person.id,
      "description": JSON.stringify(person)
    }).then(() => reload(setpersonList)) 
  }

  const deleteHandler = indx => {
    Axios.delete("http://192.168.0.61:9011/UAM/rest/applications/7289/businessunits/" + indx).catch(e => console.log(e))
    setpersonList(personList.filter(i => i.id !== indx))
  }

  useEffect(() => {
    Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/businessunits")
      .then(
        dat => setpersonList(
          dat.data.map(user => {
            let descr = JSON.parse(user.description)
            descr.id = user.id
            return descr
          })
        ),
      )
    setInterval(() => reload(setpersonList), 50000)  
  }, [])

  return (
    <div className="App" >
      <InputForm addP={add}/>
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
          person={tmp} 
          onDel={deleteHandler}
          />
        </Grid>
      )}  
      </Grid>
    </div>
  );
}

export default App;
