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

  const getTasks = projects => {
    let tasks = []
    projects.forEach(project => {
      project.tasks.forEach(task => {
        tasks = [...tasks, task]
      })
    })
    return tasks
  }

  const incompleteTasks = () =>
    Sorting.incompleteTasks(getTasks(currentUser.projects))

  const orderedTasks = () => Sorting.orderTasks(incompleteTasks())

  const titledProjects = () =>
    currentUser.projects.filter(project => project.title !== "")
  const orderedProjects = () => titledProjects() // ... to be written, in Sorting
  // const orderedProjects = () => Sorting.orderProjects(titledProjects())

  const mostUrgentTask = () => orderedTasks()[0]

  const handleLogout = () => {
    API.logout()
    setCurrentUser(null)
  }

  const findFromParams = (array, params) => {
    return array.find(item => item.id === parseInt(params.id))
  }

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
                    task={findFromParams(orderedTasks(), routerProps.match.params)}
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
                  {...{ ...routerProps, currentUser, setCurrentUser }}
                />
                ) : (
                  <StallingComponent />
              )}
            />
            <Route
              exact
              path="/projects/:id"
              component={routerProps =>
                currentUser ? (
                  <SelectedProject
                    project={findFromParams(currentUser.projects, routerProps.match.params) }
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
        <nav className="navbar">
          <Link to="/hot">HOT</Link> | <Link to="/tasks">ALL</Link>
          {" | "}
          <Link to="/new">NEW</Link> | <Link to="/settings">SETTINGS</Link>
          {" | "}
          <Link to="/login" onClick={handleLogout}>
            LOG OUT
          </Link>
        </nav>
      )}
    </div>
  )
}

export default App
