import React from 'react';
import {useParams} from 'react-router-dom'

const RouteTest = ({routerProps, tasks, handleUpdateToggle}) => {

    // const task = tasks.find(task => task.id === routerProps.match.params.id)
    const {id} = useParams()

    return (
        <div>
            {/* {task.title} */}
            {id}
        </div>
    );
}

export default RouteTest;

