import React, { Component } from "react";
import "./AddMoney.css";
import Add_Recurring from "../../Features/Add-Recurring/Add-Recurring";
import Add_Transaction from "../../Features/Add-Transaction/Add-Transaction";

export default class AddMoney extends Component {
  constructor(props) {
    super(props);
    this.addTransaction = this.props.addTransaction;
    this.addRecurringTransactions = this.props.addRecurringTransactions;
    this.state = {
      active: "first",
    };
  }

  addActiveClass(e) {
    const clicked = e.target.id;
    if (this.state.active === clicked) {
      this.setState({ active: "" });
    } else {
      this.setState({ active: clicked });
    }
  }

  transaction_Active() {
    <Add_Transaction addTransaction={this.addTransaction} />;
  }

  render() {
    return (
      <nav className="content">
        <div className="type-choice">
          <div
            className={`type-${this.state.active === "first" ? "active" : ""}`}
            id="first"
            onClick={(e) => this.addActiveClass(e)}
          >
            Transaction
          </div>
          <div
            className={`type-${this.state.active === "second" ? "active" : ""}`}
            id="second"
            onClick={(e) => this.addActiveClass(e)}
          >
            Recurring
          </div>
        </div>
        <div className="form">
          {this.state.active === "first" ? (
            <Add_Transaction addTransaction={this.addTransaction} />
          ) : (
            ""
          )}
          {this.state.active === "second" ? (
            <Add_Recurring
              addRecurringTransactions={this.addRecurringTransactions}
            />
          ) : (
            ""
          )}
        </div>
      </nav>
    );
  }
}
