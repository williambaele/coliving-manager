import React, { useState } from "react";
import { useBillsContext } from "../hooks/useBillsContext";
import { toast } from "react-toastify";
import { db } from "../config/Firebase"; // Import your Firestore configuration
import { doc, updateDoc } from "firebase/firestore"; // Import Firestore functions

const PaidButton = ({ user, bill }) => {
  console.log(bill.data);
  const { dispatch } = useBillsContext();

  // Initialize isPaid based on whether user.uid is in bill.paidBy
  const [isPaid, setIsPaid] = useState(false);

  const handlePaid = async () => {
    if (!user) {
      return;
    }

    const billRef = doc(db, "bills", bill._id);

    try {
      // Toggle the user's UID in the paidBy array
      const updatedBillData = {
        paidBy: isPaid
          ? bill.paidBy.filter((uid) => uid !== user.uid)
          : [...bill.paidBy, user.uid],
      };

      // Update the Firestore document with the new data
      await updateDoc(billRef, updatedBillData);

      // Dispatch action to update state
      dispatch({
        type: "UPDATE_BILL",
        payload: { ...bill, ...updatedBillData },
      });

      // Toggle the button text
      setIsPaid(!isPaid);

      // Show a toast message
      toast(isPaid ? "Marked as unpaid" : "Marked as paid");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <button
      onClick={handlePaid}
      className={`inline-block rounded w-20 py-1 text-xs font-medium text-white ${
        isPaid ? "bg-[#36d358]" : "bg-[#7D3AF2]"
      }`}
    >
      {isPaid ? "Paid" : "Unpaid"}
    </button>
  );
};

export default PaidButton;
