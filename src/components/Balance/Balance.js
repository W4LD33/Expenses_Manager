import React, { useContext } from 'react'
import { GlobalContext } from "../../context/GlobalState"
import './balance.css'

const Balance = (props) => {
    const { transactions } = useContext(GlobalContext)

    const operations = transactions.map(transaction => transaction.amount)

    function sumOfPositives(){
        let sum = 0;
        for (let i = 0; i < arguments.length; i++){
            if (arguments[i] > 0){
                sum += arguments[i]
            }
        }
        return sum
    }

    function sumOfNegatives(){
        let sum = 0;
        for (let i = 0; i < arguments.length; i++){
            if (arguments[i] < 0){
                sum -= Math.abs(arguments[i]);
            }
        }
        return sum;
    }    

    const totalBalance = operations.reduce((a, i) => (a += i), 0)

    return (
    <div className='balance-container'>
        <h1 className='balance-title'>Balance</h1>
        <h1 className='balance-income'>Total income: {sumOfPositives(...operations)}{props.symbol}</h1>
        <h1 className='balance-expenses'>Total expenses: {sumOfNegatives(...operations)}{props.symbol}</h1>
        <h1 className={totalBalance < 0 ? "balance-expenses" : "balance-income"}>Total balance: {totalBalance}{props.symbol}</h1>
    </div>
  )
}

export default Balance
