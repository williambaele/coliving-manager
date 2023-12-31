import React, { useState } from "react";
import Button from "../components/Button";
import { BsPlusSquareFill } from "react-icons/bs";
import BillForm from "../components/BillForm";
import BillsTable from "../components/BillsTable";

const Bills = ({ user, bills }) => {
  const [formVisibility, setFormVisibility] = useState(false);
  const handleCloseForm = () => {
    setFormVisibility(false);
  };
  return (
    <div
      style={{ height: "calc(100vh - 54px)" }}
      className="w-full px-4 py-4 space-y-4 bg-[#191919] md:py-6"
    >
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-gray-300 md:text-4xl font-large">
          Bills
        </h2>
        <div className="flex items-center gap-4">
          <div
            onClick={() => {
              setFormVisibility(!formVisibility);
            }}
          >
            <Button message={"Add bill"} icon={<BsPlusSquareFill />} />
          </div>
        </div>
      </div>
      {formVisibility ? (
        <BillForm user={user} onCloseForm={handleCloseForm} />
      ) : null}
      <BillsTable bills={bills} user={user} />
    </div>
  );
};

export default Bills;
