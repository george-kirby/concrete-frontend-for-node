const updateStep = (responseStep, currentUser) => {
    let newProjects = [...currentUser.projects]
    let projectIndex = newProjects.findIndex(p => p.id === responseStep.task.project.id)
    let newTasks = [...newProjects[projectIndex].tasks]
    let taskIndex = newTasks.findIndex(t => t.id === responseStep.task.id)
    let newSteps = [...newTasks[taskIndex].steps]
    let stepIndex = newSteps.findIndex(s => s.id === responseStep.id)

    newSteps[stepIndex] = responseStep
    newTasks[taskIndex].steps = newSteps
    newProjects[projectIndex].tasks = newTasks
    return newProjects
}

const updateTask = (responseTask, currentUser) => {
    let newProjects = [...currentUser.projects]
    let projectIndex = newProjects.findIndex(p => p.id === responseTask.project.id)
    let newTasks = [...newProjects[projectIndex].tasks]
    let taskIndex = newTasks.findIndex(t => t.id === responseTask.id)

    newTasks[taskIndex] = responseTask
    newProjects[projectIndex].tasks = newTasks
    return newProjects
}

const updateProject = (responseProject, currentUser) => {
    let newProjects = [...currentUser.projects]
    let projectIndex = newProjects.findIndex(p => p.id === responseProject.id)

    newProjects[projectIndex] = responseProject
    return newProjects
}

export default { updateStep, updateTask, updateProject }