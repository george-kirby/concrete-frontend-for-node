import React, { useState, useEffect } from "react"
import TaskCard from "../components/TaskCard"
import { Link } from 'react-router-dom'
import '../stylesheets/TaskList.css'
import Sorting from '../helpers/Sorting'
import { Card, Dropdown, Grid, GridColumn, Progress, Divider, Header, Menu } from 'semantic-ui-react'
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
    let newCompleteSteps = [...task.complete_steps]
    task.incomplete_steps.forEach(step => {
      newCompleteSteps = [...newCompleteSteps, step]
    })
    API.patchTask(task.id, {complete_steps: JSON.stringify(newCompleteSteps), incomplete_steps: "[]"})
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
      <div>
    <Grid>
      <Grid.Column floated='left' width={3}>
            {/* <Progress size="big" id="overall-progress-bar" color="green" value={3} max ={5} /> */}
        <div id="progress-bar-container" onDragOver={handleDragOver} onDrop={handleDrop} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
        <div id="progress-bar" style={{height: `${basicProgressPercentage}%`}}>
        </div>
        </div>
      </Grid.Column>
      <Grid.Column floated='right' width={12}>
        <Menu fixed="top">
          <Dropdown
          placeholder='Filter by tags'
          fluid
          multiple
          search
          selection
          options={tagOptions}
          onChange={handleFilterChange}
          />
        </Menu>
        <Divider horizontal>
          <Header as="h5" float="left">
            Today
          </Header>
        </Divider>
        <Card.Group id="task-list">
          {filteredTasks.length > 0 ? 
          <div>
            {filteredTasks.map((task, index) => {
              return (
                <TaskCard key={task.id} task={task} {...{ setCurrentUser, currentUser, setDraggedTask }} hot={index === 0} />
              )
            })}
          </div> :
                <div>
                <p>No outstanding tasks - well done!</p>
                <Link to="/new">Add a new task</Link>
              </div>}
        </Card.Group>
      </Grid.Column>
    </Grid>
    </div>
  )
}

export default TaskList
