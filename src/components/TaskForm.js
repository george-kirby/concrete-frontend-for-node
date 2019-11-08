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
  const [incompleteSteps, setIncompleteSteps] = useState(editMode ? task.incomplete_steps : [""])
  const [date, setDate] = useState(editMode ? Sorting.getStringDate(task.actual_time) : "")
  const [casualTime, setCasualTime] = useState(editMode ? task.display_time : "")
  const [preciseTime, setPreciseTime] = useState(editMode ? Sorting.getStringTime(task.actual_time) : "")
  const [cue, setCue] = useState(editMode ? task.cue : "")

  const casualTimeButtons = [
    { value: "morning", display: "Morning" },
    { value: "afternoon", display: "Afternoon" },
    { value: "evening", display: "Evening" }
  ]

  const handleSubmit = e => {
    e.preventDefault()
    const actual_time = `${date} ${preciseTime}`
    const taskData = {
      title,
      cue,
      actual_time,
      display_time : casualTime,
      incomplete_steps: JSON.stringify(incompleteSteps)
    }
    editMode ?
      API.patchTask(task.id, taskData)
      .then(task => {
        setCurrentUser({...currentUser, tasks: UpdateUserObject.patchedTask(task, currentUser)})
      })
    : 
      API.postTask({
        user_id: currentUser.id,
        ...taskData
      })
      .then(task => {
        setCurrentUser({...currentUser, tasks: UpdateUserObject.postedTask(task, currentUser)})
      })
    editMode ? history.go(-1) : history.push("/tasks")
  }

  const handleCasualTimeChange = e => {
    e.preventDefault()
    setCasualTime(e.target.value)
    setPreciseTime(UserSettings[e.target.value])
  }

  const handlePreciseTimeChange = e => {
    setPreciseTime(e.target.value)
    setCasualTime(e.target.value)
  }

  const todayString = () => {
    return new Date().toISOString().slice(0, 10)
  }

  const tomorrowString = () => {
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().slice(0, 10)
  }

  const handleDateChange = e => {
    e.preventDefault()
    setDate(e.target.value)
  }

  const handleTitleChange = e => setTitle(e.target.value)
  const handleCueChange = e => setCue(e.target.value)

  const handleStepChange = (e, index) => {
    e.preventDefault()
    let newIncompleteSteps = [...incompleteSteps]
    newIncompleteSteps[index] = e.target.value
    setIncompleteSteps(newIncompleteSteps)
  }

  const handleDestroyTask = e => {
    let result = window.confirm("Are you sure you want to delete this task?")
    if (result) {
      API.destroyTask(task.id).then(task => {
      setCurrentUser({
        ...currentUser,
        projects: UpdateUserObject.destroyedTask(task, currentUser)
      })
      })
      history.push("/tasks")
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
      {/* <Form> */}
        <Form.Input placeholder="Task name..." value={title} onChange={handleTitleChange} required/>
        <Form.Group>
          <Form.Button value={todayString()} color={date === todayString() ? "green" : "grey"} onClick={e => handleDateChange(e)}>Today</Form.Button>
          <Form.Button value={tomorrowString()} color={date === tomorrowString() ? "green" : "grey"} onClick={e => handleDateChange(e)}>Tomorrow</Form.Button>
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
          value={incompleteSteps[0]}
          onChange={e => handleStepChange(e, 0)}
        />
        {incompleteSteps.slice(1).map((step, index) => {
          return <Form.Input 
          key={`step-${index + 2}`}
          value={incompleteSteps.slice(1)[index]}
          onChange={e => handleStepChange(e, index + 1)}
          placeholder={`step ${index + 2}`}/>
        })}

{/* add tags */}

        <Form.Button value="" onClick={e => handleStepChange(e, incompleteSteps.length)} content="Add another Step"/>
        <Form.Button color="green" content={editMode ? "Save changes" : "Create task"} />
      </Form>
        {editMode && <Form.Button onClick={handleDestroyTask} color="red" content="Delete task"/>}
    </div>
  )
}

export default TaskForm
