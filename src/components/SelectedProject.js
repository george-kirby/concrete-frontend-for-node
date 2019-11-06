import React, { useState, useEffect } from "react"
import Sorting from "../helpers/Sorting"
import "../stylesheets/SelectedProject.css"
import API from "../adapters/API"
import UpdateUserObject from '../helpers/UpdateUserObject'

const SelectedProject = ({ project, setCurrentUser, currentUser, history }) => {
  const [progress, setProgress] = useState(1)
  const [editMode, setEditMode] = useState(false)
  const [projectTitle, setProjectTitle] = useState("")

  useEffect(() => {
    setProgress(
      ((project.tasks.length - Sorting.incompleteTasks(project.tasks).length) /
        project.tasks.length) *
        99
    )
    setProjectTitle(project.title)
  }, [])

  const sortedIncompleteTasks = Sorting.orderTasks(
    Sorting.incompleteTasks(project.tasks)
  )

  const urgentTask = sortedIncompleteTasks[0]
  const otherIncompleteTasks = sortedIncompleteTasks.slice(1)

  const handleCompleteTaskClick = task => {
    task.steps.forEach(step => {
      API.patchStep(step.id, { completed: true })
      .then(step => setCurrentUser({...currentUser, projects: UpdateUserObject.patchedStep(step, currentUser)}))
    })
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleProjectTitleChange = e => setProjectTitle(e.target.value)

  const handleEditTitleSubmit = e => {
      e.preventDefault()
      if (projectTitle !== project.title) {
        API.patchProject(project.id, {title: projectTitle})
        .then(project => setCurrentUser({...currentUser, projects: UpdateUserObject.patchedProject(project, currentUser)}))
      }
      toggleEditMode()
  }
  
  const handleEditCancel = () => {
      setProjectTitle(project.title)
      toggleEditMode()
  }

  const taskActions = task => {
    return (
      <div className="task-actions">
        <button
          onClick={() => history.push(`/tasks/${task.id}`)}
          className="details-button"
        >
          👁️
        </button>
        <button
          onClick={() => handleCompleteTaskClick(task)}
          className="completed-button"
        >
          ✅
        </button>
      </div>
    )
  }

  return (
    <div>
      {editMode ? (
        <form onSubmit={handleEditTitleSubmit}>
          <input type="text" value={projectTitle} onChange={handleProjectTitleChange} />
          <input type="submit" value="Save"/>
          <button onClick={handleEditCancel}>Cancel</button>
        </form>
      ) : (
        <div>
          <h1>{project.title} </h1>
          <button onClick={toggleEditMode}>Edit Title</button>
        </div>
      )}

      <div id="progress-bar-container">
        <div id="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <br />
      {urgentTask ? (
        <div id="most-urgent-task-card">
          <h4>{urgentTask.title}</h4>
          <p>
            ❗{Sorting.displayDateTime(urgentTask)} - {urgentTask.cue}
          </p>
          <p>👉 {urgentTask.steps[0].act}</p>
          {taskActions(urgentTask)}
        </div>
      ) : (
        "Project complete!"
      )}
      {otherIncompleteTasks.map(task => {
        return (
          <div className="task-card" key={task.id}>
            <h5>{task.title}</h5>
            <p>
              🕑 {Sorting.displayDateTime(task)} - {task.cue}
            </p>
            {taskActions(task)}
          </div>
        )
      })}
      <br />
      <button onClick={() => history.push("/projects")}>All projects</button>
    </div>
  )
}

export default SelectedProject
