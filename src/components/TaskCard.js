import React from 'react';
import { useHistory, Link } from 'react-router-dom'
import '../stylesheets/TaskCard.css'
import API from '../adapters/API'
import UpdateUserObject from "../helpers/UpdateUserObject"
import Sorting from '../helpers/Sorting'
import { Card, Icon } from 'semantic-ui-react'

const TaskCard = ({task, setCurrentUser, currentUser, hot}) => {

    const history = useHistory()

    const handleCompleteTaskClick = task => {
        task.steps.forEach(step => {
            API.patchStep(step.id, {completed: true})
            .then(responseStep => {
                setCurrentUser({
                  ...currentUser,
                  projects: UpdateUserObject.patchedStep(responseStep, currentUser)
                })
              })
        });
    }

    return (
        <Card fluid color={hot ? "orange" : "blue"}>
            <Card.Content>
            <Card.Header>{task.title}</Card.Header>
            <p><Icon name="clock outline"/>  {Sorting.displayDateTime(task)} - {task.cue}</p>
            <div className="task-actions">
                {/* <button onClick={() => history.push(`tasks/${task.id}`)} className="details-button">👁️</button>
                <button onClick={() => handleCompleteTaskClick(task)} className="completed-button">✅</button> */}
            </div>
            </Card.Content>
        </Card>
);
}

export default TaskCard;
