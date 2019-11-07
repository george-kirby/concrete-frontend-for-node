import React from "react"
import ProjectCard from "../components/ProjectCard"
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

const ProjectList = ({ projects }) => {

  return (
    <div>
      <Link to="/tasks">Tasks</Link> | <Link to="/projects">PROJECTS</Link>
        <Card.Group>
        {projects.map(project => {
          return <ProjectCard key={project.id} project={project} />
        })}
        </Card.Group>
    </div>
  )
}

export default ProjectList
