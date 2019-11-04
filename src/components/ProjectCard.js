import React from 'react';
import '../stylesheets/ProjectCard.css'

const ProjectCard = ({project}) => {
    return (
        <div className="project-card">
            <h4>{project.title}</h4>
            progress bar...
            <br/>
            {project.tasks.map(task => {
                return <div>
                    {task.title} 🕑 {task.actual_time}
                </div>
            })}
        </div>
    );
}

export default ProjectCard;