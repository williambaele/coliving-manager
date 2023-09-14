import React from "react";
import { HiMiniChartPie } from "react-icons/hi2";
import { HiBanknotes } from "react-icons/hi2";
import { MdFastfood } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useLogout } from "../hooks/useLogout";

const Header = ({ activeMenu, setActiveMenu }) => {
  // LOG OUT
  const { logout } = useLogout();

  const menu = [
    {
      icon: <HiMiniChartPie style={{ fontSize: 20, color: "white" }} />,
      name: "Dashboard",
    },
    {
      icon: <HiBanknotes style={{ fontSize: 20, color: "white" }} />,
      name: "Bills",
    },
    {
      icon: <MdFastfood style={{ fontSize: 20, color: "white" }} />,
      name: "Recipes",
    },
    {
      icon: <IoLogOut style={{ fontSize: 20, color: "white" }} />,
      name: "Logout",
    },
  ];

  const gridColumns = menu.length;
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
  };

  const handleMenuClick = (name) => {
    setActiveMenu(name);
    if (name === "Logout") {
      // Perform logout action only when "Logout" is clicked
      logout();
    }
  };

  return (
    <div
      className={`hidden md:flex w-full bg-[#121213] h-14 justify-between items-center px-4`}
    >
      <h2 className="text-xl font-bold text-gray-300">🏠</h2>
      <div className={`w-60 items-center h-full`} style={gridStyle}>
        {menu.map((item, index) => (
          <div
            onClick={() => {
              setActiveMenu(item.name);
              handleMenuClick(item.name);
            }}
            key={index}
            className={`cursor-pointer h-full flex items-center justify-center ${
              activeMenu === item.name ? "border-b-4 border-[#7D3AF2]" : ""
            }`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
