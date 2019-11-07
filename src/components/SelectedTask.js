import React from "react"
// import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom"
import API from "../adapters/API"
import StallingComponent from "./StallingComponent"
import UpdateUserObject from "../helpers/UpdateUserObject"
import Sorting from "../helpers/Sorting"
import { Icon } from "semantic-ui-react"

const SelectedTask = ({ hot, task, setCurrentUser, currentUser, history }) => {
  const handleCompleteStepClick = stepId => {
    API.patchStep(stepId, { completed: true }).then(step =>
      setCurrentUser({
        ...currentUser,
        projects: UpdateUserObject.patchedStep(step, currentUser)
      })
    )
  }

  const handleEditClick = () => {
    history.push(`/tasks/${task.id}/edit`)
  }

  return (
    <div>
      {" "}
      {task ? (
        <div>
          <h1>{task.title}</h1>
          {task.tags.length > 0 && (
            <p>
              <Icon name="pin" />
              {task.tags}
            </p>
          )}
          <p>
            <Icon color="red" name="exclamation" />
            {Sorting.displayDateTime(task)} - {task.cue}
          </p>
          {task.incomplete_steps
            .map((step, index) => (
              <p key={`step-${index + 1}`}>
                <Icon name="hand point right outline" /> {step}{" "}
                {/* <button
                  onClick={() => handleCompleteStepClick(step.id)}
                  className="completed-button"
                >
                  <Icon name="check" color='green'/>
                </button> */}
              </p>
            ))}
          <button onClick={() => handleEditClick()}>Edit task</button>
          <button onClick={() => history.push(`/tasks`)}>To all tasks</button>
        </div>
      ) : (hot ? (
        "You have no outstanding tasks - well done!"
      ) : (
        <StallingComponent />
      ))}
    </div>
  )
}

export default SelectedTask
