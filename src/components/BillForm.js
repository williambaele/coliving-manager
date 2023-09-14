import React, { useState } from "react";
import { toast } from "react-toastify";
import { useBillsContext } from "../hooks/useBillsContext";

const BillForm = ({ user, onCloseForm }) => {
  //BILL'S INFOS
  const { dispatch } = useBillsContext();

  const [amount, setAmount] = useState("");
  const [categorie, setCategorie] = useState("Gaz");
  const [month, setMonth] = useState("January");
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Checking if the user is logged in
    if (!user) {
      setError("You must be logged in");
      return;
    }

    // Validate the title
    if (amount === "" || amount == null) {
      setError("amount");
      setErrorMsg("Please enter a valid amount");
      return;
    }
    if (month === "" || month == null) {
      setError("month");
      setErrorMsg("Please enter a valid month");
      return;
    }
    if (categorie === "" || categorie == null) {
      setError("categorie");
      setErrorMsg("Please enter a valid categorie");
      return;
    }
    //Adding data to the recipe's creation
    const linkData = {
      amount,
      month,
      categorie,
      user: user._id,
    };
    const response = await fetch("/api/bills", {
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
      dispatch({ type: "CREATE_BILL", payload: json });
      toast("Bill created");
      onCloseForm();

    }
  };
  return (
    <div className="w-full h-8 rounded-lg md:justify-end md:flex">
      <form
        onSubmit={handleSubmit}
        className="grid w-full h-full grid-cols-7 md:w-1/2"
      >
        <input
          type="number"
          placeholder="Amount"
          className="h-full col-span-2 pl-2 rounded-r-none outline-none rounded-lg bg-[#292929] text-gray-200"
          onChange={(e) => {
            setAmount(e.target.value);
            setErrorMsg("");
          }}
        />
        <select
          onChange={(e) => setCategorie(e.target.value)}
          className="col-span-2 bg-[#292929] text-gray-200"
        >
          <option>Gaz</option>
          <option>Water</option>
        </select>
        <select
          onChange={(e) => setMonth(e.target.value)}
          className="col-span-2 bg-[#292929] text-gray-200"
        >
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
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

export default BillForm;
