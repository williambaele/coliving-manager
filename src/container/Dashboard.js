import React from "react";
import Charts from "../components/Charts";

const Dashboard = () => {
  return (
    <div className="w-full h-full bg-[#191919] px-4 py-4 md:py-6 space-y-6">
      <div className="w-full h-full space-y-6">
        <h2 className="text-2xl font-bold text-gray-300 md:text-4xl font-large">
          Dashboard
        </h2>
        <div className="grid md:grid-cols-2">
          <Charts name={"Electricity"} />
          <Charts name={"Gaz"} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
