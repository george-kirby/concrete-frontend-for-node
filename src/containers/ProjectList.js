import React from "react"
import ProjectCard from "../components/ProjectCard"
import { Link } from 'react-router-dom'
import { Card, Menu } from 'semantic-ui-react'

const ProjectList = ({ projects }) => {

  return (
    <div>
      <Menu>
        <Menu.Item>
          <Link to="/tasks">Tasks</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/projects">PROJECTS</Link>
        </Menu.Item>
      </Menu>
        <Card.Group>
        {projects.map(project => {
          return <ProjectCard key={project.id} project={project} />
        })}
        </Card.Group>
    </div>
  )
}

export default ProjectList
