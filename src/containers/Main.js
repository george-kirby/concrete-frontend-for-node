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



const Main = ({ currentUser, setCurrentUser }) => {
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

  const mostUrgentTask = () => {
      let tasks = getTasks(currentUser.projects)
      return tasks[0]
  }

  const handleLogout = () => {
    API.logout()
    setCurrentUser(null)
  }

  return (
    <div>
      <h1>This is the main container</h1>
      <h4>Email: {currentUser ? currentUser.email : null}</h4>
        <Switch>
            <Route exact path="/hot" component={routerProps => <HotTask task={mostUrgentTask()} {...routerProps}/>}/>
            <Route exact path="/all"> All of the tasks </Route>
            <Route exact path="/new"> New Task time </Route>
            <Route exact path="/settings"> Welcome to settings </Route>
        </Switch>
        <br/>
      <nav className="navbar">
            <Link to="/hot">HOT</Link> | <Link to="/all">ALL TASKS</Link>
          {" | "}
          <Link to="/new">NEW</Link> | <Link to="/settings">SETTINGS</Link>
          {" | "}
          <Link to="/login" onClick={handleLogout}>LOG OUT</Link>
      </nav>
    </div>
  )
}


export default Main
