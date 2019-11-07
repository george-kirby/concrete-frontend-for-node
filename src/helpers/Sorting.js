const incompleteTasks = tasks => tasks.filter(task => {
    return !isComplete(task)
})

const isComplete = task => task.incomplete_steps.length < 1

const orderTasks = tasks => {
    return tasks.sort((a, b) => {
        let initialReturn = getJsDate(a.actual_time) - getJsDate(b.actual_time)
        if (initialReturn !== 0) {
            return initialReturn
        } else {
            return a.position_at_time - b.position_at_time
        }
    })
}

// const orderProjects = projects => {
//     return projects.sort((a, b) => {
//         let initialReturn = getJsDate(orderTasks(a.tasks)[0].actual_time) - getJsDate(orderTasks(b.tasks)[0].actual_time)
//         if (initialReturn !== 0) {
//             return initialReturn
//         } else {
//             return orderTasks(a.tasks)[0].position_at_time - orderTasks(b.tasks)[0].position_at_time
//         }
//     })
// }

const getJsDate = dateFromDb => {
    return new Date(dateFromDb)
}

const getStringDate = actualTime => {
    return actualTime.slice(0, 10)
}

const getStringTime = actualTime => {
    return actualTime.slice(11, 16)
}

const displayDateTime = task => {
    let jsDate = getJsDate(task.actual_time)
    let today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    if (getStringDate(jsDate.toISOString()) === getStringDate(today.toISOString())) {
        return `today - ${task.display_time}`
    } else if (getStringDate(jsDate.toISOString()) === getStringDate(tomorrow.toISOString())) {
        return `tomorrow - ${task.display_time}`
    } else {
        return `${jsDate.toString().slice(0, 10)} - ${task.display_time}`
    }
}

// const stepActsFromSteps = steps => steps.map(step => step.act)

// const incompleteSteps = steps => steps.filter(step => !step.completed)

export default { incompleteTasks, isComplete, orderTasks, 
    getJsDate, getStringDate, getStringTime, displayDateTime }