const patchedStep = (responseStep, currentUser) => {
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

const patchedTask = (responseTask, currentUser) => {
    let newProjects = [...currentUser.projects]
    let projectIndex = newProjects.findIndex(p => p.id === responseTask.project.id)
    let newTasks = [...newProjects[projectIndex].tasks]
    let taskIndex = newTasks.findIndex(t => t.id === responseTask.id)

    newTasks[taskIndex] = responseTask
    newProjects[projectIndex].tasks = newTasks
    return newProjects
}

const patchedProject = (responseProject, currentUser) => {
    let newProjects = [...currentUser.projects]
    let projectIndex = newProjects.findIndex(p => p.id === responseProject.id)

    newProjects[projectIndex] = responseProject
    return newProjects
}

const postedProject = (responseProject, currentUser) => {
    return [...currentUser.projects, responseProject]
}

const postedTask = (responseTask, currentUser) => {
    let newProjects = [...currentUser.projects]
    let projectIndex = newProjects.findIndex(p => p.id === responseTask.project.id)
    newProjects[projectIndex].tasks = [...newProjects[projectIndex].tasks, responseTask]
    return newProjects
}

const postedStep = (responseStep, currentUser) => {
    let newProjects = [...currentUser.projects]
    let projectIndex = newProjects.findIndex(p => p.id === responseStep.task.project.id)
    let newTasks = [...newProjects[projectIndex].tasks]
    let taskIndex = newTasks.findIndex(t => t.id === responseStep.task.id)
    let newSteps = [...newTasks[taskIndex].steps, responseStep]

    newTasks[taskIndex].steps = newSteps
    newProjects[projectIndex].tasks = newTasks
    return newProjects
}

const destroyedStep = (givenStep, currentUser) => {
    let newProjects = [...currentUser.projects]
    let projectIndex = newProjects.findIndex(p => p.id === givenStep.task.project.id)
    let newTasks = [...newProjects[projectIndex].tasks]
    let taskIndex = newTasks.findIndex(t => t.id === givenStep.task.id)
    let newSteps = [...newTasks[taskIndex].steps]
    let stepIndex = newSteps.findIndex(s => s.id === givenStep.id)

    newSteps.splice(stepIndex, 1)
    newTasks[taskIndex].steps = newSteps
    newProjects[projectIndex].tasks = newTasks
    return newProjects
}

const destroyedTask = (givenTask, currentUser) => {
    let newProjects = [...currentUser.projects]
    let projectIndex = newProjects.findIndex(p => p.id === givenTask.project.id)
    let newTasks = [...newProjects[projectIndex].tasks]
    let taskIndex = newTasks.findIndex(t => t.id === givenTask.id)

    newTasks.splice(taskIndex, 1)
    newProjects[projectIndex].tasks = newTasks
    return newProjects
}

const destroyedProject = (givenProject, currentUser) => {
    let newProjects = [...currentUser.projects]
    let projectIndex = newProjects.findIndex(p => p.id === givenProject.id)

    newProjects.splice(projectIndex, 1)
    return newProjects
}

const postedProjectTaskStep = (givenProject, givenTask, givenStep, currentUser) => {
    return [...currentUser.projects, {...givenProject, tasks: [{...givenTask, steps: [givenStep]}]}]
}

export default { patchedStep, postedStep, destroyedStep, patchedTask, postedTask, destroyedTask, patchedProject, postedProject, destroyedProject, postedProjectTaskStep }