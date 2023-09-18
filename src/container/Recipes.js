import React, { useState } from "react";
import Button from "../components/Button";
import { BsFillDice5Fill } from "react-icons/bs";
import { BsPlusSquareFill } from "react-icons/bs";
import RecipeCard from "../components/RecipeCard";
import RecipeForm from "../components/RecipeForm";
import RandomDinner from "../components/RandomDinner";

const Recipes = ({ user, recipes }) => {
  const handleCloseForm = () => {
    setFormVisibility(false);
  };
  //FORM VISIBILITY
  const [formVisibility, setFormVisibility] = useState(false);
  const [randomMode, setRandomMode] = useState(false);
  return (
    <div className="w-full h-full bg-[#191919] px-4 py-4 md:py-6 space-y-6 md:space-y-10">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-gray-300 md:text-4xl font-large">
          Recipes
        </h2>
        <div className="flex items-center gap-4">
          <div
            onClick={() => {
              setRandomMode(!randomMode);
              setFormVisibility(false);
            }}
          >
            <Button message={"Random"} icon={<BsFillDice5Fill />} />
          </div>
          <div
            onClick={() => {
              setFormVisibility(!formVisibility);
              setRandomMode(false);
            }}
          >
            <Button message={"Add recipe"} icon={<BsPlusSquareFill />} />
          </div>
        </div>
      </div>
      {formVisibility ? (
        <RecipeForm user={user} onCloseForm={handleCloseForm} />
      ) : null}
      {!randomMode ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} />
          ))}
        </div>
      ) : (
        <RandomDinner recipes={recipes} user={user} />
      )}
    </div>
  );
};

export default Recipes;
