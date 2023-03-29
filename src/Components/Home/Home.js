import React, { Component } from "react";
import { useState } from "react";
import './Home.css';
import Add_Transaction from "../Add-Transaction/Add-Transaction";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: [
                {id: 1, description: 'Hello', title: 'Groceries', ammount: 20},
                {id: 2, description: 'Hello', title: 'Groceries', ammount: 40}
            ],
            balance: 0,
            payment: [
                {id: 1, description: 'Hello', title: 'Groceries', ammount: 20},
                {id: 1, description: 'Hello', title: 'Groceries', ammount: 20},
                {id: 1, description: 'Hello', title: 'Groceries', ammount: 20},
                {id: 1, description: 'Hello', title: 'Groceries', ammount: 20}
            ]
        }
    }

// export default function Home() {
//     const [ expense, setExpenses ] = useState([{id: 1, description: 'Hello', title: 'Groceries', ammount: 20}]);
//     const [ payment, setPayments ] = useState([{id: 1, description: 'Hello', title: 'Groceries', ammount: 20}]);
//     const [ balance, setBalance ] = useState(0)

    addBalance = (num) => {
        this.setState(prevstate => ({ balance: parseFloat(prevstate.balance) + parseFloat(num)}))
    };

    addExpense = (titles, descriptions, ammounts) => {
        this.setState({
            expenses: [...this.state.expenses, {id: 1, description: descriptions, title: titles, ammount: ammounts}]
        })
    }
    
    openTab = () => {
        document.querySelector('form').style.bottom = '';
    }

    render() {
        return(
                <main>
                    <div className="main">
                    {/* Balance */}
                    <div className="balance-widget">
                        <h2>BALANCE</h2>
                        <div className="balance">
                            <p>${this.state.balance}</p>
                        </div>
                    </div>

                    {/* Expenses */}
                    <div className="transactions">
                        <h2>TRANSACTIONS</h2>
                        <div className="list">
                        {this.state.expenses.reverse().map(expense => {
                            return(
                                <div key={expense} className='item'>
                                    <h3 className="transaction-title">{expense.title}</h3>
                                    <p className="transaction-description">"{expense.description}"</p>
                                    <p className="transaction-ammount">${expense.ammount}</p>
                                </div>
                            )
                        })}
                        </div>
                    </div>

                    {/* Recurring payments */}
                    <div className="transactions">
                        <h2>RECURRING PAYMENTS</h2>
                        <div className="list">
                        {this.state.payment.reverse().map(payment => {
                            return(
                                <div key={payment} className='item'>
                                    <h3 className="transaction-title">{payment.title}</h3>
                                    <p className="transaction-description">"{payment.description}"</p>
                                    <p className="transaction-ammount">${payment.ammount}</p>
                                </div>
                            )
                        })}
                        </div>
                    </div>

                    <div className="stats">
                        <h2>THIS MONTH</h2>
                    </div>
                    </div>
                <div className="button">
                    <p onClick={this.openTab}>+</p>
                </div>
                <Add_Transaction addBalance={this.addBalance} addExpense={this.addExpense}  />
                </main>
        )}
}
