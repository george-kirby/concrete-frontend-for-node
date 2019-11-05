import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sorting from '../helpers/Sorting'
import '../stylesheets/SelectedProject.css'
import API from '../adapters/API'

const SelectedProject = ({projects, history, handleUpdateToggle}) => {

    const [progress, setProgress] = useState(1);

    const {id} = useParams()
    const project = projects.find(project => project.id === parseInt(id))

    useEffect(() => {
        setProgress(((project.tasks.length - Sorting.incompleteTasks(project.tasks).length) / project.tasks.length) * 100)
    }, []);

    const sortedIncompleteTasks = Sorting.orderTasks(Sorting.incompleteTasks(project.tasks))

    const urgentTask = sortedIncompleteTasks[0]
    const otherIncompleteTasks = sortedIncompleteTasks.slice(1)

    const handleCompleteTaskClick = task => {
        task.steps.forEach(step => {
            API.patchStep(step.id, {completed: true})
        });
        handleUpdateToggle()
    }

    const taskActions = (task) => {
        return <div className="task-actions">
                <button onClick={() => history.push(`/tasks/${task.id}`)} className="details-button">👁️</button>
                <button onClick={() => handleCompleteTaskClick(task)} className="completed-button">✅</button>
            </div>
    }

    return (
        <div>
            <h1>{project.title}</h1>
            <div id="progress-bar-container"><div id="progress-bar" style={{width: `${progress - 1}%`}}></div>
            </div>
            <br/>
            {urgentTask ? (<div id="most-urgent-task-card">
                <h4>{urgentTask.title}</h4>
                <p>❗this {urgentTask.display_time}, {urgentTask.cue}</p>
            <p>👉 {urgentTask.steps[0].act}</p>
            {taskActions(urgentTask)}
            </div>) : "Project complete!"}
            {otherIncompleteTasks.map(task => {
                return <div className="task-card">
                    <h5>{task.title}</h5>
                    <p>🕑 this {task.display_time}, {task.cue}</p>
                    {taskActions(task)}
                </div>
            })}
            <br/>
            <button onClick={() => history.push("/projects")}>All projects</button>
        </div>
    )
}

export default SelectedProject