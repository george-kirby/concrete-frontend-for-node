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

  useEffect(() => {
    API.validateUser().then(user => {
      if (user.errors) {
        window.alert(user.errors)
      } else if (user.error) {
        window.alert([user.error, user.exception]) // to be removed - don't want user to see an error when they first load the page
      } else {
        setCurrentUser(user)
      }
    })
  }, [])

  const handleLogin = user => {
    if (user.errors) {
      window.alert(user.errors)
    } else if (user.error) {
      window.alert(user.error)
    } else {
      setCurrentUser(user)
      props.history.push("/hot")
    }
  }

  const handleLogout = () => {
    API.logout()
    setCurrentUser(null)
  }

  const findFromParams = (array, params) => {
    return array.find(item => item.id === parseInt(params.id))
  }

  // filter/sort functions for producing props to pass to components
  // const getTasks = projects => {
  //   let tasks = []
  //   projects.forEach(project => {
  //     project.tasks.forEach(task => {
  //       tasks = [...tasks, task]
  //     })
  //   })
  //   return tasks
  // }

  // const titledProjects = projects => projects.filter(project => project.title !== "")

  // const incompleteProjects = projects =>
  //   projects.filter(
  //     project => Sorting.incompleteTasks(project.tasks).length > 0
  //   )

  // arrays and object to be passed to components
  const orderedTasks = () =>
    Sorting.orderTasks(Sorting.incompleteTasks(currentUser.tasks))
  // const orderedProjects = () => titledProjects() // ... to be written, in Sorting
  // const orderedProjects = () =>
  //   Sorting.orderProjects(
  //     incompleteProjects(titledProjects(currentUser.projects))
  //   ) // breaks if a project has no tasks -> corrected through front end validation
  const mostUrgentTask = () => orderedTasks()[0]

  return (
    <div>
      <div>
        <ErrorBoundary>
          <div id="main-container">
            <Switch>
              <Route
                exact
                path="/login"
                component={routerProps => (
                  <LoginForm {...{ handleLogin, routerProps }} />
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
              {/* <Route path="*"> <Redirect to={currentUser ? "/tasks" : "/login"}/> </Route> */}
            </Switch>
          </div>
        </ErrorBoundary>
      {currentUser && (
        <Menu fixed="bottom">
          <Menu.Item>
          <Link to="/hot">HOT</Link>
          </Menu.Item>
          <Menu.Item>
          <Link to="/tasks">ALL</Link>
          </Menu.Item>
          <Menu.Item>
          <Link to="/new">NEW</Link>
          </Menu.Item>
          <Menu.Item>
          <Link to="/settings">(SETTINGS)</Link>
          </Menu.Item>
          <Menu.Item>
          <Link to="/login" onClick={handleLogout}>
            LOG OUT
          </Link>
          </Menu.Item>
        </Menu>
      )}
      </div>
    </div>
  )
}

export default App
