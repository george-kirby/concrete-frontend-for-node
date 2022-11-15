const BASE_URL = "http://localhost:8080/"
// ^in dev

// const BASE_URL = "https://concrete-backend.herokuapp.com/"

const USERS_URL = `${BASE_URL}users/`
const TASKS_URL = `${BASE_URL}tasks/`
const LOGIN_URL = `${BASE_URL}login/`
const VALIDATE_URL = `${BASE_URL}validate/`

const jsonHeaders = (more = {}) => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...more
  }
}

const authorisationHeader = (more = {}) => ({
  Authorisation: localStorage.getItem("token"),
  ...more
})

const handleServerResponse = response => {
  // console.log(response)
  if (response.token) {
    localStorage.setItem("token", response.token)
  }
  if (response.newUser) {
    return { ...response.newUser, tasks: [] }
  } else {
    return response
  }
}

const validateUser = () => {
  return fetch(VALIDATE_URL, {
    method: "POST",
    headers: authorisationHeader()
  })
    .then(resp => resp.json())
    .then(handleServerResponse)
}

const login = credentials => {
  return fetch(LOGIN_URL, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({ user: credentials })
  })
    .then(resp => resp.json())
    .then(handleServerResponse)
}

const logout = () => {
  localStorage.removeItem("token")
}

const getUser = userId => {
  return fetch(USERS_URL + userId).then(resp => resp.json())
}

const postUser = userData => {
  return fetch(USERS_URL, {
    method: "POST",
    headers: jsonHeaders(), 
    body: JSON.stringify({user: userData})
  })
  .then(resp => resp.json())
}

const postTask = taskData => {
  return fetch(TASKS_URL, {
    method: "POST",
    headers: jsonHeaders(), 
    body: JSON.stringify({task: taskData})
  })
  .then(resp => resp.json())
}

const patchTask = (taskId, taskData) => {
  console.log("patchTask running")
  console.log('taskData')
  console.log(taskData)
  return fetch(TASKS_URL+taskId, {
    method: "PATCH",
    headers: jsonHeaders(), 
    body: JSON.stringify({task: taskData})
  })
  .then(resp => resp.json())
}

const destroyTask = taskId => {
  return fetch(TASKS_URL+taskId, {
    method: "DELETE",
    headers: jsonHeaders()
  })
}

export default { getUser, login, logout, validateUser, handleServerResponse, postUser, postTask, patchTask, destroyTask }
