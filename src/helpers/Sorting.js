const incompleteTasks = tasks => tasks.filter(task => {
    return !isComplete(task)
})

const isComplete = task => task.steps.reduce((acc, step) => acc && step.completed, true)

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

const orderProjects = projects => {
    return projects.sort((a, b) => {
        let initialReturn = getJsDate(orderTasks(a.tasks)[0].actual_time) - getJsDate(orderTasks(b.tasks)[0].actual_time)
        if (initialReturn !== 0) {
            return initialReturn
        } else {
            return orderTasks(a.tasks)[0].position_at_time - orderTasks(b.tasks)[0].position_at_time
        }
    })
}

const getJsDate = dateFromDb => {
    return new Date(dateFromDb)
}

const getStringDate = actualTime => {
    return actualTime.slice(0, 10)
}

const getStringTime = actualTime => {
    return actualTime.slice(11, 16)
}

export default { incompleteTasks, isComplete, orderTasks, orderProjects, getJsDate, getStringDate, getStringTime }