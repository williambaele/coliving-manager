import React, { useState } from "react";
import { useBillsContext } from "../hooks/useBillsContext";
import { toast } from "react-toastify";

const PaidButton = ({ user, bill }) => {
  const { dispatch } = useBillsContext();

  // Initialize isPaid based on whether user._id is in bill.paidBy
  const isPaidInitially = bill.paidBy.includes(user._id);
  const [isPaid, setIsPaid] = useState(isPaidInitially);

  const handlePaid = async (e) => {
    if (e) {
      e.preventDefault();
    }
    if (!user) {
      return;
    }

    const updatedBill = {
      ...bill,
      paidBy: isPaid
        ? bill.paidBy.filter((id) => id !== user._id)
        : [...bill.paidBy, user._id],
    };

    try {
      const response = await fetch(`/api/bills/${bill._id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedBill),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        dispatch({ type: "UPDATE_BILL", payload: updatedBill });
        toast(isPaid ? "Marked as unpaid" : "Marked as paid");
        setIsPaid(!isPaid);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <button
      onClick={handlePaid}
      className={`inline-block rounded w-20 py-1 text-xs font-medium text-white ${
        isPaid ? "  bg-[#36d358]" : "bg-[#7D3AF2]"
      }`}
    >
      {isPaid ? "Paid" : "Unpaid"}
    </button>
  );
};

export default PaidButton;
