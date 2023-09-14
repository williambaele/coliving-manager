import React from "react";
import PaidButton from "./PaidButton";
import MissingAmount from "./MissingAmount";

const BillsTable = ({ bills, user }) => {
  const tableHeadings = ["Category", "Month", "Amount", "Missing"];

  return (
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y-2 divide-gray-600 bg-[#292929] rounded-xl text-sm">
        <thead class="text-left">
          <tr className="py-10">
            {tableHeadings.map((item) => (
              <th class="whitespace-nowrap px-4 py-2 uppercase text-gray-300 font-bold">
                {item}
              </th>
            ))}
            <th class="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 text-gray-400">
          {bills.map((bill) => (
            <tr>
              <td class="whitespace-nowrap px-4 py-2 font-medium ">
                {bill.categorie}
              </td>
              <td class="whitespace-nowrap px-4 py-2 ">{bill.month}</td>
              <td class="whitespace-nowrap px-4 py-2 ">{bill.amount}€</td>
              <td class="whitespace-nowrap px-4 py-2 ">
                <MissingAmount bill={bill} />
              </td>
              <td class="whitespace-nowrap px-4 py-2 flex justify-center">
                <PaidButton user={user} bill={bill} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillsTable;
