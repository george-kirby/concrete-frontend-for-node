import React from "react"
import { useHistory } from "react-router-dom"
import "../stylesheets/ProjectCard.css"
import Sorting from "../helpers/Sorting"

const ProjectCard = ({ project }) => {
  const history = useHistory()

  const progress =
    ((project.tasks.length - Sorting.incompleteTasks(project.tasks).length) /
      project.tasks.length) *
    99

  return (
    <div
      className="project-card"
      onClick={() => history.push(`/projects/${project.id}`)}
    >
      <h4>📌 {project.title}</h4>
      <div id="progress-bar-container">
        <div id="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <br />
      {project.tasks.map(task => {
        return (
          <div key={task.id}>
            {task.title} 🕑 {Sorting.displayDateTime(task)}
          </div>
        )
      })}
    </div>
  )
}

export default ProjectCard
