import React, { Component, useEffect, useState } from "react";
import './Add-Transaction.css'

class Add_Transaction extends React.Component{
    constructor(props) {
        super(props)
        this.setBalance = this.props.setBalance;
        this.balance = this.props.balance;
        this.addBalance = this.props.addBalance;
        this.addExpense = this.props.addExpense;
    }


    onSubmit = (event) => {
        event.preventDefault()
        this.title = event.target.title.value
        this.description = event.target.description.value
        this.ammount = event.target.ammount.value
        this.addBalance(this.ammount)
        this.addExpense(this.title, this.description, this.ammount)
        event.target.title.value = ''
        event.target.description.value = ''
        event.target.ammount.value = ''
    };

    closeTab = () => {
        document.querySelector('form').style.bottom = '-600px';
    }

    render(){
            return(
            <form className="steps" onSubmit={this.onSubmit}>
                <label htmlFor='title'>Title:</label>
                <input id='form' name='title' className='form-title' type='text' placeholder="Title" ref={node => (this.inputNode = node)} required></input><br/>
                <label htmlFor='description'>Description:</label>
                <input id='form' name='description' className='form-description' type='text' placeholder="Description" required></input><br/>
                <label htmlFor="ammount">Ammount:</label>
                <input id='form' name='ammount' className="form-ammount" type='float' placeholder="Ammount" required></input>
                <button type="submit">Submit</button>
                <p className="close" onClick={this.closeTab}>x</p>
            </form>
        )}
}

export default Add_Transaction;