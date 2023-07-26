import React from "react";
import Chart from "react-apexcharts";
import styles from "../../styles/Main.module.css";
import { useMemo } from "react";
import numeral from "numeral";

export default function SplineGraph({ chartData }) {
  const { options, series } = useMemo(() => {
    const options = {
      chart: {
        styles: {
          padding: "1rem",
        },
        background: "transparent",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: "bottom",
        horizontalAlign: "center",
        floating: false,
        colors: "rgba(255, 255, 255, 0.35)",
        fontSize: "10.75rem",
        height: 80,
        fontFamily: "ARCADE",
        fontWeight: 400,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: 0,
        offsetY: 0,
        labels: {
          colors: undefined,
          useSeriesColors: false,
        },
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: "#fff",
          fillColors: undefined,
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0,
        },
        itemMargin: {
          horizontal: 5,
          vertical: 0,
        },
        onItemClick: {
          toggleDataSeries: true,
        },
        onItemHover: {
          highlightDataSeries: true,
        },
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "rgba(255, 255, 255, 0.35)",
            fontSize: "0.45rem",
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
          offsetX: 4,
          formatter: (val) => numeral(val).format("0.0a"),
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
      tooltip: {
        theme: false,
        style: {
          background: "transparent",
          fontSize: "0.625rem",
        },
        custom: function ({ series, dataPointIndex }) {
          return (
            '<div class="custom_tooltip">' +
            "<div class='tooltip-title-green'>" +
            numeral(series[1][dataPointIndex]).format("0.0a") +
            "</div>" +
            "<div class='tooltip-title-red' >" +
            numeral(series[0][dataPointIndex]).format("0.0a") +
            "</div>" +
            "</div>"
          );
        },
      },
      responsive: [
        {
          breakpoint: 500,
          options: {
            yaxis: {
              labels: {
                style: {
                  colors: "rgba(255, 255, 255, 0.35)",
                  fontSize: "0.625rem",
                  fontFamily: "ARCADE",
                },
                offsetX: 4,
                formatter: (val) => numeral(val).format("0.0a"),
              },
            },
          },
        },
      ],
    };

    let typesOfSeries = Object.keys(chartData);

    let series = [
      {
        name: typesOfSeries[0],
        data: [],
      },
      {
        name: typesOfSeries[1],
        data: [],
      },
    ];

    for (let i = chartData[typesOfSeries[0]].length - 1; i >= 0; i--) {
      series[0].data.push(chartData[typesOfSeries[0]][i].y);
      series[1].data.push(chartData[typesOfSeries[1]][i].y);

      options.xaxis.categories.push(
        chartData[typesOfSeries[0]][i].x.split(" ").slice(1, 3).join(" ")
      );
    }

    return { options, series };
  }, [chartData]);

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
