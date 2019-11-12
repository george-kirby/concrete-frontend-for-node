import React from "react"
import { useHistory, Link } from "react-router-dom"
import "../stylesheets/TaskCard.css"
import API from "../adapters/API"
import UpdateUserObject from "../helpers/UpdateUserObject"
import Sorting from "../helpers/Sorting"
import { Card, Icon, Grid, Button } from "semantic-ui-react"

const TaskCard = ({ task, setCurrentUser, currentUser, hot, setDraggedTask }) => {
  const history = useHistory()

  const handleCompleteTaskClick = (e, task) => {
    e.stopPropagation()
    let newCompleteSteps = [...task.complete_steps]
    task.incomplete_steps.forEach(step => {
      newCompleteSteps = [...newCompleteSteps, step]
    })
    API.patchTask(task.id, {complete_steps: JSON.stringify(newCompleteSteps), incomplete_steps: "[]"})
    .then(task => {
      setCurrentUser({...currentUser, tasks: UpdateUserObject.patchedTask(task, currentUser)})
    })
  }

  const handleDragStart = e => {
    setDraggedTask(task)
    console.log("dragged!")
  }

  const handleDragEnd = e => {
    e.preventDefault()
    setDraggedTask(null)
    console.log("dropped!")
  }

  return (
    <Card draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} className="task-card" fluid color={hot ? "orange" : "blue"} onClick={() => history.push(`tasks/${task.id}`)}>
      <Card.Content>
        <Grid>
            <Grid.Column  floated='left' width={10}>
                <Card.Header as="h4">{task.title}</Card.Header>
                <p>
                  {hot ? (
                    <Icon color="red" name="exclamation" />
                  ) : (
                    <Icon name="clock outline" />
                  )}{" "}
                  {Sorting.displayDateTime(task)} - {task.cue}
                </p>
                {hot && <p><Icon name="hand point right outline"/> {task.incomplete_steps[0]}</p>}
            </Grid.Column>
            <Grid.Column className="task-actions" floated='right' width={5}>
              {/* <Icon name="clipboard check" color='green' size="large" onClick={e => handleCompleteTaskClick(e, task)} className="completed-button"/> */}
              {/* <Button color='violet' size="tiny" onClick={e => handleCompleteTaskClick(e, task)} className="completed-button" content="Mark as complete"/> */}
              <Button color='grey' size="tiny" onClick={e => handleCompleteTaskClick(e, task)} className="completed-button"><Icon name="archive"/>Archive</Button>
            </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  )
}

export default TaskCard
