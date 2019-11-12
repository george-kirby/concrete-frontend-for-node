import React, { Component } from "react"
import API from "../adapters/API"

export class SignUpForm extends Component {
  state = {
    email: "",
    password: ""
  }

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    API.postUser({
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirmation: event.target.password_confirmation.value
    })
    .then(API.handleServerResponse)
    .then(user => {
      console.log(user)
      if (user.errors) {
        window.alert(user.errors)
      } else if (user.error) {
        window.alert([user.error, user.exception]) // to be removed - don't want user to see an error when they first load the page
      } else {
        this.props.setCurrentUser(user)
        this.props.history.push("/new")
      }
    })
  }

  render() {
    return (
      <div>
        <img src={require("../images/favicon-96x96.png")} alt="" />
        <h1>Concrete</h1>
        <h3>Sign Up:</h3>
        <form
          action=""
          onChange={e => this.handleInputChange(e.target.name, e.target.value)}
          onSubmit={e => this.handleSubmit(e)}
        >
          <label>
            <input
              name="email"
              type="email"
              placeholder="email"
              defaultValue={this.state.email}
              required
            ></input>
            <br />
          </label>
          <label>
            <input
              name="password"
              type="password"
              placeholder="create password"
              defaultValue={this.state.password}
              required
            ></input>
            <br />
          </label>
          <label>
            <input
              name="password_confirmation"
              type="password"
              placeholder="confirm password"
              required
            ></input>
            <br />
          </label>
          <input type="submit"></input>
        </form>
        <br />
        <div>Already have an account?</div>
        <button onClick={() => this.props.history.push("/login")}>Log in</button>      </div>
    )
  }
}

export default SignUpForm
