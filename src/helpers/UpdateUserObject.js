
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
  let newTasks = [...currentUser.tasks]
  let taskIndex = newTasks.findIndex(t => t.id === givenTask.id)

  newTasks.splice(taskIndex, 1)
  return newTasks
}

export default { patchedTask, postedTask, destroyedTask }
