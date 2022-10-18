const incompleteTasks = tasks => tasks.filter(task => {
    return !isComplete(task)
})

const isComplete = task => task.incompleteSteps.length < 1

const orderTasks = tasks => {
    return tasks.sort((a, b) => {
        let initialReturn = getJsDate(a.actualTime) - getJsDate(b.actualTime)
        if (initialReturn !== 0) {
            return initialReturn
        } else {
            return a.position_at_time - b.position_at_time
        }
    })
}

// const orderProjects = projects => {
//     return projects.sort((a, b) => {
//         let initialReturn = getJsDate(orderTasks(a.tasks)[0].actualTime) - getJsDate(orderTasks(b.tasks)[0].actualTime)
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
    let jsDate = getJsDate(task.actualTime)
    let today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    if (getStringDate(jsDate.toISOString()) === getStringDate(today.toISOString())) {
        return `today - ${task.displayTime}`
    } else if (getStringDate(jsDate.toISOString()) === getStringDate(tomorrow.toISOString())) {
        return `tomorrow - ${task.displayTime}`
    } else {
        return `${jsDate.toString().slice(0, 10)} - ${task.displayTime}`
    }
}

const uniqueTagsFromTasks = tasks => {
    let tags = []
    tasks.forEach(task => {
        task.tags.forEach(tag => {
            tags = [...tags, tag]
        });
    });
    return tags.filter((tag, index, tags) => tags.indexOf(tag) === index)
}

const applyFilter = (tasks, filters) => {
    if (filters.length < 1) return tasks
    return tasks.filter(task => {
        return task.tags.some(tag => filters.includes(tag))
    })
}

// const stepActsFromSteps = steps => steps.map(step => step.act)

// const incompleteSteps = steps => steps.filter(step => !step.completed)

export default { incompleteTasks, isComplete, orderTasks, 
    getJsDate, getStringDate, getStringTime, displayDateTime, uniqueTagsFromTasks, applyFilter }