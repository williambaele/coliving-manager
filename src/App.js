import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRecipesContext } from "./hooks/useRecipesContext";
import { useBillsContext } from "./hooks/useBillsContext";
import { db } from "./config/Firebase";
import { collection, getDocs } from "firebase/firestore";

//PAGES
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

//USER STATE
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContextProvider } from "./context/AuthContext";
import Lorem from "./pages/Lorem";

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
  const recipesCollectionRef = collection(db, "recipes");
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(recipesCollectionRef);

        const recipesData = [];
        querySnapshot.forEach((doc) => {
          const recipe = doc.data();
          recipesData.push(recipe);
        });
        recipesDispatch({ type: "SET_RECIPES", payload: recipesData });
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [recipesDispatch]);

  //BILLS
  const billsCollectionRef = collection(db, "bills");
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const querySnapshot = await getDocs(billsCollectionRef);

        const billsData = [];
        querySnapshot.forEach((doc) => {
          const bill = doc.data();
          billsData.push(bill);
        });
        billsDispatch({ type: "SET_BILLS", payload: billsData });
      } catch (error) {
        console.error("Error fetching bills:", error);
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
            <Route path="/lorem" element={<Lorem />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
