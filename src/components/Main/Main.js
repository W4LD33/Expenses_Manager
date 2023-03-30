import React, { useContext, useState } from 'react';
import SummaryItem from '../SummaryItem/SummaryItem';
import { GlobalContext } from '../../context/GlobalState';
import './main.css';

function sortTransactions(transactions, sortField, isDescending) {
  // Make a copy of the transactions array using the slice method
  const sortedTransactions = transactions.slice();

  // Sort the transactions array based on the sortField parameter
  sortedTransactions.sort((a, b) => {
    let comparison = 0;
    const multiplier = isDescending ? -1 : 1;

    // If the sortField is "date", compare the dates as numbers
    if (sortField === 'date') {
      comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    // If the sortField is "amount", compare the amounts directly
    else if (sortField === 'amount') {
      comparison = b.amount - a.amount;
    }
    else if (sortField === 'quantity') {
        return a.quantity - b.quantity;
    }
    // For all other fields, compare the values as strings using the localeCompare method
    else {
      comparison = a[sortField].localeCompare(b[sortField]);
    }

    return comparison * multiplier;
  });

  // Return the sorted transactions array
  return sortedTransactions;
}

const Main = (props) => {
  const { transactions } = useContext(GlobalContext);
  
  const [formData, setFormData] = useState({
    date: false,
    amount: false,
    receiver: false,
    category: false,
    subcategory: false,
    quantity: false,
    description: false,
  });

  const [sortField, setSortField] = useState(null);
  const [isDescending, setIsDescending] = useState(false);

  function handleChange(event) {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  }

  function handleSortChange(event) {
    const newSortField = event.target.checked ? event.target.value : null;
    const newIsDescending = newSortField === sortField ? !isDescending : false;

    setSortField(newSortField);
    setIsDescending(newIsDescending);
  }

  const sortedTransactions = sortField ? sortTransactions(transactions, sortField, isDescending) : transactions;

  return (
    <div>
      <h1 className='summary-title'>Summary</h1>
      <div className='sort-container'>
        <h2>Sort by:</h2>
        <form>
          <label>
            <input type='radio' name='sortField' value='date' onChange={handleSortChange} checked={sortField === 'date'} />
            Date
          </label>
          <label>
            <input type='radio' name='sortField' value='amount' onChange={handleSortChange} checked={sortField === 'amount'} />
            Amount
          </label>
          <label>
            <input type='radio' name='sortField' value='receiver' onChange={handleSortChange} checked={sortField === 'receiver'} />
            Receiver
          </label>
          <label>
            <input type='radio' name='sortField' value='category' onChange={handleSortChange} checked={sortField === 'category'} />
            Category
            </label>
          <label>
            <input type='radio' name='sortField' value='subcategory' onChange={handleSortChange} checked={sortField === 'subcategory'} />
            Subcategory
          </label>
          <label>
            <input type='radio' name='sortField' value='quantity' onChange={handleSortChange} checked={sortField === 'quantity'} />
            Quantity
          </label>
          <label>
            <input type='radio' name='sortField' value='description' onChange={handleSortChange} checked={sortField === 'description'} />
            Description
          </label>
        </form>
      </div>
      <table className='summary-table'>
        <thead>
           <tr>
              <th className='summary-header'>Date</th>
              <th className='summary-header'>Amount</th>
              <th className='summary-header'>Receiving</th>
              <th className='summary-header'>Category</th>
              <th className='summary-header'>Subcategory</th>
              <th className='summary-header'>Quantity</th>
              <th className='summary-header'>Description</th>
              <th className='summary-header'>Delete</th>
            </tr>
          </thead>
          <tbody className='summary-body'>
            {sortedTransactions.map(sortedTransaction => {
              return <SummaryItem 
                key={sortedTransaction.id} 
                transaction={sortedTransaction} 
                symbol={props.symbol}
              />
            })}
          </tbody>
        </table>
      </div>
);
}

export default Main
