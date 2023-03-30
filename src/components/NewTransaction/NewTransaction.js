import React, { useState, useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import { v4 as uuidv4 } from 'uuid';

const NewTransaction = () => {
  
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [receiver, setReceiver] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");

    const { addTransaction } = useContext(GlobalContext);

    const onSubmit = (e) => {
        e.preventDefault();

        const newOperation = {
            id: uuidv4(),
            date,
            amount: + amount,
            receiver,
            category,
            subcategory,
            quantity,
            description
        }
        addTransaction(newOperation);
    }


    return (
    <div className='transaction-container'>
        <form 
            className="summary-form"
            onSubmit={onSubmit}
        >
            <div>
                <label>Date:</label>
                <input 
                    type="text" 
                    placeholder="for ex. 2023-01-01"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <label>Amount:</label>
                <input 
                    type="number" 
                    placeholder="for ex. 100" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div>
                <label>Receiver:</label>
                <input 
                    type="text" 
                    placeholder="for ex. Coscto" 
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                />
            </div>
            <div>
                <label>Category:</label>
                <input 
                    type="text" 
                    placeholder="for ex. Food" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <div>
                <label>Subcategory:</label>
                <input 
                    type="text" 
                    placeholder="for ex. Groceries"
                    value={subcategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                />
            </div>
            <div>
                <label>Quantity:</label>
                <input 
                    type="number" 
                    placeholder="for ex. 1" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <div>
                <label>Description:</label>
                <input 
                    type="text" 
                    placeholder="Groceries for week #1/52" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button 
                className="btn"
            >
                Add transaction
            </button>
        </form>
    </div>
  )
}

export default NewTransaction
