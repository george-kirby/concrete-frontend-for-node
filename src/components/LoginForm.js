import React, { Component } from 'react';

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

    render() {
        return (
            <div>
      <img src={require("../images/favicon-96x96.png")} alt=""/>
      <h1>Concrete</h1>
      <h3>log in:</h3>
      <form action="" onChange={e => this.handleInputChange(e.target.name, e.target.value)}>
          <input name="email" type="email" placeholder="email" defaultValue={this.state.email}></input><br/>
          <input name="password" type="password" placeholder="password" defaultValue={this.state.password}></input><br/>
          <input type="submit"></input>
      </form>
      <br/>
      <div>Don't have an account?</div>
      <button onClick={() => console.log("sign up button clicked")}>Sign Up</button>

    </div>
        );
    }
}

export default LoginForm;
