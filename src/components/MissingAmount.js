import React from "react";

const MissingAmount = ({ bill }) => {
  const amoutPerPerson = bill.amount / 6;
  const missingPeople = 6 - (bill.paidBy.length);
  const missingMoney = amoutPerPerson * missingPeople;
  return <div>{missingMoney}</div>;
};

export default MissingAmount;
