import React, { useContext, useState } from 'react'
import SummaryItem from '../SummaryItem/SummaryItem'
import { GlobalContext } from '../../context/GlobalState'


function sortTransactions(transactions, sortField) {
  // Make a copy of the transactions array using the slice method
  const sortedTransactions = transactions.slice();

  // Sort the transactions array based on the sortField parameter
  sortedTransactions.sort((a, b) => {
    // If the sortField is "date", compare the dates as numbers
    if (sortField === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    // If the sortField is "amount", compare the amounts directly
    else if (sortField === 'amount') {
      return a.amount - b.amount;
    }
    // For all other fields, compare the values as strings using the localeCompare method
    else if (sortField === 'quantity') {
        return a.quantity - b.quantity;
      }
    else {
      return a[sortField].localeCompare(b[sortField]);
    }
  });

  // Return the sorted transactions array
  return sortedTransactions;
}

const Summary = (props) => {
  const { transactions } = useContext(GlobalContext)
  const [sortField, setSortField] = useState(null);

  // This function handles the sort checkbox change event
  function handleSortChange(event) {
    setSortField(event.target.checked ? event.target.value : null);
  }

  // Sort the transactions array based on the current sort field
  const sortedTransactions = sortField ? sortTransactions(transactions, sortField) : transactions;


  



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

export default Summary