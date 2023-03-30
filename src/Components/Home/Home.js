import React, { Component, useEffect } from "react";
import './Home.css';
import Add_Transaction from "../../Features/Add-Transaction/Add-Transaction";
import Add_Recurring from "../../Features/Add-Recurring/Add-Recurring";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            balance: 0,
            monthlyBalance: 0,
            recurring: []
        }
    }
// export default function Home() {
//     const [ expense, setExpenses ] = useState([{id: 1, description: 'Hello', title: 'Groceries', ammount: 20}]);
//     const [ payment, setPayments ] = useState([{id: 1, description: 'Hello', title: 'Groceries', ammount: 20}]);
//     const [ balance, setBalance ] = useState(0)
    componentDidMount() {
        const dateNow = new Date()
        console.log(dateNow.getDate())
        if (parseInt(dateNow.getDate()) === 1) {
            localStorage.setItem('monthlyBalance', JSON.stringify(0))
        }
        
    }
    addBalance = (num) => {
        this.setState(prevstate => ({ balance: parseFloat(prevstate.balance) + parseFloat(num)}))
    };
    removeBalance = (num) => {
        this.setState(prevstate => ({ balance: parseFloat(prevstate.balance) - parseFloat(num)}))
    };
    addMonthlyBalance = (num) => {
        this.setState(prevstate => ({ monthlyBalance: parseFloat(prevstate.monthlyBalance) + parseFloat(num)}))
    };
    removeMonthlyBalance = (num) => {
        this.setState(prevstate => ({ monthlyBalance: parseFloat(prevstate.monthlyBalance) - parseFloat(num)}))
    };
    localStorageMonthlyBalance = (num) => {
        let prevNumber = JSON.parse(localStorage.getItem('monthlyBalance'))
        let total = parseFloat(prevNumber) + parseFloat(num)
        localStorage.setItem('monthlyBalance', JSON.stringify(total))
    }
    addTransaction = (ids, titles, descriptions, ammounts, times) => {
        this.setState({
            expenses: [...this.state.expenses, {id: ids, description: descriptions, title: titles, ammount: ammounts, time: times}]
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
                            <p>${this.state.balance}</p>
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
                                    <p>{expense.time}</p>
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
                        {<p> ${ /*localStorage.getItem('monthlyBalance') === null ? 0 : */ JSON.parse(localStorage.getItem('monthlyBalance'))}</p>}
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
                    addMonthlyBalance={this.addMonthlyBalance}
                    removeMonthlyBalance={this.removeMonthlyBalance}
                    localStorageMonthlyBalance={this.localStorageMonthlyBalance}
                    stateMonthlyBalance = {this.state.monthlyBalance}
                />
                <Add_Recurring 
                    addRecurringTransactions={this.addRecurringTransactions}
                />
                </main>
        )}
}
