import React from "react";
import "./Add-Recurring.css";

class Add_Recurring extends React.Component {
  constructor(props) {
    super(props);
    this.addRecurringTransactions = this.props.addRecurringTransactions;

    this.state = {
      active: "first",
    };
  }

  onSubmitRecurringTransactionsGain = (event) => {
    event.preventDefault();
    let date = new Date();

    this.title = event.target.title.value;
    this.description = event.target.description.value;
    this.ammount = event.target.ammount.value;
    this.dayOfTransaction = event.target.dayOfTransaction.value;
    this.id = Math.random() * 1000000;

    this.addRecurringTransactions(
      this.id,
      this.title,
      this.description,
      this.ammount,
      parseInt(this.dayOfTransaction)
    );

    event.target.title.value = "";
    event.target.description.value = "";
    event.target.ammount.value = "";
    event.target.dayOfTransaction.value = "";
  };

  onSubmitRecurringTransactionsSpend = (event) => {
    event.preventDefault();
    let date = new Date();

    this.title = event.target.title.value;
    this.description = event.target.description.value;
    this.ammount = event.target.ammount.value;
    this.dayOfTransaction = event.target.dayOfTransaction.value;
    this.id = Math.random() * 1000000;

    this.addRecurringTransactions(
      this.id,
      this.title,
      this.description,
      -this.ammount,
      parseInt(this.dayOfTransaction)
    );

    event.target.title.value = "";
    event.target.description.value = "";
    event.target.ammount.value = "";
    event.target.dayOfTransaction.value = "";
  };

  addActiveClass(e) {
    const clicked = e.target.id;
    if (this.state.active === clicked) {
      this.setState({ active: "" });
    } else {
      this.setState({ active: clicked });
    }
  }

  // will activate one depending on the choice that the user makes
  // first one is the gained Section
  firstActive() {
    return (
      <form
        onSubmit={this.onSubmitRecurringTransactionsGain}
        className="formRecurring"
      >
        <label htmlFor="title" className="label">
          Title:
        </label>
        <input
          id="form"
          name="title"
          className="form-title"
          type="text"
          placeholder="Title"
          ref={(node) => (this.inputNode = node)}
          required
        ></input>
        <br />
        <label htmlFor="description" className="label">
          Description:
        </label>
        <input
          id="form"
          name="description"
          className="form-description"
          type="text"
          placeholder="Description"
          required
        ></input>
        <br />
        <label htmlFor="ammount" className="label">
          Ammount:
        </label>
        <input
          id="form"
          name="ammount"
          className="form-ammount"
          type="number"
          step="0.01"
          placeholder="Ammount"
          required
        ></input>
        <label htmlFor="day" className="label">
          Day of transaction:
        </label>
        <input
          id="form"
          name="dayOfTransaction"
          className="form-dayOfTransaction"
          type="number"
          max="31"
          placeholder="Day of transaction"
          required
        ></input>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    );
  }
  // second one is the spent Section
  secondActive() {
    return (
      <form
        onSubmit={this.onSubmitRecurringTransactionsSpend}
        className="formRecurring"
      >
        <label htmlFor="title" className="label">
          Title:
        </label>
        <input
          id="form"
          name="title"
          className="form-title"
          type="text"
          placeholder="Title"
          ref={(node) => (this.inputNode = node)}
          required
        ></input>
        <br />
        <label htmlFor="description" className="label">
          Description:
        </label>
        <input
          id="form"
          name="description"
          className="form-description"
          type="text"
          placeholder="Description"
          required
        ></input>
        <br />
        <label htmlFor="ammount" className="label">
          Ammount:
        </label>
        <input
          id="form"
          name="ammount"
          className="form-ammount"
          type="float"
          placeholder="Ammount"
          required
        ></input>
        <label htmlFor="day" className="label">
          Day of transaction:
        </label>
        <input
          id="form"
          name="dayOfTransaction"
          className="form-dayOfTransaction"
          type="number"
          placeholder="Day of transaction"
          required
        ></input>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    );
  }

  render() {
    return (
      <div className="steps" id="tab-recurring">
        <ul className="choices-list">
          <li
            className={`choice ${
              this.state.active === "first" ? "active" : ""
            }`}
            id="first"
            onClick={(e) => this.addActiveClass(e)}
          >
            Gain
          </li>
          <li
            className={`choice ${
              this.state.active === "second" ? "active" : ""
            }`}
            id="second"
            onClick={(e) => this.addActiveClass(e)}
          >
            Spend
          </li>
          {/* <li className={`choice ${this.state.active === "third"? 'active': ''}`} id='third' onClick={e => this.addActiveClass(e)} >Transfer</li> */}
        </ul>
        {this.state.active === "first" ? <div>{this.firstActive()}</div> : ""}
        {this.state.active === "second" ? <div>{this.secondActive()}</div> : ""}
        {/* {this.state.active === 'third' ? <div className="form">{this.firstActive()}</div> : ''} */}
      </div>
    );
  }
}

export default Add_Recurring;
