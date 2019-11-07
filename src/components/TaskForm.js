import React, { useState } from "react"
import { Form } from "semantic-ui-react"
import UserSettings from "../helpers/UserSettings"
import "../stylesheets/Form.css"
// import PrepData from "../helpers/PrepData"
import API from "../adapters/API"
import UpdateUserObject from "../helpers/UpdateUserObject"
import Sorting from '../helpers/Sorting'

const TaskForm = ({ task, history, currentUser, setCurrentUser, editMode }) => {
  const [title, setTitle] = useState(editMode ? task.title : "")
  const [steps, setSteps] = useState(editMode ? Sorting.stepActsFromSteps(Sorting.incompleteSteps(task.steps)) : [""])
  const [date, setDate] = useState(editMode ? Sorting.getStringDate(task.actual_time) : "")
  const [casualTime, setCasualTime] = useState(editMode ? task.display_time : "")
  const [preciseTime, setPreciseTime] = useState(editMode ? Sorting.getStringTime(task.actual_time) : "")
  const [cue, setCue] = useState(editMode ? task.cue : "")

  const casualTimeButtons = [
    { value: "morning", display: "Morning" },
    { value: "afternoon", display: "Afternoon" },
    { value: "evening", display: "Evening" }
  ]

  const handleCasualTimeChange = e => {
    e.preventDefault()
    setCasualTime(e.target.value)
    setPreciseTime(UserSettings[e.target.value])
  }

  const handlePreciseTimeChange = e => {
    setPreciseTime(e.target.value)
    setCasualTime(e.target.value)
  }

  const handleDateChange = e => setDate(e.target.value)
  const handleTitleChange = e => setTitle(e.target.value)
  const handleCueChange = e => setCue(e.target.value)

  const handleStepChange = (e, index) => {
    e.preventDefault()
    let newSteps = [...steps]
    newSteps[index] = e.target.value
    setSteps(newSteps)
  }

  // const newStepField = () => {

  // }

  return (
    <div>
      <Form>
        <Form.Input placeholder="Task name..." value={title} onChange={handleTitleChange} required/>
        <Form.Group>
          <Form.Button>Today</Form.Button>
          <Form.Button>Tomorrow</Form.Button>
          <Form.Input type="date" value={date} min={Sorting.getStringDate(new Date().toISOString())} onChange={handleDateChange} required />
        </Form.Group>
        <Form.Group>
          {casualTimeButtons.map(b => {
            return (
              <Form.Button key={b.value}
                color={casualTime === b.value ? "green" : "grey"}
                value={b.value}
                onClick={handleCasualTimeChange}
              >
                {b.display}
              </Form.Button>
            )
          })}
          <Form.Input type="time" onChange={handlePreciseTimeChange} value={preciseTime} />
        </Form.Group>
        <Form.Input label="Task cue:" placeholder={`eg after dinner`} value={cue} onChange={handleCueChange} required />
        <Form.Input
          label={editMode ? "Steps:" : "What's a concrete first step?"}
          placeholder={`eg sit at desk with laptop`}
          value={steps[0]}
          onChange={e => handleStepChange(e, 0)}
        />
        {steps.slice(1).map((step, index) => {
          return <Form.Input 
          key={`step-${index + 2}`}
          value={steps.slice(1)[index]}
          onChange={e => handleStepChange(e, index + 1)}
          placeholder="new step"/>
        })}
        <Form.Button value="" onClick={e => handleStepChange(e, steps.length)}>Add Step</Form.Button>
        <Form.Button content={editMode ? "Save changes" : "Create task"} />
      </Form>
    </div>
  )
}

export default TaskForm
