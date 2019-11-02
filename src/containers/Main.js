import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  Redirect
} from "react-router-dom"
import API from "../adapters/API"
import HotTask from "../components/HotTask"
import Ordering from '../helpers/Ordering'
import TaskList from "./TaskList"
import '../stylesheets/Main.css'
import NewTaskForm from "../components/NewTaskForm"

const Main = ({ currentUser, setCurrentUser, handleUpdateToggle }) => {
  //   const [currentUser, setCurrentUser] = useState(null)
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [filterOptions, setFilterOptions] = useState({
    searchTerm: "",
    day: "all"
  })

  //   useEffect(() => {
  //     API.getUser(currentUserId).then(user => {
  //         setCurrentUser(user)})
  //         .then(console.log(`hello it's the ${currentUser}`))
  //   }, [])

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

  //   const goToHot = () => {
  //       console.log("hot clicked")
  //       history.push("/hot")
  //   }

  const orderedTasks = () => Ordering.orderTasks(getTasks(currentUser.projects))

  const mostUrgentTask = () => orderedTasks()[0]

  const handleLogout = () => {
    API.logout()
    setCurrentUser(null)
  }

  return (
    <div>
      <h4>{currentUser ? currentUser.email : null}</h4>
      <div className="core-container">
          <Switch>
            {/* <Route
              exact
              path="/hot"
              component={routerProps => (
                <HotTask task={mostUrgentTask()} {...routerProps} />
              )}
            /> */}
            <Route exact path="/hot"> <HotTask task={mostUrgentTask()} /> </Route>
            <Route exact path="/all"> <TaskList tasks={orderedTasks()}/> </Route>
            <Route exact path="/new"> <NewTaskForm userId={currentUser.id} {...{handleUpdateToggle}}/> </Route>
            <Route exact path="/settings">
              {" "}
              Welcome to settings{" "}
            </Route>
          </Switch>
      </div>
      <br />
      <nav className="navbar">
        <Link to="/hot">HOT</Link> | <Link to="/all">ALL TASKS</Link>
        {" | "}
        <Link to="/new">NEW</Link> | <Link to="/settings">SETTINGS</Link>
        {" | "}
        <Link to="/login" onClick={handleLogout}>
          LOG OUT
        </Link>
      </nav>
    </div>
  )
}

export default Main
