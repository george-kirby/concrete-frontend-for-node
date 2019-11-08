
const patchedTask = (responseTask, currentUser) => {
  let newTasks = [...currentUser.tasks]
  let taskIndex = newTasks.findIndex(t => t.id === responseTask.id)

  newTasks[taskIndex] = responseTask
  return newTasks
}

const postedTask = (responseTask, currentUser) => {
  return [...currentUser.tasks, responseTask]
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


export default { patchedTask, postedTask, destroyedTask }
