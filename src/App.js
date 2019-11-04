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
  const [updateToggle, setUpdateToggle] = useState(false)

  useEffect(() => {
    // console.log("validate user effect was called")
    API.validateUser().then(user => {
      // console.log(user)
      if (user.errors) {
        window.alert(user.errors)
      } else if (user.error) {
        window.alert([user.error, user.exception]) // to be removed - don't want user to see an error when they first load the page
      } else {
        setCurrentUser(user)
      }
    })
  }, [updateToggle])

  // triggered by new task/project creation 
  // -> calls validateUser again, so currentUser is updated to match db
  // probably a better way to do this
  const handleUpdateToggle = () => {
    setUpdateToggle(!updateToggle)
  }

// uncomment this later, when improving routes
// (currently just changes url, with no practical effect)

  // useEffect(() => {
  //   if (registerIntention) {props.history.push("/signup")
  //     } else {
  //       props.history.push("/login")
  //     }
  //   }, [registerIntention]);

  useEffect(() => {
    if (currentUser) {
      // props.history.push("/hot")
      // ^ disabled for testing
      props.history.push("/all")
    } else {
      props.history.push("/")
    }
  }, [currentUser])

  const handleLogin = user => {
    if (user.errors) {
      window.alert(user.errors)
    } else if (user.error) {
      window.alert(user.error)
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
        <Main {...{ currentUser, setCurrentUser, handleUpdateToggle }} />
      ) : registerIntention ? (
        <SignUpForm {...{ handleLogin, toggleRegisterIntention }} />
      ) : <LoginForm {...{ handleLogin, toggleRegisterIntention }}/>}
    </div>
  )
}

export default App
