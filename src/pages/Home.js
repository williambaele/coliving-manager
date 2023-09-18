import React, { useState } from "react";
import MobileHeader from "../components/MobileHeader";
import Header from "../components/Header";
import Dashboard from "../container/Dashboard";
import Bills from "../container/Bills";
import Recipes from "../container/Recipes";

const Home = ({ user, recipes, bills }) => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuComponentMapping = {
    Dashboard: <Dashboard bills={bills} />,
    Bills: <Bills user={user} bills={bills} />,
    Recipes: <Recipes user={user} recipes={recipes} />,
  };

  // Define a function to set the active menu
  const handleMenuClick = (name) => {
    setActiveMenu(name);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header activeMenu={activeMenu} setActiveMenu={handleMenuClick} />
      <div className="md:hidden">
        <MobileHeader activeMenu={activeMenu} setActiveMenu={handleMenuClick} />
      </div>
      {menuComponentMapping[activeMenu]}
    </div>
  );
};

export default Home;
