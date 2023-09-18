import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { useRecipesContext } from "../hooks/useRecipesContext";
import { toast } from "react-toastify";
import { db } from "../config/Firebase";
import { deleteDoc, doc } from "firebase/firestore";

const RecipeCard = ({ recipe }) => {
  const { dispatch } = useRecipesContext();

  // DELETE ITEM
  const deleteItem = async (id) => {
    const recipeDoc = doc(db, "recipes", id);
    await deleteDoc(recipeDoc);
    dispatch({ type: "DELETE_RECIPE", payload: { _id: recipe._id } });

    toast.error("Recipe deleted");
  };

  return (
    <div
      key={recipe._id}
      className="bg-[#292929] rounded-xl px-2 py-2 text-sm font-bold text-gray-200 flex justify-between items-center"
    >
      <p>{recipe.title}</p>
      <div
        onClick={() => {
          deleteItem(recipe._id);
        }}
      >
        <FaTrashCan
          style={{ fontSize: 12, color: "white" }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default RecipeCard;
