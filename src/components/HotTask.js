import React from "react"
import { Link } from 'react-router-dom'
import API from '../adapters/API'
import UpdateUserObject from '../helpers/UpdateUserObject'
import { Icon } from 'semantic-ui-react'
import Sorting from '../helpers/Sorting'
import StallingComponent from "./StallingComponent"

const HotTask = ({hot, task, currentUser, setCurrentUser, history }) => {

    const handleCompleteStepClick = stepId => {
        console.log(`step ${stepId} complete!`)
        API.patchStep(stepId, {completed: true})
        .then(step => setCurrentUser({...currentUser, projects: UpdateUserObject.patchedStep(step, currentUser)}))
    }

    const handleEditClick = () => {
        history.push(`tasks/${task.id}/edit`)
    }

  return (
    <div> {task ?
      (<div>
        <h1>{task.title}</h1>
        {task.project.title !== "" && (<p>
          <Icon name="pin"/><Link to={`/projects/${task.project.id}`}>{task.project.title}</Link>
          </p>)}
        <p>
        <Icon color="red" name="exclamation"/>{Sorting.displayDateTime(task)} - {task.cue}
        </p>
        {task.steps.filter(step => !step.completed).map(step => (
          <p key={`step-${step.id}`}>
            <Icon name="hand point right outline"/> {step.act}{" "}
            <button
              onClick={() => handleCompleteStepClick(step.id)}
              className="completed-button"
            >
              ✅
            </button>
          </p>
        ))}
        <button onClick={() => handleEditClick()}>Edit task</button>
        <button onClick={() => history.push(`/tasks`)}>To all tasks</button>
      </div>) : (hot ? "You have no outstanding tasks - well done!" : <StallingComponent/>)}
    </div>
  )
}

export default HotTask
