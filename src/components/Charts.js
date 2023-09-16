import React from "react";
import ReactEcharts from "echarts-for-react";

export default function Charts() {
  const option = {
    title: {
      text: "Hi",
      textStyle: {
        fontSize: 30,
        color: "#7D3AF2",
      },
    },
    xAxis: {
      type: "category",
      data: [
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 70, 110, 130, 70, 110],
        type: "bar",
      },
    ],
  };
  return (
    <>
      <ReactEcharts option={option} />
    </>
  );
}
