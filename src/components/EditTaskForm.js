import React, { useState, useEffect } from "react"
import UserSettings from '../helpers/UserSettings'
// import PrepData from "../helpers/PrepData"
import Sorting from "../helpers/Sorting"
import API from '../adapters/API'
import "../stylesheets/Form.css"
import { Button } from "semantic-ui-react"

const EditTaskForm = ({tasks, projects, handleUpdateToggle, history, match}) => {
  const [date, setDate] = useState("")
  const [casualTime, setCasualTime] = useState("morning")
  const [preciseTime, setPreciseTime] = useState("")
  const [title, setTitle] = useState("")
  const [cue, setCue] = useState("")
  const [projectId, setProjectId] = useState("")
  const [projectTitle, setProjectTitle] = useState("")

  const task = tasks.find(task => task.id === parseInt(match.params.id))

  const titledOtherProjects = projects.filter(project => project.title !== "" && project.id !== task.project.id)

  useEffect(() => {
    setDate(Sorting.getStringDate(task.actual_time))
    setCasualTime(task.display_time)
    setPreciseTime(Sorting.getStringTime(task.actual_time))
    setTitle(task.title) 
    setCue(task.cue) 
    setProjectId(task.project.id) 
    setProjectTitle(task.project.title) 
  }, [task]);

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const [actual_time, display_time] = prepareTimeData()
  //   API.postProject({title: projectTitle, user_id: userId})
  //   .then(project => {
  //       API.postTask({title, cue, actual_time, display_time, project_id: project.id})
  //       .then(task => {
  //           API.postStep({task_id: task.id, act})
  //           .then(step => {
  //               handleUpdateToggle()
  //               history.push("/all")})
  //       })
  //   })
  // }

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
  const handleProjectTitleChange = e => setProjectTitle(e.target.value)
  const handleProjectIdChange = e => setProjectId(e.target.value)

  const casualTimeButtons = [
    {
      value: "morning",
      display: "Morning"
    },
    {
      value: "afternoon",
      display: "Afternoon"
    },
    {
      value: "evening",
      display: "Evening"
    }
  ]

  const handleSubmit = e => {
    e.preventDefault()
    let taskData = {title, cue, display_time: casualTime, actual_time: `${date} ${preciseTime}` }
    if (projectId === "new") {
      if (task.project.title === "") {
        API.patchProject(task.project.id, {title: projectTitle})
        .then(project => {
          API.patchTask(task.id, {...taskData, project_id: project.id})
        })
        .then(response => handleUpdateToggle())
      } else {
        API.postProject({title: projectTitle})
        .then(project => {
          API.patchTask(task.id, {...taskData, project_id: project.id})
        })
        .then(response => handleUpdateToggle())
      }
    } else {
      API.patchTask(task.id, {...taskData, project_id: projectId})
      .then(response => handleUpdateToggle())
    }
  }

  const handleNewStep = e => {
    e.preventDefault()
    if (e.target.value !== "") {
      console.log(e.target.value)
      API.postStep({act: e.target.value, task_id: task.id})
      .then(step => {
        console.log(step)
        handleUpdateToggle()
      })
    }
  }
  
  const handleDestroyStep = (e, stepId) => {
    API.destroyStep(stepId)
    .then(response => {
      handleUpdateToggle()
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Project:
          <select name="project" onChange={handleProjectIdChange}>
            <option value={task.project.id}>{task.project.title === "" ? "N/A" : task.project.title}</option>
            {titledOtherProjects.map(project => {
              return <option key={project.id} value={project.id}>{project.title}</option>
            })}
            <option value="new">ADD NEW PROJECT</option>
          </select>
          <input className={projectId === "new" ? "visible" : "hidden"} type="text" value={projectTitle} onChange={handleProjectTitleChange}/>
        </label>
        <br/>
        <label>Task Name: <input type="text" value={title} onChange={handleTitleChange}/></label>
        <br/>
        <label>Date: <input type="date" value={date} onChange={handleDateChange}/></label>
        <br/>
        {/* <button>Today</button>
        <button>Tomorrow</button> */}
        <br/>
        <label>Time: <input type="time" value={preciseTime} onChange={handlePreciseTimeChange}/></label>
        <br/>
        {casualTimeButtons.map(b => {
          return <button key={`${b.value}-button`} className={casualTime === b.value ? "green" : "normal"} value={b.value} onClick={handleCasualTimeChange}>{b.display}</button>
        })}
        <br/>
        <label>Cue: <input type="text" value={cue} onChange={handleCueChange}/></label>
        <p>Steps:</p>
        {task.steps.map((step, index) => {
          return <div key={`step-${step.id}`}><label>{index + 1}. <input type="text" value={step.act} onChange={handleCueChange}/><span onClick={e => handleDestroyStep(e, step.id)}>❌</span></label></div>
        })}
        <label>{task.steps.length + 1}. <input type="text" name="step" onBlur={handleNewStep}/></label>
        <br/>
        <input type="submit" value="Save changes"/>
      </form>
    </div>
  )
}

export default EditTaskForm
