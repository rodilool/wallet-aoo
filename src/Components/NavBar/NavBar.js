import React, { Component } from "react";
// CSS
import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.name = this.props.name;
  }
  state = {};
  render() {
    return (
      <nav>
        <input type="checkbox" id="hamburger-input" className="burger-shower" />
        <label id="hamburger-menu" htmlFor="hamburger-input">
          <nav id="sidebar-menu">
            <h2>Menu</h2>

            <h3>Welcome, {this.name}.</h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Recurring Payments</a>
              </li>
              <li>
                <a href="#">Expenses History</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Settings</a>
              </li>
            </ul>
          </nav>
        </label>

        <div className="overlay"></div>
        <div className="title">
          <h1>Wallet</h1>
        </div>
      </nav>
    );
  }
}

export default NavBar;
