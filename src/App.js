import React, { useState, useEffect } from "react"
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  Redirect
} from "react-router-dom"
import Main from "./containers/Main"
import LoginForm from "./components/LoginForm"
import API from "./adapters/API"

const App = props => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    API.validateUser().then(user => {
      if (user.errors) {
        props.history.push("/login")
      } else {
        setCurrentUser(user)
      }
    })
  }, [])

  useEffect(() => {
    if (currentUser) {
      props.history.push("/hot")
    } else {
      props.history.push("/")
    }
  }, [currentUser])

  const handleLogin = user => {
    setCurrentUser(user)
  }

  return (
    <div className="App">
      {currentUser ? (
        <Main {...{currentUser, setCurrentUser}} />
      ) : (
        <LoginForm {...{ handleLogin }} />
      )}
    </div>
  )
}

export default App
