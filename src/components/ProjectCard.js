import React from 'react';
import { useHistory } from 'react-router-dom'
import '../stylesheets/ProjectCard.css'

const ProjectCard = ({project, handleUpdateToggle}) => {

    const history = useHistory()

    return (
        <div className="project-card"  onClick={() => history.push(`/projects/${project.id}`)}>
            <h4>📌 {project.title}</h4>
            progress bar...
            <br/>
            {project.tasks.map(task => {
                return <div key={task.id}>
                    {task.title} 🕑 {task.actual_time}
                </div>
            })}
        </div>
    );
}

export default ProjectCard;