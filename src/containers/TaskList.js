import React, { useState, useEffect } from "react"
import TaskCard from "../components/TaskCard"
import { Link } from 'react-router-dom'
import '../stylesheets/List.css'
import Sorting from '../helpers/Sorting'
import { Card, Menu, Dropdown } from 'semantic-ui-react'

const TaskList = ({ tasks, setCurrentUser, currentUser, tags }) => {

  const [filters, setFilters] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const tagOptions = tags.map(tag => {
    return {
      key: tag,
      value: tag,
      text: tag
    }
  })

  useEffect(() => {
    setFilteredTasks(Sorting.applyFilter(tasks, filters))
    }, [filters]);

  const handleFilterChange = (e, data) => {
    console.log(data.value)
    setFilters(data.value)
  }

  return (
    <div>
      {/* <Menu>
        <Menu.Item>
          <Link to="/tasks">TASKS</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/projects">Projects</Link>
        </Menu.Item>
      </Menu> */}
      <Dropdown
      placeholder='Filter by tags'
      fluid
      multiple
      search
      selection
      options={tagOptions}
      onChange={handleFilterChange}
      />
      <Card.Group>
        {filteredTasks.length > 0 ? 
        <div>
          {filteredTasks.map((task, index) => {
            return (
              <TaskCard key={task.id} task={task} {...{ setCurrentUser, currentUser }} hot={index === 0} />
            )
          })}
        </div> : "No outstanding tasks - well done!"}
      </Card.Group>
    </div>
  )
}

export default TaskList
