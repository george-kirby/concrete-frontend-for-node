import React, { useState, useEffect } from "react"
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  Redirect,
  useParams
} from "react-router-dom"
import ErrorBoundary from "./components/ErrorBoundary"
import LoginForm from "./components/LoginForm"
import SignUpForm from "./components/SignUpForm"
import API from "./adapters/API"
import SelectedTask from "./components/SelectedTask"
import Settings from "./components/Settings"
import StallingComponent from "./components/StallingComponent"
import TaskList from "./containers/TaskList"
import Sorting from "./helpers/Sorting"

import { Menu } from 'semantic-ui-react'
import TaskForm from "./components/TaskForm"

const App = props => {
  const [currentUser, setCurrentUser] = useState(null)
  const DEV = true

  useEffect(() => {
    // this is set to false for some dev work
    if (false) {

      API.validateUser().then(user => {
        // if ((window.location.href !== "https://concrete-frontend.herokuapp.com/login") && (window.location.href !== "https://concrete-frontend.herokuapp.com/signup")) {
          if (!window.location.href.includes("login") && !window.location.href.includes("signup")) {
            if (user.errors) {
              window.alert(`${user.errors} \n Click OK to go to login page`)
              props.history.push("/login")
            } else if (user.error) {
              window.alert([user.error, user.exception])
            }
            setCurrentUser(user)
          }})
        }
    
    // set user if one doesn't exist already (no need for validation)
    if (!currentUser) {
      if (DEV) {
        if (localStorage.getItem("token") === "keepMeLoggedInPls") {
          console.log("auto login!")
          API.login({
            email: "b@b.com",
            password: "hi"
          }).then(setCurrentUser)
        } else {
          setCurrentUser( { name: "testDummy", tasks: [], _id: "no1"})
        }
      }    
    }
      }, [])

  const handleLogin = async user => {
    if (user.errors) {
      window.alert(user.errors)
    } else if (user.error) {
      window.alert(user.error)
    } else {
      setCurrentUser(user)
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", "keepMeLoggedInPls")
      }
      props.history.push("/hot")
    }
  }

  const handleLogout = () => {
    API.logout()
    setCurrentUser(null)
  }

  const findFromParams = (array, params) => {
    return array.find(item => item._id === params.id)
  }

  const orderedTasks = () => {
    return currentUser.tasks.length > 0 ? 
      Sorting.orderTasks(Sorting.incompleteTasks(currentUser.tasks)) :
      currentUser.tasks
  }

  const mostUrgentTask = () => orderedTasks()[0]

  return (
    <div id="total-container">
      <div>
            {currentUser && (
              // <Menu id="navbar-menu" fixed="top">
              <Menu id="navbar-menu">
                <Menu.Item>
                <Link to="/hot">HOT</Link>
                </Menu.Item>
                <Menu.Item>
                <Link to="/tasks">ALL</Link>
                </Menu.Item>
                <Menu.Item>
                <Link to="/new">NEW</Link>
                </Menu.Item>
                {/* <Menu.Item>
                <Link to="/settings">(SETTINGS)</Link>
                </Menu.Item> */}
                <Menu.Item>
                <Link to="/login" onClick={handleLogout}>
                  LOG OUT
                </Link>
                </Menu.Item>
              </Menu>
            )}
        <ErrorBoundary>
          <div id="main-container">
            <Switch>
              <Route
                exact
                path="/login"
                component={routerProps => (
                  <LoginForm {...{ handleLogin, ...routerProps }} />
                  )}
              />
              <Route
                exact
                path="/signup"
                component={routerProps => (
                  <SignUpForm {...{ handleLogin, ...routerProps, setCurrentUser }} />
                  )}
              />
              <Route
                exact
                path="/hot"
                component={routerProps =>
                  currentUser ? (
                    <SelectedTask
                    hot={true}
                      task={currentUser.tasks ? mostUrgentTask() : null}
                      {...{ ...routerProps, setCurrentUser, currentUser }}
                    />
                    ) : (
                    <StallingComponent />
                    )
                  }
              />
              <Route
                exact
                path="/tasks"
                component={routerProps =>
                  currentUser ? (
                    <TaskList
                      tasks={orderedTasks()}
                      {...{ setCurrentUser, currentUser, ...routerProps }}
                      tags={Sorting.uniqueTagsFromTasks(orderedTasks())}
                    />
                  ) : (
                    <StallingComponent />
                  )
                }
              />
              <Route
                exact
                path="/tasks/:id"
                component={routerProps =>
                  currentUser ? (
                    <SelectedTask
                    hot={false}
                      task={findFromParams(
                        currentUser.tasks,
                        routerProps.match.params
                      )}
                      {...{ ...routerProps, setCurrentUser, currentUser }}
                    />
                  ) : (
                    <StallingComponent />
                  )
                }
              />
              <Route
                exact
                path="/tasks/:id/edit"
                component={routerProps =>
                  currentUser ? (
                    <TaskForm
                    editMode = {true}
                      projects={currentUser.projects}
                      existingTags={Sorting.uniqueTagsFromTasks(orderedTasks())}
                      task={findFromParams(
                        currentUser.tasks,
                        routerProps.match.params
                      )}
                      {...{ ...routerProps, currentUser, setCurrentUser }}
                    />
                  ) : (
                    <StallingComponent />
                  )
                }
              />
              <Route
                exact
                path="/new"
                component={routerProps =>
                  currentUser ? (
                    <TaskForm editMode={false}
                    existingTags={Sorting.uniqueTagsFromTasks(orderedTasks())}
                      {...{ ...routerProps, setCurrentUser, currentUser }}/>
                  ) : (
                    <StallingComponent />
                  )
                }
              />
              <Route
                exact
                path="/settings"
                component={routerProps =>
                  currentUser ? (
                    <Settings 
                      {...{ ...routerProps}}/>
                  ) : (
                    <StallingComponent />
                  )
                }
              />
              <Route path="*"> <Redirect to={localStorage.getItem("token") ? "/tasks" : "/login"}/> </Route>
            </Switch>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
