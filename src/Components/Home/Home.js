import React, { Component } from "react";
import "./Home.css";
import Add_Transaction from "../../Features/Add-Transaction/Add-Transaction";
import Add_Recurring from "../../Features/Add-Recurring/Add-Recurring";

export default class Home extends Component {
  constructor(props) {
    super(props);
    let storedTransactions = JSON.parse(localStorage.getItem("transactions"));
    let storedRecurringTransactions = JSON.parse(
      localStorage.getItem("recurringTransactions")
    );
    this.state = {
      expenses: storedTransactions || [],
      balance: 0,
      monthlyBalance: 0,
      recurring: storedRecurringTransactions || [],
    };
  }

  componentDidUpdate() {
    this.getThisMonths();
  }
  // it will get all the objects, map through their months and add the ones that are the same as the month and year on the users computer
  // it will then add all of the expenses ammounts of this new array to a total and display it.
  getThisMonths = () => {
    let date = new Date();
    // it displays january being 0, february being 1 etc, so have to add 1
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let arr = [];

    this.state.expenses.map((expense) => {
      if (expense.month === month && expense.year === year) {
        arr.push(expense);
      } else {
        arr.slice(arr.indexOf(expense));
      }
    });

    let total = 0.0;

    arr.map((expense) => {
      total = total + parseFloat(expense.ammount);
    });

    return total;
  };

  // it will map thought the expenses state and add all the ammounts of each object to a total and display it.

  balance() {
    let total = 0.0;
    this.state.expenses.map((expense) => {
      total = total + parseFloat(expense.ammount);
    });
    return total;
  }

  // it will recieve the info of a transaction that the user wants to add
  // it will store this new transaction to local storage and update the state to whats saved on local storage.
  // if nothing is saved to local storage it will create it saving an array with a object to it and then setting
  // the expenses state to whats saved on local storage.
  addTransaction = (
    ids,
    titles,
    descriptions,
    ammounts,
    years,
    months,
    days
  ) => {
    let storedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (storedTransactions) {
      console.log(storedTransactions);
      storedTransactions.push({
        id: ids,
        description: descriptions,
        title: titles,
        ammount: ammounts,
        year: years,
        month: months,
        day: days,
      });
      localStorage.setItem("transactions", JSON.stringify(storedTransactions));
      this.setState({
        expenses: JSON.parse(localStorage.getItem("transactions")),
      });
    } else if (!storedTransactions) {
      localStorage.setItem(
        "transactions",
        JSON.stringify([
          {
            id: ids,
            description: descriptions,
            title: titles,
            ammount: ammounts,
            year: years,
            month: months,
            day: days,
          },
        ])
      );
      this.setState({
        expenses: JSON.parse(localStorage.getItem("transactions")),
      });
    }
  };

  // have to re do this, so it does the same as addTransactions, also another function to when it gets to the supposed day of the transaction
  // it will add to the transactions, might have to do so it check if theres a transaction with same title, description, ammount
  // day, week, year... if there is it wont add, if there isnt it will add.
  addRecurringTransactions = (
    ids,
    titles,
    descriptions,
    ammounts,
    dayOfTransactions
  ) => {
    let storedRecurringTransactions = JSON.parse(
      localStorage.getItem("recurringTransactions")
    );
    if (storedRecurringTransactions) {
      console.log(storedRecurringTransactions);
      storedRecurringTransactions.push({
        id: ids,
        description: descriptions,
        title: titles,
        ammount: ammounts,
        dayOfTransaction: dayOfTransactions,
      });
      localStorage.setItem(
        "recurringTransactions",
        JSON.stringify(storedRecurringTransactions)
      );
      this.setState({
        recurring: JSON.parse(localStorage.getItem("recurringTransactions")),
      });
    } else if (!storedRecurringTransactions) {
      localStorage.setItem(
        "recurringTransactions",
        JSON.stringify([
          {
            id: ids,
            description: descriptions,
            title: titles,
            ammount: ammounts,
            dayOfTransaction: dayOfTransactions,
          },
        ])
      );
      this.setState({
        recurring: JSON.parse(localStorage.getItem("recurringTransactions")),
      });
    }
  };

  recurringTransactionsTransfer = (obj) => {
    // let expense = [...this.state.expenses];
    // expense.push(obj);

    let date = new Date();

    this.title = obj.title;
    this.description = obj.description;
    this.ammount = obj.ammount;
    this.id = Math.random() * 1000000;

    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();

    this.addTransaction(
      this.id,
      this.title,
      this.description,
      this.ammount,
      this.year,
      this.month,
      this.day
    );

    // localStorage.setItem("transactions", JSON.stringify(expense));
    // this.setState({
    //   expenses: JSON.parse(localStorage.getItem("transactions")),
    // });
  };

  // it opens the tabs to add the transaction and the recurring payments
  openTab_Transaction = () => {
    document.getElementById("tab").style.display = "flex";
  };
  openTab_Recurring = () => {
    document.getElementById("tab-recurring").style.display = "flex";
  };

  render() {
    return (
      <main>
        <div className="main">
          <div className="balance-widget">
            <h2>BALANCE</h2>
            <div className="balance">
              <p>${this.balance()}</p>
            </div>
          </div>
          {/* Transactions widget */}
          <div className="transactions">
            <h2>TRANSACTIONS</h2>
            <div className="list">
              {/* Will reverse the array so newest comes first, map through 
              the expenses state array and display each object on it  */}
              {this.state.expenses.reverse().map((expense) => {
                return (
                  <div key={expense.id} className="item">
                    <h3 className="transaction-title">{expense.title}</h3>
                    <p className="transaction-description">
                      "{expense.description}"
                    </p>
                    <p className="transaction-ammount">${expense.ammount}</p>
                    <p>
                      {expense.year}, {expense.month}, {expense.day}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recurring payments */}
          <div className="transactions">
            <h2>RECURRING TRANSACTIONS</h2>
            <div className="list">
              {/* Will map through the recurring state array and display each object on it  */}
              {this.state.recurring.reverse().map((payment) => {
                return (
                  <div key={payment.id} className="item">
                    <button
                      onClick={() =>
                        this.recurringTransactionsTransfer(payment)
                      }
                    >
                      &larr;
                    </button>
                    <h3 className="transaction-title">{payment.title}</h3>
                    <p className="transaction-description">
                      "{payment.description}"
                    </p>
                    <p className="transaction-ammount">${payment.ammount}</p>
                    <p>Transaction on day: {payment.dayOfTransaction}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="stats">
            <h2>THIS MONTH</h2>
            {<p> ${this.getThisMonths()}</p>}
          </div>
        </div>
        <div className="button-transaction">
          <p onClick={this.openTab_Transaction}>+</p>
        </div>
        <div className="button-recurring">
          <p onClick={this.openTab_Recurring}>O</p>
        </div>
        <Add_Transaction addTransaction={this.addTransaction} />
        <Add_Recurring
          addRecurringTransactions={this.addRecurringTransactions}
        />
      </main>
    );
  }
}
