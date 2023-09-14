import React, { useState } from "react";
import Button from "../components/Button";

const RandomDinner = ({ recipes, user }) => {
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [ingredients, setIngredients] = useState(""); // State to store generated ingredients

  const getRandomRecipe = () => {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const selectedRecipe = recipes[randomIndex];
    setRandomRecipe(selectedRecipe);
  };

  // RECIPE'S INFOS
  const [size, setSize] = useState("");
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loadingSpinner = (
    <svg
      aria-hidden="true"
      class="w-4 h-4 mr-2 text-[#121213] animate-spin  fill-white"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );

  //API CALL
  const generateIngredients = async (recipeTitle) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${""}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Donne moi les ingrédients nécéssaires pour cette recette simple de: "${recipeTitle} pour ${size} personnes. Liste moi tous les ingrédients sous forme de bullet points"`,
              },
            ],
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate ingredients");
      }

      const data = await response.json();
      console.log(response.json);
      const generatedIngredients =
        data.choices[0]?.message.content || "No ingredients found.";
      setIngredients(generatedIngredients);
    } catch (error) {
      console.error("Error generating ingredients:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Checking if the user is logged in
    if (!user) {
      setError("You must be logged in");
      return;
    }

    // Validate the number of people
    if (size === "" || size == null || size <= 0) {
      setError("size");
      setErrorMsg("Please enter a valid number");
      return;
    }
    setIsLoading(true);
    try {
      // Generate ingredients for the random recipe
      if (randomRecipe) {
        await generateIngredients(randomRecipe.title);
      }
    } catch (error) {
      console.error("Error generating ingredients:", error);
    } finally {
      // Set isLoading back to false when the API call is complete (even in case of an error)
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full mx-auto md:w-1/2">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-300 md:text-4xl font-large">
        Let's randomize dinner
      </h2>
      <div className="flex justify-center" onClick={getRandomRecipe}>
        <Button message={"Get lucky"} />
      </div>
      {randomRecipe && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-gray-300">
            Today's recipe will be:
          </h3>
          <p className="text-gray-200">{randomRecipe.title}</p>
          <div className="w-full h-8 rounded-lg md:justify-end md:flex">
            <form
              onSubmit={handleSubmit}
              className="grid w-2/3 h-full grid-cols-5 mx-auto mt-4 "
            >
              <input
                type="number"
                placeholder="How many people"
                className="h-full col-span-3 pl-2 rounded-r-none outline-none rounded-lg bg-[#292929] text-gray-200"
                onChange={(e) => {
                  setSize(e.target.value);
                  setErrorMsg("");
                }}
              />
              <button
                type="submit"
                className="col-span-2 h-full bg-[#7D3AF2] rounded-l-none rounded-lg text-sm text-gray-200 font-bold flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? loadingSpinner : "Ask ChatGPT"}
              </button>
            </form>
            {errorMsg && (
              <p className="w-full text-xs text-red-500">{errorMsg}</p>
            )}
          </div>
        </div>
      )}
      {ingredients && (
        <div className="mt-10 text-center">
          <h3 className="text-lg font-semibold text-gray-300">
            Ingredients needed:
          </h3>
          <p
            className="text-gray-200"
            dangerouslySetInnerHTML={{
              __html: ingredients.replace(/\n/g, "<br>"),
            }}
          ></p>
        </div>
      )}
    </div>
  );
};

export default RandomDinner;
