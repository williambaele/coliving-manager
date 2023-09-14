import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRecipesContext } from "./hooks/useRecipesContext";
import { useBillsContext } from "./hooks/useBillsContext";

//PAGES
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

//USER STATE
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  //DISPATCH
  const { bills, dispatch: billsDispatch } = useBillsContext();
  const { recipes, dispatch: recipesDispatch } = useRecipesContext();

  //USER
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  //RECIPES
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/recipes");
      const json = await response.json();

      if (response.ok) {
        recipesDispatch({ type: "SET_RECIPES", payload: json });
      } else {
        console.log("error");
      }
    };

    fetchRecipes();
  }, [recipesDispatch]);

  //BILLS
  useEffect(() => {
    const fetchBills = async () => {
      const response = await fetch("/api/bills");
      const json = await response.json();

      if (response.ok) {
        billsDispatch({ type: "SET_BILLS", payload: json });
      } else {
        console.log("error");
      }
    };

    fetchBills();
  }, [billsDispatch]);
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                !user ? (
                  <Login />
                ) : (
                  <Home user={user} recipes={recipes} bills={bills} />
                )
              }
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
