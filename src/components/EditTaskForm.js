import React, { useState, useEffect } from "react"
import UserSettings from "../helpers/UserSettings"
// import PrepData from "../helpers/PrepData"
import Sorting from "../helpers/Sorting"
import API from "../adapters/API"
import "../stylesheets/Form.css"
import { Button } from "semantic-ui-react"

const EditTaskForm = ({
  tasks,
  projects,
  handleUpdateToggle,
  history,
  match,
  currentUser,
  setCurrentUser
}) => {
  const [date, setDate] = useState("")
  const [casualTime, setCasualTime] = useState("morning")
  const [preciseTime, setPreciseTime] = useState("")
  const [title, setTitle] = useState("")
  const [cue, setCue] = useState("")
  const [projectId, setProjectId] = useState("")
  const [projectTitle, setProjectTitle] = useState("")
  const [steps, setSteps] = useState([])

  const task = tasks.find(task => task.id === parseInt(match.params.id))

  const titledOtherProjects = projects.filter(
    project => project.title !== "" && project.id !== task.project.id
  )

  useEffect(() => {
    setDate(Sorting.getStringDate(task.actual_time))
    setCasualTime(task.display_time)
    setPreciseTime(Sorting.getStringTime(task.actual_time))
    setTitle(task.title)
    setCue(task.cue)
    setProjectId(task.project.id)
    setProjectTitle(task.project.title)
    setSteps(task.steps)
  }, [task])

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
    let taskData = {
      title,
      cue,
      display_time: casualTime,
      actual_time: `${date} ${preciseTime}`
    }
    let stepsToPatch = steps.filter(step => {
      return (
        step.act !== task.steps.find(origStep => origStep.id === step.id).act
      )
    })
    if (projectId === "new") {
      if (task.project.title === "") {
        API.patchProject(task.project.id, { title: projectTitle })
          .then(project => {
            API.patchTask(task.id, { ...taskData, project_id: project.id })
          })
          .then(resp => patchSteps(stepsToPatch))
          // .then(response => handleUpdateToggle())
      } else {
        API.postProject({ title: projectTitle })
          .then(project => {
            API.patchTask(task.id, { ...taskData, project_id: project.id })
          })
          .then(resp => patchSteps(stepsToPatch))
          // .then(response => handleUpdateToggle())
      }
    } else {
      API.patchTask(task.id, { ...taskData, project_id: projectId })
        .then(resp => patchSteps(stepsToPatch))
        // .then(response => handleUpdateToggle())
    }
  }

  const patchSteps = steps => {
    steps.forEach(step => {
      API.patchStep(step.id, { act: step.act }).then(updatedStep => {
      let newProjects = [...currentUser.projects]
      let projectIndex = newProjects.findIndex(p => p.id === updatedStep.task.project.id)
      let newTasks = [...newProjects[projectIndex].tasks]
      let taskIndex = newTasks.findIndex(t => t.id === updatedStep.task.id)
      let newSteps = [...newTasks[taskIndex].steps]
      let stepIndex = newSteps.findIndex(s => s.id === updatedStep.id)

      newSteps[stepIndex] = updatedStep
      newTasks[taskIndex].steps = newSteps
      newProjects[projectIndex].tasks = newTasks
        setCurrentUser({...currentUser, projects: newProjects})
      })
    })
  }

  const handleStepEdit = (e, stepId) => {
    console.log(`step ${stepId}'s act changed to ${e.target.value}`)
    let indexToUpdate = steps.indexOf(steps.find(step => step.id === stepId))
    let newSteps = [...steps]
    newSteps[indexToUpdate] = { id: stepId, act: e.target.value }
    setSteps(newSteps)
  }

  const handleNewStep = e => {
    e.preventDefault()
    if (e.target.value !== "") {
      console.log(e.target.value)
      API.postStep({ act: e.target.value, task_id: task.id }).then(step => {
        console.log(step)
        handleUpdateToggle()
      })
    }
  }

  // const handleNewStep = e => {
  //   e.preventDefault()
  //   if (e.target.value !== "") {
  //     setSteps([...steps, {act: e.target.value}])
  //   }
  // }

  const handleDestroyTask = e => {
    window.confirm("Are you sure you want to delete this task?")
    if (task.project.title === "") {
      API.destroyProject(task.project.id).then(response => {
        history.push("/tasks")
        handleUpdateToggle()
      })
    } else {
      API.destroyTask(task.id).then(response => {
        history.push(`/projects/${task.project.id}`)
        handleUpdateToggle()
      })
    }
  }

  const handleDestroyStep = (e, stepId) => {
    API.destroyStep(stepId).then(response => {
      handleUpdateToggle()
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Project:
          <select name="project" onChange={handleProjectIdChange}>
            <option value={task.project.id}>
              {task.project.title === "" ? "N/A" : task.project.title}
            </option>
            {titledOtherProjects.map(project => {
              return (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              )
            })}
            <option value="new">ADD NEW PROJECT</option>
          </select>
          <input
            className={projectId === "new" ? "visible" : "hidden"}
            type="text"
            value={projectTitle}
            onChange={handleProjectTitleChange}
          />
        </label>
        <br />
        <label>
          Task Name:{" "}
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Date: <input type="date" value={date} onChange={handleDateChange} />
        </label>
        <br />
        {/* <button>Today</button>
        <button>Tomorrow</button> */}
        <br />
        <label>
          Time:{" "}
          <input
            type="time"
            value={preciseTime}
            onChange={handlePreciseTimeChange}
          />
        </label>
        <br />
        {casualTimeButtons.map(b => {
          return (
            <button
              key={`${b.value}-button`}
              className={casualTime === b.value ? "green" : "normal"}
              value={b.value}
              onClick={handleCasualTimeChange}
            >
              {b.display}
            </button>
          )
        })}
        <br />
        <label>
          Cue: <input type="text" value={cue} onChange={handleCueChange} />
        </label>
        <p>Steps:</p>
        {steps.map((step, index) => {
          return (
            <div key={`step-${step.id}`}>
              <label>
                {index + 1}.{" "}
                <input
                  type="text"
                  value={steps[index].act}
                  onChange={e => handleStepEdit(e, step.id)}
                />
                <span onClick={e => handleDestroyStep(e, step.id)}>❌</span>
              </label>
            </div>
          )
        })}
        <label>
          {task.steps.length + 1}.{" "}
          <input type="text" name="step" onBlur={handleNewStep} />
        </label>
        <br />
        <input type="submit" value="Save changes" />
      </form>
      <button onClick={handleDestroyTask}>Delete Task</button>
    </div>
  )
}

export default EditTaskForm
