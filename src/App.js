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
import HotTask from "./components/HotTask"
import SelectedTask from "./components/SelectedTask"
import SelectedProject from "./components/SelectedProject"
import StallingComponent from "./components/StallingComponent"
import TaskList from "./containers/TaskList"
import Sorting from "./helpers/Sorting"
import NewTaskForm from "./components/NewTaskForm"
import EditTaskForm from "./components/EditTaskForm"
import ProjectList from "./containers/ProjectList"

import { Menu } from 'semantic-ui-react'

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
  const getTasks = projects => {
    let tasks = []
    projects.forEach(project => {
      project.tasks.forEach(task => {
        tasks = [...tasks, task]
      })
    })
    return tasks
  }

  const titledProjects = projects =>
    projects.filter(project => project.title !== "")

  const incompleteProjects = projects =>
    projects.filter(
      project => Sorting.incompleteTasks(project.tasks).length > 0
    )

  // arrays and object to be passed to components
  const orderedTasks = () =>
    Sorting.orderTasks(Sorting.incompleteTasks(getTasks(currentUser.projects)))
  // const orderedProjects = () => titledProjects() // ... to be written, in Sorting
  const orderedProjects = () =>
    Sorting.orderProjects(
      incompleteProjects(titledProjects(currentUser.projects))
    ) // breaks if a project has no tasks -> corrected through front end validation
  const mostUrgentTask = () => orderedTasks()[0]

  return (
    <div>
      <div>
        <ErrorBoundary>
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
                <SignUpForm {...{ handleLogin, routerProps }} />
              )}
            />
            <Route
              exact
              path="/hot"
              component={routerProps =>
                currentUser ? (
                  <HotTask
                    task={mostUrgentTask()}
                    {...{ ...routerProps, setCurrentUser, currentUser }}
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
                    task={findFromParams(
                      orderedTasks(),
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
                  <EditTaskForm
                    projects={currentUser.projects}
                    tasks={getTasks(currentUser.projects)}
                    task={findFromParams(
                      getTasks(currentUser.projects),
                      routerProps.match.params
                    )}
                    {...{ ...currentUser, setCurrentUser }}
                  />
                ) : (
                  <StallingComponent />
                )
              }
            />
            <Route
              exact
              path="/projects/:id"
              component={routerProps =>
                currentUser ? (
                  <SelectedProject
                    project={findFromParams(
                      currentUser.projects,
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
              path="/new"
              component={routerProps =>
                currentUser ? (
                  <NewTaskForm
                    userId={currentUser.id}
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
                    {...{ setCurrentUser, currentUser, routerProps }}
                  />
                ) : (
                  <StallingComponent />
                )
              }
            />
            <Route
              exact
              path="/projects"
              component={routerProps =>
                currentUser ? (
                  <ProjectList
                    projects={orderedProjects()}
                    {...{ routerProps }}
                  />
                ) : (
                  <StallingComponent />
                )
              }
            />
            {/* <Route path="*"> <Redirect to={currentUser ? "/tasks" : "/login"}/> </Route> */}
          </Switch>
        </ErrorBoundary>
      </div>
      <br />
      {currentUser && (
        <Menu>
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
          <Link to="/settings">SETTINGS</Link>
          </Menu.Item>
          <Menu.Item>
          <Link to="/login" onClick={handleLogout}>
            LOG OUT
          </Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  )
}

export default App
