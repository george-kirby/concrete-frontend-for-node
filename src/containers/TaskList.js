import React, { useState, useEffect } from "react"
import TaskCard from "../components/TaskCard"
import { Link } from 'react-router-dom'
import '../stylesheets/TaskList.css'
import Sorting from '../helpers/Sorting'
import { Card, Dropdown, Menu } from 'semantic-ui-react'
import API from '../adapters/API'
import UpdateUserObject from '../helpers/UpdateUserObject'

const TaskList = ({ tasks, setCurrentUser, currentUser, tags }) => {

  const [filters, setFilters] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dropZoneTask, setDropZoneTask] = useState(null);

  const tagOptions = tags.map(tag => {
    return {
      key: tag,
      value: tag,
      text: tag
    }
  })

  const basicProgressPercentage = ((currentUser.tasks.length - tasks.length) / currentUser.tasks.length) * 100

  useEffect(() => {
    setFilteredTasks(Sorting.applyFilter(tasks, filters))
    }, [filters]);

  const handleFilterChange = (e, data) => {
    setFilters(data.value)
  }

  const handleCompleteTaskDrag = (task) => {
    let newCompleteSteps = [...task.completeSteps]
    task.incompleteSteps.forEach(step => {
      newCompleteSteps = [...newCompleteSteps, step]
    })
    API.patchTask(task.id, {completeSteps: JSON.stringify(newCompleteSteps), incompleteSteps: "[]"})
    .then(task => {
      setCurrentUser({...currentUser, tasks: UpdateUserObject.patchedTask(task, currentUser)})
    })
  }

  const handleDragEnter = e => {
    setDropZoneTask(draggedTask)
  }
  
  const handleDragLeave = e => {
    e.preventDefault()
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    handleCompleteTaskDrag(dropZoneTask)
  }

  const handleDragOver = e => {
    e.preventDefault()
  }

  return (
      <div id="index-container">
        <div id="progress-bar-container" onDragOver={handleDragOver} onDrop={handleDrop} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
          <div id="progress-bar" style={{height: `${100 - basicProgressPercentage}%`}}>
          </div>
        </div>
        <div id="tasks-container">
          <Menu id="filter-menu">
            <Dropdown
            placeholder='Filter by tags'
            fluid
            multiple
            search
            selection
            options={tagOptions}
            onChange={handleFilterChange}
            closeOnChange
            />
          </Menu>
            {filteredTasks.length > 0 ? 
          <Card.Group id="task-list">
              {filteredTasks.map((task, index) => {
                return (
                  <TaskCard key={task.id} task={task} {...{ setCurrentUser, currentUser, setDraggedTask }} hot={index === 0} />
                )
              })}
          </Card.Group>
            :
                  <div>
                  <p>No outstanding tasks - well done!</p>
                  <Link to="/new">Add a new task</Link>
                </div>}
        </div>
    </div>
  )
}

export default TaskList
