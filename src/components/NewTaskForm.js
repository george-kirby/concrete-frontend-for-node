import React, { useState } from 'react';
import '../stylesheets/NewTaskForm.css'

const NewTaskForm = () => {

    const [timeDetailVisible, setTimeDetailVisible] = useState(false);

    const handleSubmit = event => {
        event.preventDefault()
        console.log('form submitted!')
    }

    const toggleTimeDetailVisibilty = () => {
        setTimeDetailVisible(!timeDetailVisible)
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}></form>
            <input name="title" type="text" placeholder="Task name..."/><br/>
            <label>What's a concrete first step?<br/><input name="step_act" type="text" placeholder={`eg sit at desk with laptop`}/></label><br/>
            <select name="date">
                <option value="tonight">Tonight</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="later">Later</option>
            </select>
            <input className={timeDetailVisible ? `visible` : "hidden"} name="timeDetail" type="text" placeholder="hello"/>
            <input name="cue" type="text" placeholder=""/>
        </div>
    );
}

export default NewTaskForm;
