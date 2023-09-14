import React, { createContext, useReducer } from "react";

export const RecipesContext = createContext();
const initialState = {
  recipes: [],
};
export const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
    case "CREATE_RECIPE":
      return {
        ...state,
        recipes: [action.payload, ...state.recipes],
      };
    case "DELETE_RECIPE":
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe._id !== action.payload._id),
      };
    case "UPDATE_RECIPE":
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe._id === action.payload._id ? action.payload : recipe
        ),
      };
    default:
      return state;
  }
};

export const RecipesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipesReducer, {
    recipes: [],
  });

  return (
    <RecipesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RecipesContext.Provider>
  );
};