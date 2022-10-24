import React from "react"
// import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom"
import API from "../adapters/API"
import StallingComponent from "./StallingComponent"
import UpdateUserObject from "../helpers/UpdateUserObject"
import Sorting from "../helpers/Sorting"
import { Icon, Progress, Button } from "semantic-ui-react"
import "../stylesheets/SelectedTask.css"

const SelectedTask = ({ hot, task, setCurrentUser, currentUser, history }) => {
  const handleCompleteStepClick = index => {
    let newCompleteSteps = [...task.completeSteps]
    let newIncompleteSteps = [...task.incompleteSteps]
    newCompleteSteps = [
      ...newCompleteSteps,
      ...newIncompleteSteps.splice(index, 1)
    ]
    API.patchTask(task._id, {
      completeSteps: newCompleteSteps,
      incompleteSteps: newIncompleteSteps
    }).then(task => {
      setCurrentUser({
        ...currentUser,
        tasks: UpdateUserObject.patchedTask(task, currentUser)
      })
    })
  }

  const handleEditClick = () => {
    history.push(`/tasks/${task._id}/edit`)
  }

  return (
    <div id="selected-task-container">
      {" "}
      {task ? (
        <div>
          <h1>{task.title}</h1>
          {task.tags.length > 0 && (
            <p>
              <Icon name="tags" />
              {task.tags.join(" ~ ")}
            </p>
          )}
          <p>
            <Icon color="red" name="exclamation" />
            {Sorting.displayDateTime(task)} - {task.cue}
          </p>
          <Progress
            className="progress-bar"
            color="green"
            style={{ maxWidth: "90%", margin: "1em 0.5em 2em" }}
            value={task.completeSteps.length}
            total={task.completeSteps.length + task.incompleteSteps.length}
            progress="ratio"
          />
          {task.completeSteps.length > 0 &&
            task.completeSteps.map((step, index) => (
              <p key={`complete-step-${index}`} className="complete-step">
                <Icon name="check" color="green" /> {step}{" "}
              </p>
            ))}
          {task.incompleteSteps.length > 0 ? (
            task.incompleteSteps.map((step, index) => (
              <p key={`incomplete-step-${index}`}>
                <Icon name="hand point right outline" /> {step}{" "}
                <Button
                color="green"
                  size="tiny"
                  onClick={() => handleCompleteStepClick(index)}
                >
                  Tick off
                </Button>
              </p>
            ))
          ) : (
            <p>Task complete - well done!</p>
          )}
          <Button size="tiny" color="teal" onClick={() => handleEditClick()} content="Edit task" />
          <Button size="tiny" onClick={() => history.push(`/tasks`)} content="To all tasks" />
        </div>
      ) : hot ? (
        <div>
          <p>You have no outstanding tasks - well done!</p>
          <Link to="/new">Add a new task</Link>
        </div>
      ) : (
        <StallingComponent />
      )}
    </div>
  )
}

export default SelectedTask
