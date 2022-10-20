import React from "react"
import { useHistory, Link } from "react-router-dom"
import "../stylesheets/TaskCard.css"
import Sorting from "../helpers/Sorting"
import { Card, Icon } from "semantic-ui-react"

const TaskCard = ({ task, hot, setDraggedTask }) => {
  const history = useHistory()

  const handleDragStart = e => {
    setDraggedTask(task)
  }

  const handleDragEnd = e => {
    e.preventDefault()
    setDraggedTask(null)
  }

  return (
    <Card draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} className="task-card" fluid color={hot ? "orange" : "blue"} onClick={() => history.push(`tasks/${task._id}`)}>
      <Card.Content>
                <Card.Header as="h4">{task.title}</Card.Header>
                <p>
                  {hot ? (
                    <Icon color="red" name="exclamation" />
                  ) : (
                    <Icon name="clock outline" />
                  )}{" "}
                  {Sorting.displayDateTime(task)} - {task.cue}
                </p>
                {hot && <p><Icon name="hand point right outline"/> {task.incompleteSteps[0]}</p>}
      </Card.Content>
    </Card>
  )
}

export default TaskCard
