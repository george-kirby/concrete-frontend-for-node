import React from "react"
import { useHistory } from "react-router-dom"
import "../stylesheets/ProjectCard.css"
import Sorting from "../helpers/Sorting"

const ProjectCard = ({ project, handleUpdateToggle }) => {
  const history = useHistory()

  const progress =
    ((project.tasks.length - Sorting.incompleteTasks(project.tasks).length) /
      project.tasks.length) *
    100

  return (
    <div
      className="project-card"
      onClick={() => history.push(`/projects/${project.id}`)}
    >
      <h4>📌 {project.title}</h4>
      <div id="progress-bar-container">
        <div id="progress-bar" style={{ width: `${progress - 1}%` }}></div>
      </div>
      <br />
      {project.tasks.map(task => {
        return (
          <div key={task.id}>
            {task.title} 🕑 {task.actual_time}
          </div>
        )
      })}
    </div>
  )
}

export default ProjectCard
