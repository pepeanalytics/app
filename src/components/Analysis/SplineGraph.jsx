import React from "react";
import Chart from "react-apexcharts";
import styles from "../../styles/Main.module.css";

const options = {
  chart: {
    background: "transparent",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  xaxis: {
    categories: ["1 Jul", "2 Jul", "3 Jul", "4 Jul", "5 Jul", "6 Jul", "7 Jul"],
    labels: {
      style: {
        colors: "rgba(255, 255, 255, 0.35)",
        fontSize: "0.75rem",
        fontFamily: "ARCADE",
      },
    },
    crosshairs: {
      show: true,
      width: 2,
      position: "back",
      opacity: 0.9,
      stroke: {
        color: "transparent",
      },
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "transparent",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0,
          opacityTo: 0.8,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "rgba(255, 255, 255, 0.35)",
        fontSize: "0.75rem",
        fontFamily: "ARCADE",
      },
    },
  },
  colors: ["#FF00C4", "#49B7AB"],
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.1,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 0,
      stops: [0, 90, 100],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    show: true,
    borderColor: "rgba(255, 255, 255,.1)",
    strokeDashArray: 0,
    position: "back",
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  theme: {
    mode: "dark",
  },
  markers: {
    colors: "#fff",
    strokeColors: ["#FF00C4", "#49B7AB"],
    strokeWidth: 3,
    hover: {
      size: undefined,
      sizeOffset: 4,
    },
  },
  legend: {
    show: false,
  },
  tooltip: {
    theme: false,
    style: {
      background: "transparent",
      fontSize: "0.625rem",
    },
    custom: function ({ series, dataPointIndex }) {
      return (
        '<div class="custom_tooltip">' +
        "<div class='tooltip-title-red'>" +
        series[0][dataPointIndex] +
        "</div>" +
        "</div>"
      );
    },
  },
};

const series = [
  {
    name: "Holders",
    data: [23, 12, 90, 210, 18, 90, 56, 19],
  },
];

export default function AnalysisSplineGraph() {
  return (
    <div className={styles.splineGraph}>
      <Chart
        height={"470px"}
        width={"99%"}
        options={options}
        series={series}
        type="area"
      />
    </div>
  );
}
