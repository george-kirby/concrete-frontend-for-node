import React, { useState, createRef } from "react"
import { Form, Icon, Dropdown, Header, Menu, Button, Popup } from "semantic-ui-react"
import UserSettings from "../helpers/UserSettings"
import "../stylesheets/TaskForm.css"
import API from "../adapters/API"
import UpdateUserObject from "../helpers/UpdateUserObject"
import Sorting from '../helpers/Sorting'
import UserGuidance from '../helpers/UserGuidance'

const TaskForm = ({ task, history, currentUser, setCurrentUser, editMode, existingTags }) => {
  const [title, setTitle] = useState(editMode ? task.title : "")
  const [incompleteSteps, setIncompleteSteps] = useState(editMode ? task.incomplete_steps : [""])
  const [date, setDate] = useState(editMode ? Sorting.getStringDate(task.actual_time) : "")
  const [casualTime, setCasualTime] = useState(editMode ? task.display_time : "")
  const [preciseTime, setPreciseTime] = useState(editMode ? Sorting.getStringTime(task.actual_time) : "")
  const [cue, setCue] = useState(editMode ? task.cue : "")

  const [selectedExistingTags, setSelectedExistingTags] = useState(editMode ? task.tags : [])
  const [tagSearch, setTagSearch] = useState("")

  const [tutorialMode, setTutorialMode] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(0)

  const [existingTagOptions, setExistingTagOptions] = useState(existingTags.map(tag => {
    return {
      key: tag,
      value: tag,
      text: tag
    }
  }))

  const toggleTutorial = () => {
    setTutorialMode(!tutorialMode)
  }

  const decrementTutorialStep = () => {
    setTutorialStep(tutorialStep - 1)
  }

  const incrementTutorialStep = () => {
    setTutorialStep(tutorialStep + 1)
  }

  const taskNameRef = createRef()
  const stepsRef = createRef()

  const handleExistingTagsSelection = (e, { value }) => {
    setSelectedExistingTags(value)
    setTagSearch("")
  }
  
  const handleTagsSearchChange = (e, { searchQuery }) => {
    setTagSearch(searchQuery)
  }

  const handleNewTag = e => {
    e.preventDefault()
    if (existingTagOptions.some(option => option.value === tagSearch)) {
      window.alert(`Tag "${tagSearch}" already exists!`)
    } else {
      setSelectedExistingTags([...selectedExistingTags, tagSearch])
      setExistingTagOptions([...existingTagOptions, {
        key: tagSearch,
        value: tagSearch,
        text: tagSearch,
      }])
      setTagSearch("")
    }
  }

  const casualTimeButtons = [
    { value: "morning", display: "Morning" },
    { value: "afternoon", display: "Afternoon" },
    { value: "evening", display: "Evening" }
  ]

  const handleSubmit = e => {
    e.preventDefault()
    const actual_time = `${date} ${preciseTime}`
    let tagData = [...selectedExistingTags].filter(tag => tag !== "")
    let stepsData = incompleteSteps.filter(step => step !== "")
    const taskData = {
      title,
      cue,
      actual_time,
      display_time : casualTime,
      incomplete_steps: JSON.stringify(stepsData),
      tags: JSON.stringify(tagData)
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

  const handleStepRemoval = (e, index) => {
    e.preventDefault()
    let newIncompleteSteps = [...incompleteSteps]
    newIncompleteSteps.splice(index, 1)
    if (newIncompleteSteps === []) {newIncompleteSteps = [""]}
    setIncompleteSteps(newIncompleteSteps)
  }

  const handleDestroyTask = e => {
    e.preventDefault()
    let result = window.confirm("Are you sure you want to delete this task?")
    if (result) {
      API.destroyTask(task.id).then(response => {
        console.log(response)
      setCurrentUser({
        ...currentUser,
        tasks: UpdateUserObject.destroyedTask(task, currentUser)
      })
      })
      history.push("/tasks")
    }
  }

  const popupTrigger = <Button onClick={e => e.preventDefault()} className="popup-button" icon="question circle"/>

  const tutorialPrevious = <Button onClick={decrementTutorialStep} icon="chevron left"/>
  const tutorialNext = <Button onClick={incrementTutorialStep} icon="chevron right"/>
  const tutorialClose = <Button onClick={() => setTutorialStep(0)} icon="close"/>

  const tutorialNavigateButtons = 
    <div>
      {tutorialPrevious}
      {tutorialNext}
      {tutorialClose}
    </div>

  return (
    <div id="form-container">
      {/* <Menu fixed="top"> */}
        <div id="header-container">
          <Header as="h1" content={editMode ? "Edit task" : "New task"} />   
                 <Popup on="click" open={tutorialStep === 1} onOpen={() => setTutorialStep(1)} trigger={<Button color="blue" icon="book" content="Tutorial"/>}>
            <p><strong>{UserGuidance.concrete}</strong> {UserGuidance.tutorialStart}</p>
            {tutorialNext}
            {tutorialClose}
          </Popup>
        </div>
        {/* </Menu> */}
      <Form id="form" onSubmit={handleSubmit}>
      {/* <Form> */}
        <p ref={taskNameRef}>Task name: 
        <Popup on="click" open={tutorialStep === 2} onOpen={() => setTutorialStep(2)}  trigger={popupTrigger}>
          <p>{UserGuidance.title1}</p>
          <p>{UserGuidance.title2} <strong id="popup-link" onClick={() => setTutorialStep(6)}>{UserGuidance.title3}</strong>.</p>
          {tutorialNavigateButtons}
        </Popup></p>
        <Form.Input placeholder="Name..." value={title} onChange={handleTitleChange} required/>
        <p ref={stepsRef}>{editMode ? "Steps:" : "Concrete first step:"} 
        <Popup on="click" position="right center" open={tutorialStep === 3} onOpen={() => setTutorialStep(3)}  trigger={popupTrigger}>
          <p>{UserGuidance.concreteStep}</p>
          {tutorialNavigateButtons}
        </Popup>
        </p>
        <Form.Group>
          <Form.Input
            // label={editMode ? "Steps:" : "What's a concrete first step?"}
            placeholder={`eg sit at desk with laptop`}
            value={incompleteSteps[0]}
            onChange={e => handleStepChange(e, 0)}
            required
          />
          <Form.Button icon="close" onClick={e => handleStepRemoval(e, 0)}/>
        </Form.Group>
        {incompleteSteps.slice(1).map((step, index) => {
          return <Form.Group key={`step-${index + 2}`}>
            <Form.Input 
            value={incompleteSteps.slice(1)[index]}
            onChange={e => handleStepChange(e, index + 1)}
            placeholder={`step ${index + 2}`}/>
            <Form.Button icon="close" onClick={e => handleStepRemoval(e, index + 1)}/>
          </Form.Group>
        })}
        <Form.Button value="" onClick={e => handleStepChange(e, incompleteSteps.length)} content={"Add another step"}/>
        {editMode ? "Action time:" : "When will you do this?"} 
        <Popup on="click" open={tutorialStep === 4} onOpen={() => setTutorialStep(4)} trigger={popupTrigger}>
          <p>{UserGuidance.actionTime}</p>
          {tutorialNavigateButtons}
        </Popup>
        <Form.Group>
          <Form.Button value={todayString()} color={date === todayString() ? "green" : "grey"} onClick={e => handleDateChange(e)}>Today</Form.Button>
          <Form.Button value={tomorrowString()} color={date === tomorrowString() ? "green" : "grey"} onClick={e => handleDateChange(e)}>Tomorrow</Form.Button>
          <Form.Input type="date" value={date} min={Sorting.getStringDate(new Date().toISOString())} onChange={handleDateChange} required />
        <Icon name="calendar alternate outline" size="large"/>
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
          <Form.Input type="time" onChange={handlePreciseTimeChange} value={preciseTime} required/>
          <Icon name="clock" size="large"/>
        </Form.Group>
        Task cue: <Popup on="click" open={tutorialStep === 5} onOpen={() => setTutorialStep(5)}  trigger={popupTrigger}>
          <p>{UserGuidance.cue}</p>
          {tutorialNavigateButtons}
        </Popup>
        <Form.Input placeholder={`eg after washing up the dishes`} value={cue} onChange={handleCueChange} required />
        Tags: 
        <Popup on="click" open={tutorialStep === 6} onOpen={() => setTutorialStep(6)}  trigger={popupTrigger}>
        <p>{UserGuidance.tasks}</p>
        {tutorialPrevious}
        <Button onClick={() => setTutorialStep(0)} icon="flag checkered"/>
        </Popup>
        {/* <Form.Group> */}
          {/* <Icon name="tags"/> */}
          <Dropdown
          // style={{width: "60%"}}
          fluid
        multiple
        search
        searchQuery={tagSearch}
        selection
        options={existingTagOptions}
        onChange={handleExistingTagsSelection}
        onSearchChange={handleTagsSearchChange}
        value={selectedExistingTags}
        closeOnChange
        />
        <Form.Button style={{marginTop: tagSearch !== "" && "3rem"}} disabled={tagSearch === ""} onClick={handleNewTag} content={`Add "${tagSearch}" as new tag`}/>
        {/* </Form.Group> */}
      <br/><br/>
        <Form.Button color="green" content={editMode ? "Save changes" : "Create task"} />
      </Form>
        {editMode && <Form.Button onClick={handleDestroyTask} color="red" content="Delete task"/>}
    </div>
  )
}

export default TaskForm
