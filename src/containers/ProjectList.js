import React from "react"
import ProjectCard from "../components/ProjectCard"
import { Link } from 'react-router-dom'

const ProjectList = ({ projects, handleUpdateToggle }) => {

  return (
    <div>
      <Link to="/tasks">Tasks</Link> | <Link to="/projects">Projects</Link>
      <div>
        {projects.map(project => {
          return <ProjectCard key={project.id} project={project} {...{handleUpdateToggle}} />
        })}
      </div>
    </div>
  )
}

export default ProjectList
