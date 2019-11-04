import React from 'react';
import '../stylesheets/ProjectCard.css'

const ProjectCard = ({project, setSelectedProjectId}) => {
    return (
        <div className="project-card"  onClick={() => setSelectedProjectId(project.id)}>
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