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
import SignUpForm from "./components/SignUpForm"
import API from "./adapters/API"

const App = props => {
  const [currentUser, setCurrentUser] = useState(null)
  const [registerIntention, setRegisterIntention] = useState(false)

  useEffect(() => {
    API.validateUser().then(user => {
      if (user.errors || user.error) {
        if (registerIntention) {props.history.push("/signup")
        } else {
          props.history.push("/login")
        }
      } else {
        setCurrentUser(user)
      }
    })
  }, [registerIntention])

  useEffect(() => {
    if (currentUser) {
      props.history.push("/hot")
    } else {
      props.history.push("/")
    }
  }, [currentUser])

  const handleLogin = user => {
    if (user.errors) {
      window.alert(user.errors)
    } else {
      setCurrentUser(user)
    }
  }

  const toggleRegisterIntention = () => {
    setRegisterIntention(!registerIntention)
  }

  return (
    <div className="App">
      {currentUser ? (
        <Main {...{ currentUser, setCurrentUser }} />
      ) : registerIntention ? (
        <SignUpForm {...{ handleLogin, toggleRegisterIntention }} />
      ) : <LoginForm {...{ handleLogin, toggleRegisterIntention }}/>}
    </div>
  )
}

export default App
