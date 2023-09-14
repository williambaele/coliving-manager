import React from "react";
import PaidButton from "./PaidButton";
import MissingAmount from "./MissingAmount";

const BillsTable = ({ bills }) => {
  const tableHeadings = ["Category", "Month", "Amount", "Missing"];
  return (
    <div class="overflow-x-auto overflow-y-auto h-max">
      <table class="divide-y-2 w-full divide-gray-600 bg-[#292929] text-sm rounded-xl">
        <thead class="text-left text-md sticky top-0  rounded-xl">
          <tr>
            {tableHeadings.map((item) => (
              <th class="whitespace-nowrap px-4 uppercase text-gray-300 font-bold py-4">
                {item}
              </th>
            ))}
            <th class="px-4 py-4"></th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 text-gray-400 text-sm">
          {bills.map((bill) => (
            <tr className="py-2">
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
