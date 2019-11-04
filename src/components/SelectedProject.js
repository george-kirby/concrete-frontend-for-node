import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sorting from '../helpers/Sorting'
import '../stylesheets/SelectedProject.css'

const SelectedProject = ({projects, history}) => {

    const [progress, setProgress] = useState(50);

    const {id} = useParams()
    const project = projects.find(project => project.id === parseInt(id))

    // useEffect(() => {
    //     setProgress(((project.tasks.length - Sorting.incompleteTasks(project.tasks).length) / project.tasks.length) * 100)
    // }, []);

    const sortedIncompleteTasks = Sorting.orderTasks(Sorting.incompleteTasks(project.tasks))

    const urgentTask = sortedIncompleteTasks[0]
    const otherIncompleteTasks = sortedIncompleteTasks.slice(1)


    return (
        <div>
            <h1>{project.title}</h1>
            <div id="progress-bar-container"><div id="progress-bar" style={{width: `${progress}%`}}></div>
            </div>
            <br/>
            <div id="most-urgent-task-card">
                <h4>{urgentTask.title}</h4>
                <p>❗this {urgentTask.display_time}, {urgentTask.cue}</p>
            <p>👉 {urgentTask.steps[0].act}</p>
            </div>
            {otherIncompleteTasks.map(task => {
                return <div className="task-card">
                    <h5>{task.title}</h5>
                    <p>🕑 this {task.display_time}, {task.cue}</p>
                </div>
            })}
            <button onClick={() => history.push("/projects")}>To all projects</button>
        </div>
    )
}

export default SelectedProject