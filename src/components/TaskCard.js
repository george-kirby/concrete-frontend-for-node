import React from 'react';
import '../stylesheets/TaskCard.css'

const TaskCard = ({task}) => {
    return (
        <div className="task-card">
            <h4>{task.title}</h4>
            <p>{task.project.title}</p>
            <p>🕑 this {task.display_time}, {task.cue}</p>
        </div>
    );
}

export default TaskCard;
