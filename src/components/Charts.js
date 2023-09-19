import React from "react";
import ReactEcharts from "echarts-for-react";

export default function Charts({ bills, name }) {
  // Extract the data from the bills prop and convert amount to numbers
  const data =
    bills && Array.isArray(bills)
      ? bills.map((bill) => ({
          month: bill.month,
          amount: parseFloat(bill.amount), // Convert amount to a floating-point number
          category: bill.category,
        }))
      : [];

  // Extract unique months and sort them
  const months = [...new Set(data.map((item) => item.month))].sort();

  // Prepare an empty array for the data for each month
  const monthData = months.map((month) =>
    data.filter((item) => item.month === month)
  );

  // Calculate the total amount for each month
  const monthTotalAmounts = monthData.map((monthItems) =>
    monthItems.reduce((total, item) => total + item.amount, 0)
  );

  // Prepare the xAxis data
  const xAxisData = months.map((month) => month.substring(0, 3)); // Display abbreviated month names

  const option = {
    title: {
      text: name,
      textStyle: {
        fontSize: 30,
        color: "#7D3AF2",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      width: "auto",
    },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: monthTotalAmounts,
        type: "bar",
      },
    ],
    color: ["#7D3AF2"],
  };

  return (
    <>
      <ReactEcharts option={option} />
    </>
  );
}
