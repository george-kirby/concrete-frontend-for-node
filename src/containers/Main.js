import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  Redirect
} from "react-router-dom"
import API from "../API"
import HotTask from "../components/HotTask"

const Main = ({ currentUserId }) => {
  const [currentUser, setCurrentUser] = useState([])
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [filterOptions, setFilterOptions] = useState({
    searchTerm: "",
    day: "all"
  })

  useEffect(() => {
    API.getUser(currentUserId).then(user => {
        setCurrentUser(user)})
        .then(console.log(`hello it's the ${currentUser}`))
  }, [])

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

//   const mostUrgentTask = () => {
//       let tasks = getTasks()
//       return tasks[0]
//   }

  return (
    <div>
      <h1>This is the main container</h1>
      <h4>Email: {currentUser.email}</h4>
        <Router>
        <Switch>
            <Route exact path="/hot"> Hot Task time </Route>
            <Route exact path="/all"> All of the tasks </Route>
            <Route exact path="/new"> New Task time </Route>
            <Route exact path="/settings"> Welcome to settings </Route>
        </Switch>
        <br/>
      <nav className="navbar">
          <Link to="/hot">HOT</Link> | <Link to="/all">ALL TASKS</Link>
          {" | "}
          <Link to="/new">NEW</Link> | <Link to="/settings">SETTINGS</Link>
      </nav>
      </Router>
    </div>
  )
}


export default Main
