import React from "react";
import './Add-Recurring.css';


class Add_Recurring extends React.Component{
    constructor(props) {
        super(props)
        this.addRecurringTransactions = this.props.addRecurringTransactions
        
    }



    onSubmitRecurringTransactions = (event) => {
        event.preventDefault()
        this.title = event.target.title.value;
        this.description = event.target.description.value;
        this.ammount = event.target.ammount.value;
        this.addRecurringTransactions(this.title, this.description, this.ammount)
        event.target.title.value = ''
        event.target.description.value = ''
        event.target.ammount.value = ''
    }

    closeTab = () => {
        document.getElementById('tab-recurring').style.display = 'none';
    }


    render(){
            return(
            <div className="steps" id="tab-recurring">
                <form onSubmit={this.onSubmitRecurringTransactions}>
                    <label htmlFor='title'>Title:</label>
                    <input id='form' name='title' className='form-title' type='text' placeholder="Title" ref={node => (this.inputNode = node)} required></input><br/>
                    <label htmlFor='description'>Description:</label>
                    <input id='form' name='description' className='form-description' type='text' placeholder="Description" required></input><br/>
                    <label htmlFor="ammount">Ammount:</label>
                    <input id='form' name='ammount' className="form-ammount" type='float' placeholder="Ammount" required></input>
                    <button type="submit">Submit</button>
                    <p className="close" onClick={this.closeTab}>x</p>
                </form>
            </div>
            
        )}
}

export default Add_Recurring