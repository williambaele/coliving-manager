import React from "react";
import PaidButton from "./PaidButton";
import MissingAmount from "./MissingAmount";

const BillsTable = ({ bills, user }) => {
  console.log(bills);
  const tableHeadings = ["Category", "Month", "Amount", "Missing"];

  return (
    <div
      style={{ height: "calc(100% - 100px)" }}
      class="bg-red-200 overflow-y-scroll"
    >
      <table class="w-full divide-gray-600 bg-[#292929] text-sm rounded-xl">
        <thead class="text-left text-md rounded-xl sticky top-0 z-10 bg-[#121213] rounded-t-xl">
          <tr>
            {tableHeadings.map((item) => (
              <th class="px-4 py-4 uppercase text-gray-300 font-bold">
                {item}
              </th>
            ))}
            <th class="px-4 py-4"></th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 text-gray-400 text-sm">
          {bills.map((bill, index) => (
            <tr key={index} className="py-2">
              <td class="whitespace-nowrap px-4 py-4 font-medium ">
                {bill.category}
              </td>
              <td class="whitespace-nowrap px-4 py-4 ">{bill.month}</td>
              <td class="whitespace-nowrap px-4 py-4 ">{bill.amount}€</td>
              <td class="whitespace-nowrap px-4 py-4 ">
                {/* <MissingAmount bill={bill} /> */}
              </td>
              <td class="whitespace-nowrap px-4 py-4 flex justify-center">
                {/* <PaidButton user={user} bill={bill} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillsTable;
