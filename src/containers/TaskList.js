import React, { useState } from "react"
import TaskCard from "../components/TaskCard"
import ProjectCard from "../components/ProjectCard"

const TaskList = ({ tasks, projects }) => {
  const [viewTasks, setViewTasks] = useState(true)

  const toggleView = () => {
    setViewTasks(!viewTasks)
  }

  const displayTasks = () => {
    return (
      <div>
        {tasks.map(task => {
          return <TaskCard key={task.id} task={task} />
        })}
      </div>
    )
  }

  const displayProjects = () => {
    return <div>
        {projects.map(project => {
                    return <ProjectCard key={project.id} project={project}/> 
                })}
    </div>
  }

  return (
    <div>
      <input
        type="radio"
        name="react-tips"
        value="tasks"
        checked={viewTasks}
        onClick={toggleView}
      />
      Tasks
      <input
        type="radio"
        name="react-tips"
        value="projects"
        checked={!viewTasks}
        onClick={toggleView}
      />
      Projects
      {viewTasks ? displayTasks() : displayProjects()}
    </div>
  )
}

export default TaskList
