import React, { useState } from "react";
import { toast } from "react-toastify";
import { useBillsContext } from "../hooks/useBillsContext";
import { db } from "../config/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const BillForm = ({ onCloseForm }) => {
    //USER ID
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
  
  
  //BILL'S INFOS
  const { dispatch } = useBillsContext();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Gaz");
  const [month, setMonth] = useState("January");
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [billUser] = useState(uid);



  //DB CONFIG
  const billsCollectionRef = collection(db, "bills");
  const createItem = async (
    amount,
    month,
    category
  ) => {
    await addDoc(billsCollectionRef, {
      amount: amount,
      month: month,
      category: category,
      user_id: billUser,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createItem(amount, month, category, billUser);
    toast("Bill created");
    
    // Dispatch the correct action type "CREATE_BILL"
    dispatch({
      type: "CREATE_BILL",
      payload: {
        amount,
        month,
        category,
        user_id: billUser,
      },
    });
  
    onCloseForm();
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
          onChange={(e) => setCategory(e.target.value)}
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
