import React, { Component } from "react"
import API from "../adapters/API"
import { Form, Button } from "semantic-ui-react"
import "../stylesheets/LoginSignup.css"

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
        console.log("🚀 ~ file: SignUpForm.js ~ line 27 ~ SignUpForm ~ user", user)
        if (user.errors) {
          window.alert(user.errors)
        } else if (Array.isArray(user)) {
          window.alert(user)
        } else if (user.error) {
          // TODO check if appearing when unwanted
          window.alert(user.error.message) 
        } else {
          this.props.setCurrentUser(user)
          this.props.history.push("/new")
        }
      })
  }

  render() {
    return (
      <div>
        <div id="logo-container">
          <img src={require("../images/ConcreteLogoWithName.png")} alt="" />
        </div>
        <h3>Sign up:</h3>
        <Form
          onChange={e => this.handleInputChange(e.target.name, e.target.value)}
          onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Input name="email" type="email" placeholder="email" required />
          <Form.Input
            name="password"
            type="password"
            placeholder="create password"
            required
          />
          <Form.Input
            name="password_confirmation"
            type="password"
            placeholder="confirm password"
            required
          />
          <Form.Button color="green" content="Submit" />
        </Form>
        <br />
        <Button
          label="Already have an account?"
          labelPosition="left"
          onClick={() => this.props.history.push("/login")}
          content="Log in"
        />
      </div>
    )
  }
}

export default SignUpForm
