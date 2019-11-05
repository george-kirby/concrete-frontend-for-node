import React from "react"
import TaskCard from "../components/TaskCard"
import { Link } from 'react-router-dom'
import '../stylesheets/List.css'

const TaskList = ({ tasks, setCurrentUser, currentUser }) => {

  const urgentTask = tasks[0]
  const otherTasks = tasks.slice(1)

  return (
    <div>
      <Link to="/tasks">TASKS</Link> | <Link to="/projects">Projects</Link>
      <div className="core-container">
        {urgentTask ? 
        <div>
          <div id="most-urgent-task-card">
          <TaskCard key={urgentTask.id} task={urgentTask} {...{ setCurrentUser, currentUser }} />
          </div>
          {otherTasks.map(task => {
            return (
              <div className="task-card"><TaskCard key={task.id} task={task} {...{ setCurrentUser, currentUser }} /></div>
            )
          })}
        </div> : "You have no outstanding tasks - well done!"}
      </div>
    </div>
  )
}

export default TaskList
