import React from "react"
import { useHistory, Link } from "react-router-dom"
import "../stylesheets/TaskCard.css"
import API from "../adapters/API"
import UpdateUserObject from "../helpers/UpdateUserObject"
import Sorting from "../helpers/Sorting"
import { Card, Icon, Grid } from "semantic-ui-react"

const TaskCard = ({ task, setCurrentUser, currentUser, hot }) => {
  const history = useHistory()

  const handleCompleteTaskClick = task => {
    let newCompleteSteps = [...task.complete_steps]
    task.incomplete_steps.forEach(step => {
      newCompleteSteps = [...newCompleteSteps, step]
    })
    API.patchTask(task.id, {complete_steps: JSON.stringify(newCompleteSteps), incomplete_steps: "[]"})
    .then(task => {
      setCurrentUser({...currentUser, tasks: UpdateUserObject.patchedTask(task, currentUser)})
    })
  }

  return (
    <Card fluid color={hot ? "orange" : "blue"}>
      <Card.Content>
        <Grid>
            <Grid.Column  floated='left' width={12}>
                <Card.Header>{task.title}</Card.Header>
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
            <Grid.Column className="task-actions" floated='right' width={3}>
              <Icon name="eye" size="large" onClick={() => history.push(`tasks/${task.id}`)} className="details-button"/>
                <Icon name="clipboard check" color='green' size="large" onClick={() => handleCompleteTaskClick(task)} className="completed-button"/>
            </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  )
}

export default TaskCard
