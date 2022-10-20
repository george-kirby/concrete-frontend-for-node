// allows currentUser to be updated on frontend after task change (create/edit/destroy) 
// only making one call to send data to the backend (for the task)
// rather than a second call to get data as well

const patchedTask = (responseTask, currentUser) => {
  let newTasks = [...currentUser.tasks]
  let taskIndex = newTasks.findIndex(t => t.id === responsetask._id)

  newTasks[taskIndex] = responseTask
  return newTasks
}

const postedTask = (responseTask, currentUser) => {
  return [...currentUser.tasks, responseTask]
}

const destroyedTask = (givenTask, currentUser) => {
  let newTasks = [...currentUser.tasks]
  let taskIndex = newTasks.findIndex(t => t._id === giventask._id)

  newTasks.splice(taskIndex, 1)
  return newTasks
}

export default { patchedTask, postedTask, destroyedTask }
