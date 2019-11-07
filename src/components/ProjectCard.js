import React from "react"
import { useHistory } from "react-router-dom"
import "../stylesheets/ProjectCard.css"
import Sorting from "../helpers/Sorting"
import { Card, Progress } from 'semantic-ui-react'

const ProjectCard = ({ project }) => {
  const history = useHistory()

  const progress =
    ((project.tasks.length - Sorting.incompleteTasks(project.tasks).length) /
      project.tasks.length) *
    100

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{project.title}</Card.Header>
        <Progress percent={progress} color="green" size="small"/>
        {Sorting.incompleteTasks(project.tasks).map(task => {
          return (
            <div key={task.id}>
              {task.title} 🕑 {Sorting.displayDateTime(task)}
            </div>
          )})}
      </Card.Content>
    </Card>
  )
}

export default ProjectCard
