import React, { useState } from "react"
import TaskCard from "../components/TaskCard"
import ProjectCard from "../components/ProjectCard"

const TaskList = ({ tasks, projects, handleUpdateToggle }) => {
  const [viewTasks, setViewTasks] = useState(true)

  const toggleView = () => {
    setViewTasks(!viewTasks)
  }

  const displayTasks = () => {
    return (
      <div>
        {tasks.map(task => {
          return <TaskCard key={task.id} task={task} {...{handleUpdateToggle}} />
        })}
      </div>
    )
  }

  const displayProjects = () => {
    return (
      <div>
        {projects.map(project => {
          return <ProjectCard key={project.id} project={project} />
        })}
      </div>
    )
  }

  return (
    <div>
      <input
        type="radio"
        name="react-tips"
        value="tasks"
        defaultChecked={viewTasks}
        onClick={toggleView}
      />
      Tasks
      <input
        type="radio"
        name="react-tips"
        value="projects"
        defaultChecked={!viewTasks}
        onClick={toggleView}
      />
      Projects
      {viewTasks ? displayTasks() : displayProjects()}
    </div>
  )
}

export default TaskList
