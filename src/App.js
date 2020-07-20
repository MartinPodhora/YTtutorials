 import React from 'react';
import logo from './logo.svg';
import { Message } from "./components/message"
import Counter from "./components/Counter"
import Parent from "./components/Perent"
import './App.css';
import UserGreeting from './components/CondRender';
import List from './components/List';
import StyleSheets from './components/StyleSheets';
import InlineSyle from './components/InlineSyle';
import "./appStyle.css"
import style from "./appStyle.module.css"
import Form from './components/Form';
//different input of module css


function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
