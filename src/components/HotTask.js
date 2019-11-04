import React from "react"
import API from '../adapters/API'

const HotTask = ({ task, setSelectedTaskId, handleUpdateToggle }) => {

    const handleCompleteStepClick = stepId => {
        console.log(`step ${stepId} complete!`)
        API.patchStep(stepId, {completed: true})
        handleUpdateToggle()
    }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>
        ❗this {task.display_time}, {task.cue}
      </p>
      {task.steps.map(step => (
        <p>
          👉 {step.act}{" "}
          <button
            onClick={() => handleCompleteStepClick(step.id)}
            className="completed-button"
          >
            ✅
          </button>
        </p>
      ))}
      <button onClick={() => setSelectedTaskId(null)}>To all tasks</button>
    </div>
  )
}

export default HotTask
