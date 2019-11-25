import React, { Component } from "react"
import API from "../adapters/API"
import { Form, Button } from "semantic-ui-react"
import "../stylesheets/LoginSignup.css"

export class LoginForm extends Component {
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
    API.login({
      email: event.target.email.value,
      password: event.target.password.value
    }).then(this.props.handleLogin)
  }

  render() {
    return (
      <div>
        <div id="logo-container">
          <img src={require("../images/ConcreteLogoWithName.png")} alt="" />
        </div>{" "}
        <h3>Log in:</h3>
        <Form
          onChange={e => this.handleInputChange(e.target.name, e.target.value)}
          onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Input
            name="email"
            type="email"
            placeholder="email"
            defaultValue={this.state.email}
            required
          />
          <Form.Input
            name="password"
            type="password"
            placeholder="password"
            defaultValue={this.state.password}
            required
          />
          <Form.Button color="green" content="Submit" />
        </Form>
        <br />
        <Button
          label="Don't have an account?"
          labelPosition="left"
          onClick={() => this.props.history.push("/signup")}
          content="Sign Up"
        />
      </div>
    )
  }
}

export default LoginForm
