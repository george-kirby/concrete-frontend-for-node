import React from 'react';
import '../stylesheets/TaskCard.css'
import API from '../adapters/API'

const TaskCard = ({task, handleUpdateToggle, setSelectedTaskId}) => {

    const handleCompleteClick = taskId => {
        console.log(`task ${taskId} complete!`)
        task.steps.forEach(step => {
            API.patchStep(step.id, {completed: true})
        });
        handleUpdateToggle()
    }

    return (
        <div className="task-card" onClick={() => setSelectedTaskId(task.id)}>
            <h4>{task.title}</h4>
            <p>{task.project.title}</p>
            <p>🕑 this {task.display_time}, {task.cue}</p>
            <button onClick={() => handleCompleteClick(task.id)} className="completed-button">✅</button>
        </div>
    );
}

export default TaskCard;
