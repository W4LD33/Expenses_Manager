import React from 'react'
import './navbar.css'

const Navbar = (props) => {
  return (
    <div className='navbar-container'>
        <h1 className='navbar-title'>Expense Manager</h1>
        <select className='currency-selector' onChange={props.handleSelect}>
        {props.currencyOptions}
        </select>
    </div>
  )
}

export default Navbar 
