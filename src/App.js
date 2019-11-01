import React, { useState, useEffect } from "react"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  Redirect
} from "react-router-dom"
import Main from './containers/Main'
import LoginForm from './components/LoginForm'
import API from "./adapters/API"

function App() {

  const [currentUser, setCurrentUser] = useState(null)

  // useEffect(() => {
  //   API.getUser(1).then(setCurrentUser)
  // }, [])

  

  return (
    <div className="App">
      {currentUser ? <Main currentUser={currentUser}/> : <LoginForm/>}
    </div>
  );
}

export default App;
