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
import RouteTest from "./components/RouteTest"
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

  // useEffect(() => {
  //   if (currentUser) {
  //     // props.history.push("/hot")
  //     // ^ disabled for testing
  //     props.history.push("/tasks")
  //   } else {
  //     props.history.push("/")
  //   }
  // }, [currentUser])

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
    // console.log(tasks)
    return tasks
  }

  const incompleteTasks = () =>
    Sorting.incompleteTasks(getTasks(currentUser.projects))

  const orderedTasks = () => Sorting.orderTasks(incompleteTasks())
  //   const orderedTasks = () => Sorting.orderTasks(getTasks(currentUser.projects))

  const nonEmptyProjects = () =>
    currentUser.projects.filter(project => project.title !== "")
  const orderedProjects = () => nonEmptyProjects() // to be written, in Sorting

  const mostUrgentTask = () => orderedTasks()[0]

  const handleLogout = () => {
    API.logout()
    setCurrentUser(null)
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
                    {...{ ...routerProps, handleUpdateToggle }}
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
                    tasks={orderedTasks()}
                    {...{ ...routerProps, handleUpdateToggle }}
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
                  {...{ ...routerProps, handleUpdateToggle, currentUser, setCurrentUser }}
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
                    projects={currentUser.projects}
                    {...{ ...routerProps, handleUpdateToggle }}
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
                    {...{ ...routerProps, handleUpdateToggle }}
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
                    {...{ handleUpdateToggle, routerProps }}
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
                    {...{ handleUpdateToggle, routerProps }}
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
