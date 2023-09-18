import React from "react";
import Charts from "../components/Charts";
import WeekDuties from "../components/WeekDuties";

const Dashboard = ({ bills }) => {
  return (
    <div className="w-full h-full bg-[#191919] px-4 py-4 md:py-6 space-y-6">
      <div className="w-full h-full space-y-6">
        <h1 className="text-2xl font-bold text-gray-300 md:text-4xl font-large">
          Dashboard
        </h1>
        <div className="grid md:grid-cols-2">
          <Charts name={"Electricity"} bills={bills} />
          <Charts name={"Gaz"} />
          <Charts name={"Gaz"} />
          <WeekDuties />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
