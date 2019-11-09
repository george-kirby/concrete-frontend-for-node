import React, { useState, useEffect } from "react"
import TaskCard from "../components/TaskCard"
import { Link } from 'react-router-dom'
import '../stylesheets/TaskList.css'
import Sorting from '../helpers/Sorting'
import { Card, Dropdown, Grid, GridColumn, Progress, Divider, Header, Menu } from 'semantic-ui-react'

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
    {/* <Grid>
      <Grid.Column floated='left' width={3}>
            <Progress size="big" id="overall-progress-bar" color="green" value={3} max ={5} />
      </Grid.Column>
      <Grid.Column floated='right' width={12}> */}
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
                <TaskCard key={task.id} task={task} {...{ setCurrentUser, currentUser }} hot={index === 0} />
              )
            })}
          </div> :
                <div>
                <p>No outstanding tasks - well done!</p>
                <Link to="/new">Add a new task</Link>
              </div>}
        </Card.Group>
      {/* </Grid.Column>
    </Grid> */}
    </div>
  )
}

export default TaskList
