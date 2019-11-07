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
    task.steps.forEach(step => {
      API.patchStep(step.id, { completed: true }).then(responseStep => {
        setCurrentUser({
          ...currentUser,
          projects: UpdateUserObject.patchedStep(responseStep, currentUser)
        })
      })
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
                {hot && <p><Icon name="hand point right outline"/> {task.steps[0].act}</p>}
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
