import React from "react"
import ProjectCard from "../components/ProjectCard"
import { Link } from 'react-router-dom'

const ProjectList = ({ projects }) => {

  return (
    <div>
      <Link to="/tasks">Tasks</Link> | <Link to="/projects">PROJECTS</Link>
      <div className="core-container">
        {projects.map(project => {
          return <ProjectCard key={project.id} project={project} />
        })}
      </div>
    </div>
  )
}

export default ProjectList
