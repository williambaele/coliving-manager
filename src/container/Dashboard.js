import React from "react";
import Charts from "../components/Charts";
import WeekDuties from "../components/WeekDuties";

const Dashboard = ({ bills }) => {
  // Filter bills by category
  const electricityBills = bills.filter(
    (bill) => bill.category === "Electricity"
  );
  const gazBills = bills.filter((bill) => bill.category === "Gaz");
  const waterBills = bills.filter((bill) => bill.category === "Water");

  return (
    <div className="w-full h-full overflow-y-scroll bg-[#191919] px-4 py-4 md:py-6 space-y-6">
      <div className="w-full h-full space-y-6">
        <h1 className="text-2xl font-bold text-gray-300 md:text-4xl font-large">
          Dashboard
        </h1>
        <div className="grid md:grid-cols-2">
          <Charts name={"Electricity"} bills={electricityBills} />
          <Charts name={"Gaz"} bills={gazBills} />
          <Charts name={"Water"} bills={waterBills} />
          <WeekDuties />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
