import React, { useState } from "react"
// import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom"
import API from "../adapters/API"
import StallingComponent from "./StallingComponent"
import UpdateUserObject from "../helpers/UpdateUserObject"
import Sorting from "../helpers/Sorting"
import { Icon, Progress } from "semantic-ui-react"
import '../stylesheets/SelectedTask.css'

const SelectedTask = ({ hot, task, setCurrentUser, currentUser, history }) => {

  const handleCompleteStepClick = index => {
    let newCompleteSteps = [...task.complete_steps]
    let newIncompleteSteps = [...task.incomplete_steps]
    newCompleteSteps = [...newCompleteSteps, ...newIncompleteSteps.splice(index, 1)]
    console.log(newCompleteSteps)
    console.log(newIncompleteSteps)
    API.patchTask(task.id, {complete_steps: JSON.stringify(newCompleteSteps), incomplete_steps: JSON.stringify(newIncompleteSteps)})
    .then(task => {
      console.log(task)
      setCurrentUser({...currentUser, tasks: UpdateUserObject.patchedTask(task, currentUser)})
    })
  }

  const handleEditClick = () => {
    history.push(`/tasks/${task.id}/edit`)
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
          <Progress class="progress-bar" color="green" style={{maxWidth: "90%", margin: "1em 1em 2em"}} value={task.complete_steps.length} total={task.complete_steps.length + task.incomplete_steps.length} progress="ratio"/>
          {task.incomplete_steps.length > 0 ? task.incomplete_steps
            .map((step, index) => (
              <p key={`step-${index}`}>
                <Icon name="hand point right outline" /> {step}{" "}
                  <Icon name="check" color='green' onClick={() => handleCompleteStepClick(index)}/>
              </p>
            )) : <p>Task complete - well done!</p>}
          <button onClick={() => handleEditClick()}>Edit task</button>
          <button onClick={() => history.push(`/tasks`)}>To all tasks</button>
        </div>
      ) : (hot ? (
        <div>
          <p>You have no outstanding tasks - well done!</p>
          <Link to="/new">Add a new task</Link>
        </div>
      ) : (
        <StallingComponent />
      ))}
    </div>
  )
}

export default SelectedTask
