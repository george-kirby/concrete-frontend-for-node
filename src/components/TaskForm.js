import React from 'react';
import { Form } from 'semantic-ui-react'
import UserSettings from '../helpers/UserSettings'
import "../stylesheets/Form.css"
// import PrepData from "../helpers/PrepData"
import API from '../adapters/API'
import UpdateUserObject from '../helpers/UpdateUserObject'

const TaskForm = () => {
    return (
        <div>
            <Form>
        <Form.Input placeholder="Task name..."/>
        <Form.Input label="What's a concrete first step?" placeholder={`eg sit at desk with laptop`}/>
        <Form.Group>
          <Form.Button>Today</Form.Button>
          <Form.Button>Tomorrow</Form.Button>
          <Form.Input type="date" onChange={e => console.log(e.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Button disabled={true}>Morning</Form.Button>
          <Form.Button disabled={false}>Afternoon</Form.Button>
          <Form.Button>Evening</Form.Button>
          <Form.Input type="time" onChange={e => console.log(e.target.value)}/>
        </Form.Group>
        <Form.Input label="Task cue:" placeholder={`eg after dinner`}/>
          <Form.Button content="Create task"/> 
          {/* ^ editMode ? "Save changes" : "Create task" */}
      </Form>
        </div>
    );
}

export default TaskForm;
