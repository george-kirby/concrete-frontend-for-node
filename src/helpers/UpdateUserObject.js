
const patchedTask = (responseTask, currentUser) => {
  let newProjects = [...currentUser.projects]
  let projectIndex = newProjects.findIndex(
    p => p.id === responseTask.project.id
  )
  let newTasks = [...newProjects[projectIndex].tasks]
  let taskIndex = newTasks.findIndex(t => t.id === responseTask.id)

  newTasks[taskIndex] = responseTask
  newProjects[projectIndex].tasks = newTasks
  return newProjects
}

const postedTask = (responseTask, currentUser) => {
  let newProjects = [...currentUser.projects]
  let projectIndex = newProjects.findIndex(
    p => p.id === responseTask.project.id
  )
  newProjects[projectIndex].tasks = [
    ...newProjects[projectIndex].tasks,
    responseTask
  ]
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


export default { patchedTask, postedTask, destroyedTask }
