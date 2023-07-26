import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ labels, data, colors, responsive = [] }) => {
  const chartOptions = {
    labels,
    colors: colors,
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    responsive: responsive,
  };

  return (
    <div className={"pie-chart"}>
      <Chart
        options={chartOptions}
        series={data}
        type="pie"
        width={240}
        height={240}
      />
    </div>
  );
};

export default PieChart;
