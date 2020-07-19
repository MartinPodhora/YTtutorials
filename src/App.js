 import React from 'react';
import logo from './logo.svg';
import { Message } from "./components/message"
import Counter from "./components/Counter"
import Parent from "./components/Perent"
import './App.css';
import UserGreeting from './components/CondRender';
import List from './components/List';

function App() {
  return (
    <div className="App">
      <List />
    </div>
  );
}

export default App;
