import React, { useState } from "react";
import { useRecipesContext } from "../hooks/useRecipesContext";
import { toast } from "react-toastify";

const RecipeForm = ({ user, onCloseForm }) => {
  //RECIPE'S INFOS
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useRecipesContext();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Checking if the user is logged in
    if (!user) {
      setError("You must be logged in");
      return;
    }

    // Validate the title
    if (title === "" || title == null) {
      setError("title");
      setErrorMsg("Please enter a valid title");
      return;
    }
    //Adding data to the recipe's creation
    const linkData = {
      title,
      user: user._id,
    };
    const response = await fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify(linkData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      console.log("error");
    }
    if (response.ok) {
      dispatch({ type: "CREATE_RECIPE", payload: json });
      toast("Recipe created");
      setTitle("");
      onCloseForm();
    }
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
