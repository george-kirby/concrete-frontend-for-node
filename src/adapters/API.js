const BASE_URL = "http://localhost:3000/"
const USERS_URL = `${BASE_URL}users/`
const PROJECTS_URL = `${BASE_URL}projects/`
const TASKS_URL = `${BASE_URL}tasks/`
const STEPS_URL = `${BASE_URL}steps/`
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
  if (response.user) {
    return JSON.parse(response.user)
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

const postProject = projectData => {
  return fetch(PROJECTS_URL, {
    method: "POST",
    headers: jsonHeaders(), 
    body: JSON.stringify({project: projectData})
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

const postStep = stepData => {
  return fetch(STEPS_URL, {
    method: "POST",
    headers: jsonHeaders(), 
    body: JSON.stringify({step: stepData})
  })
  .then(resp => resp.json())
}

const patchStep = (stepId, stepData) => {
  return fetch(STEPS_URL+stepId, {
    method: "PATCH",
    headers: jsonHeaders(), 
    body: JSON.stringify({step: stepData})
  })
  .then(resp => resp.json())
}

export default { getUser, login, logout, validateUser, postProject, postTask, postStep, patchStep }
