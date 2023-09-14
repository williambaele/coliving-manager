import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { RecipesContextProvider } from "./context/RecipeContext";
import { BillsContextProvider } from "./context/BillContext";
import { AuthContextProvider } from "./context/AuthContext";

//TOASTIFY
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    <BillsContextProvider>
      <RecipesContextProvider>
        <App />
      </RecipesContextProvider>
    </BillsContextProvider>
  </AuthContextProvider>
);
