import React, { Component } from "react"
import API from "../adapters/API"
import { Form, Button } from 'semantic-ui-react'

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
      } else if (Array.isArray(user)) {
        window.alert(user)
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
        <h3>Sign up:</h3>
        <Form onChange={e => this.handleInputChange(e.target.name, e.target.value)}
          onSubmit={e => this.handleSubmit(e)}>
          <Form.Input name="email"
              type="email" placeholder="email" required/>
          <Form.Input name="password"
              type="password" placeholder="create password" required/>
          <Form.Input name="password_confirmation"
              type="password" placeholder="confirm password" required/>
          <Form.Button color="green" content="Submit"/>
        </Form>
        <br />    
        <Button label="Already have an account?" labelPosition="left" onClick={() => this.props.history.push("/login")} content="Log in"/>
        </div>
    )
  }
}

export default SignUpForm
