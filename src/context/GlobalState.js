import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    transactions: [
        { id: uuidv4(),
        date: "2023-03-26",
        amount: -100, 
        receiver: "Maxima",
        category: "Food",
        subcategory: "Groceries",
        quantity: 1,
        description: "Meal preparation for week #13"
        },
        { id: uuidv4(),
        date: "2023-03-21",
        amount: -250, 
        receiver: "Tenant",
        category: "Housing",
        subcategory: "Rent",
        quantity: 1,
        description: "Flat rent for 2023-03"
        },
        { id: uuidv4(),
        date: "2023-03-21",
        amount: -70, 
        receiver: "Vienasaskaita.lt",
        category: "Housing",
        subcategory: "Bills",
        quantity: 1,
        description: "House bills for 2023-03"
        },
        { id: uuidv4(),
        date: "2023-03-10",
        amount: 800, 
        receiver: "Microsoft",
        category: "Work",
        subcategory: "Salary",
        quantity: 1,
        description: "Salary for 2023-02"
        }
    ]
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    function deleteTransaction(id){
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    };

    function addTransaction(transaction){
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    return (<GlobalContext.Provider value={{
        transactions: 
        state.transactions,
        deleteTransaction,
        addTransaction
        }}>
        {children}
    </GlobalContext.Provider>)
}