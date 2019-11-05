import React from "react"
import TaskCard from "../components/TaskCard"
import { Link } from 'react-router-dom'
import '../stylesheets/List.css'

const TaskList = ({ tasks, handleUpdateToggle }) => {
  return (
    <div>
      <Link to="/tasks">Tasks</Link> | <Link to="/projects">Projects</Link>
      <div className="core-container">
        {tasks.length > 0 ? tasks.map(task => {
          return (
            <TaskCard key={task.id} task={task} {...{ handleUpdateToggle }} />
          )
        }) : "You have no outstanding tasks - well done!"}
      </div>
    </div>
  )
}

export default TaskList
