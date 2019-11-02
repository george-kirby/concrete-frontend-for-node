import React from 'react'

const HotTask = ({task}) => {
    return (
        <div>
            <h1>{task.title}</h1>
            <p>this {task.display_time}, {task.cue}</p>
            <p>{task.steps[0].act}</p>
        </div>
    )
}

export default HotTask