import React, { useContext, useState } from 'react';
import SummaryItem from '../SummaryItem/SummaryItem';
import { GlobalContext } from '../../context/GlobalState';
import './summary.css';

const Summary = (props) => {
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

  function handleChange(event) {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  }

  function sortTransactions(transactions) {
    const { date, amount, receiver, category, subcategory, quantity, description } = formData;
    const criteria = [];

    if (date) criteria.push((a, b) => new Date(b.date) - new Date(a.date));
    if (amount) criteria.push((a, b) => b.amount - a.amount);
    if (receiver) criteria.push((a, b) => a.receiver.localeCompare(b.receiver));
    if (category) criteria.push((a, b) => a.category.localeCompare(b.category));
    if (subcategory) criteria.push((a, b) => a.subcategory.localeCompare(b.subcategory));
    if (quantity) criteria.push((a, b) => b.quantity - a.quantity);
    if (description) criteria.push((a, b) => a.description.localeCompare(b.description));

    return transactions.slice().sort((a, b) => {
      for (let i = 0; i < criteria.length; i++) {
        const result = criteria[i](a, b);
        if (result !== 0) return result;
      }
      return 0;
    });
  }

  const sortedTransactions = sortTransactions(transactions);

  return (
    <div>
      {/* <div>
        <h1 className='summary-title'>Summary</h1>
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
      </div> */}
  </div>
);
}

export default Summary