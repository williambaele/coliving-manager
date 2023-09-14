import React, { useState } from "react";
import { useRecipesContext } from "../hooks/useRecipesContext";
import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { getAuth } from "firebase/auth";

const RecipeForm = ({ onCloseForm }) => {
  //RECIPE'S INFOS
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useRecipesContext();
  const [errorMsg, setErrorMsg] = useState("");

   //USER ID
   const auth = getAuth();
   const user = auth.currentUser;
   const uid = user.uid; 
   const [recipeUser] = useState(uid);

  //DB CONFIG
  const recipesCollectionRef = collection(db, "recipes");
  const createItem = async (
    title,

  ) => {
    await addDoc(recipesCollectionRef, {
      title: title,
      user_id: recipeUser,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createItem(title, recipeUser);
    toast("Recipe created");
    dispatch({
      type: "CREATE_RECIPE",
      payload: {
        title,
        user_id: recipeUser,
      },
    });
  
    onCloseForm();
  };

  return (
    <div className="w-full h-8 rounded-lg md:justify-end md:flex">
      <form
        onSubmit={handleSubmit}
        className="grid w-full h-full grid-cols-5 md:w-1/2"
      >
        <input
          type="text"
          placeholder="Your new recipe"
          className="h-full col-span-4 pl-2 rounded-r-none outline-none rounded-lg bg-[#292929] text-gray-200"
          onChange={(e) => {
            setTitle(e.target.value);
            setErrorMsg("");
          }}
        />
        <button
          type="submit"
          className="h-full bg-[#7D3AF2] rounded-l-none rounded-lg text-sm text-gray-200 font-bold"
        >
          Submit
        </button>
        {errorMsg && <p className="w-full text-xs text-red-500">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default RecipeForm;
