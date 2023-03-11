import React, { Component, useEffect } from "react";
import './Home.css';
import Add_Transaction from "../../Features/Add-Transaction/Add-Transaction";
import Add_Recurring from "../../Features/Add-Recurring/Add-Recurring";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: [{id: 13123, description: 'hello', title: 'Welcome', ammount: '21', year: 2023, month: 3, day: 3},
                {id: 2123, description: 'hello', title: 'Welcome', ammount: '21', year: 2023, month: 1, day: 31},
                {id: 3123, description: 'hello', title: 'Welcome', ammount: '21', year: 2023, month: 3, day: 31},
                {id: 44312, description: 'hello', title: 'Welcome', ammount: '21', year: 2023, month: 2, day: 31},
            ],
            balance: 0,
            monthlyBalance: 0,
            recurring: []
        }
    }



    getThisMonths = () => {
            let date = new Date();
            const month = date.getMonth();
            const year = date.getFullYear();
            let arr = []
            this.state.expenses.map(expense => {
                if(expense.month === month && expense.year === year) {
                    arr.push(expense)
                } else {
                    arr.slice(arr.indexOf(expense))
                }
            })
            console.log(arr)
            let total = 0.0;
            arr.map(expense => {
                total = total + parseFloat(expense.ammount)
            })
            return total
        }       
        
        balance() {
            let total = 0.0;
            this.state.expenses.map(expense => {
                total = total + parseFloat(expense.ammount)
            })
            return total
        }
// ........................................................under, working on

// .......................................................................above, working on

    addTransaction = (ids, titles, descriptions, ammounts, years, months, days) => {
        this.setState({
            expenses: [...this.state.expenses, {id: ids, description: descriptions, title: titles, ammount: ammounts, year: years, month: months, day: days}]
        })
    }
    
    addRecurringTransactions = (ids, titles, descriptions, ammounts, times) => {
        this.setState({
            recurring: [...this.state.recurring, {id: ids, description: descriptions, title: titles, ammount: ammounts, time: times}]
        })
    }

    openTab_Transaction = () => {
        document.getElementById('tab').style.display = 'flex';
    }
    openTab_Recurring = () => {
        document.getElementById('tab-recurring').style.display = 'flex';
    }

    render() {
        return(
                <main>
                    <div className="main">
                    {/* Balance */}
                    <div className="balance-widget">
                        <h2>BALANCE</h2>
                        <div className="balance">
                            <p>${this.balance()}</p>
                        </div>
                    </div>

                    {/* Expenses */}
                    <div className="transactions">
                        <h2>TRANSACTIONS</h2>
                        <div className="list">
                        {this.state.expenses.reverse().map(expense => {
                            return(
                                <div key={expense.id} className='item'>
                                    <h3 className="transaction-title">{expense.title}</h3>
                                    <p className="transaction-description">"{expense.description}"</p>
                                    <p className="transaction-ammount">${expense.ammount}</p>
                                    <p>{expense.year}, {expense.month}, {expense.day}</p>
                                </div>
                            )
                        })}
                        </div>
                    </div>

                    {/* Recurring payments */}
                    <div className="transactions">
                        <h2>RECURRING TRANSACTIONS</h2>
                        <div className="list">
                        {this.state.recurring.reverse().map(payment => {
                            return(
                                <div key={payment.id} className='item'>
                                    <h3 className="transaction-title">{payment.title}</h3>
                                    <p className="transaction-description">"{payment.description}"</p>
                                    <p className="transaction-ammount">${payment.ammount}</p>
                                    <p>{payment.time}</p>
                                </div>
                            )
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
                <Add_Transaction 
                    addBalance={this.addBalance}
                    addTransaction={this.addTransaction} 
                    removeBalance={this.removeBalance} 
                    getThisMonths={this.getThisMonths}
                    balance={this.balance}
                />
                <Add_Recurring 
                    addRecurringTransactions={this.addRecurringTransactions}
                />
                </main>
        )}
}
