import React from "react";

const MissingAmount = ({ bill }) => {
  const missingPeople = 6 - bill.paidBy.lenght;
  // const missingPeople = 6 - (bill.paidBy.length);
  // const missingMoney = amoutPerPerson * missingPeople;
  return <div>{missingPeople}</div>;
};

export default MissingAmount;
