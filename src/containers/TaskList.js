import React from "react"
import TaskCard from "../components/TaskCard"
import { Link } from 'react-router-dom'
import '../stylesheets/List.css'
import { Card } from 'semantic-ui-react'

const TaskList = ({ tasks, setCurrentUser, currentUser }) => {

  const urgentTask = tasks[0]
  const otherTasks = tasks.slice(1)

  return (
    <div>
      <Link to="/tasks">TASKS</Link> | <Link to="/projects">Projects</Link>
      <Card.Group>
        {urgentTask ? 
        <div>
          <TaskCard key={urgentTask.id} task={urgentTask} {...{ setCurrentUser, currentUser }} hot={true}/>
          {otherTasks.map(task => {
            return (
              <TaskCard key={task.id} task={task} {...{ setCurrentUser, currentUser }} hot={false} />
            )
          })}
        </div> : "You have no outstanding tasks - well done!"}
      </Card.Group>
    </div>
  )
}

export default TaskList
