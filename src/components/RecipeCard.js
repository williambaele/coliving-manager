import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { useRecipesContext } from "../hooks/useRecipesContext";
import { toast } from "react-toastify";

const RecipeCard = ({ recipe, user }) => {
  const { dispatch } = useRecipesContext();

  // DELETE RECIPE
  const handleDeleteRecipe = async () => {
    if (!user) {
      console.log("You must be logged in");
      return;
    }

    const response = await fetch(`/api/recipes/${recipe._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      dispatch({ type: "DELETE_RECIPE", payload: { _id: recipe._id } });
      toast("Recipe deleted");
    } else {
      console.log("Error deleting the recipe.");
    }
  };

  return (
    <div
      key={recipe._id}
      className="bg-[#292929] rounded-xl px-2 py-2 text-sm font-bold text-gray-200 flex justify-between items-center"
    >
      <p>{recipe.title}</p>
      <div onClick={handleDeleteRecipe}>
        <FaTrashCan
          style={{ fontSize: 12, color: "white" }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default RecipeCard;
