import React, { Component } from "react";
import "./LoginPage.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.Register = this.props.Register;
  }

  render() {
    return (
      <main className="LoginPage">
        <h1>LOG IN</h1>
        <form onSubmit={this.Register}>
          <label htmlFor="name">Name:</label>
          <input
            id="form"
            name="name"
            className="form-name"
            type="text"
            placeholder="Name"
            required
          ></input>
          <label htmlFor="balance">Balance:</label>
          <input
            id="form"
            name="balance"
            className="form-balance"
            type="number"
            step="0.01"
            placeholder="Balance"
            required
          ></input>
          <button type="submit">Submit</button>
        </form>
      </main>
    );
  }
}

export default LoginPage;
