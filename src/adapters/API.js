const BASE_URL = "http://localhost:3000/"
const USERS_URL = `${BASE_URL}users/`
const PROJECTS_URL = `${BASE_URL}projects/`
const TASKS_URL = `${BASE_URL}tasks/`
const STEPS_URL = `${BASE_URL}steps/`
const LOGIN_URL = `${BASE_URL}login/`

const jsonHeaders = (more = {}) => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...more
    }
  }

const login = credentials => {
    return fetch(LOGIN_URL, {
        method: "POST",
        headers: jsonHeaders(),
        body: {user: credentials}
    })
    .then(resp => resp.json())
}

const getUser = userId => {
    return fetch(USERS_URL+userId).then(resp => resp.json())
}

export default { getUser, login }