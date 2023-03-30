import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import './summaryitem.css'

function SummaryItem(props) {
    
    const operator = props.transaction.amount < 0 ? "-" : "+"

    const { deleteTransaction } = useContext(GlobalContext);

    return (
        <tr>
            <td 
                className="summary-cell" 
            >
                {props.transaction.date}
            </td>
            <td 
                className={props.transaction.amount < 0 ? "summary-cell expense" : "summary-cell income"}
            >
                {operator}{Math.abs(props.transaction.amount)}{props.symbol}
            </td>
            <td 
                className="summary-cell" 
            >
                {props.transaction.receiver}
            </td>
            <td 
                className="summary-cell" 
            >
                {props.transaction.category}
            </td>
            <td 
                className="summary-cell" 
            >
                {props.transaction.subcategory}
            </td>
            <td 
                className="summary-cell" 
            >
                {props.transaction.quantity}
            </td>
            <td 
                className="summary-cell" 
            >
                {props.transaction.description}
            </td>
            <td
                className="summary-cell" 
            >
            <button 
                onClick={() => deleteTransaction(props.transaction.id)}
            >
                X
            </button>
            </td>
        </tr>
    )
}

export default SummaryItem
