import React, { createContext, useReducer } from "react";

export const BillsContext = createContext();
const initialState = {
  bills: [],
};
export const billsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BILLS":
      return {
        ...state,
        bills: action.payload,
      };
    case "CREATE_BILL":
      return {
        ...state,
        bills: [action.payload, ...state.bills],
      };
    case "DELETE_BILL":
      return {
        ...state,
        bills: state.bills.filter((bill) => bill._id !== action.payload._id),
      };
    case "UPDATE_BILL":
      return {
        ...state,
        bills: state.bills.map((bill) =>
          bill._id === action.payload._id ? action.payload : bill
        ),
      };
    default:
      return state;
  }
};

export const BillsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(billsReducer, {
    bills: [],
  });

  return (
    <BillsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BillsContext.Provider>
  );
};