import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState={
  loading:false,
  cart:cartItems,
  total:0,
  amount:0,
}

const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer,initialState)
  const clearCart=()=>{
    dispatch({type:'CLEAR_CART'});
  }
  const remove=(id)=>{
    dispatch({type:"REMOVE",payload:id});
  }

  const calculateTotal=(items)=>{
    dispatch({type:"TOTAL",payload:items});
  }

  const AddItem=(id)=>{
    dispatch({type:'ADD_ITEM',payload:id});
  }
  const DeleteItem=(id)=>{
    dispatch({type:'DELETE_ITEM',payload:id});
  }
  
  useEffect(()=>{

    dispatch({type:'GET_TOTAL'})

  }, [state.cart] )


  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        AddItem,
        DeleteItem
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
